import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {FormstatusService} from './formstatus.service';
import { auth } from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { GoogleDriveService } from './google-drive.service';
import { UserProfileModel, UserInfoModel, TokenModel } from '../models/user-info.model';
import { Router } from '@angular/router';
import { DbqueryService } from './dbquery.service';
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: firebase.User;
  private access_token;
  constructor(
    public afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private googleDriveService: GoogleDriveService,
    private router: Router,
    private dbService: DbqueryService,
    public formstatusservice: FormstatusService
  ) {
    this.initclient();
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }
  initclient() {
    gapi.load('client', () => {
      console.log('loaded client');

      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: 'AIzaSyAPrA2TRP-YYhcVXnWWhbCfddHnu0kn_AA',
        clientId: '48119150430-87dj9t81g9h1erfkibhtr7vva07kov0j.apps.googleusercontent.com',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        scope: 'https://www.googleapis.com/auth/spreadsheets'
      });
      // gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));
    });
  }
  get authenticated(): boolean {
    return this.user !== null;
  }
  async refresh() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const newUser = googleAuth.currentUser.get().reloadAuthResponse(true);
    Promise.resolve(newUser).then(function(value) {
      const data = JSON.parse(localStorage.getItem('userInfo'));
      data['token']['oAuthToken'] = value.access_token;
      localStorage.setItem('userInfo', JSON.stringify(data));
      console.log(value.access_token);
    });
    console.log(newUser);
  }
  getEmail() {
    return this.user && this.user.email;
  }
  signOut(): Promise<void> {
    localStorage.clear();
    return this.afAuth.auth.signOut();
  }
  signInWithEmail(credentials) {
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
      credentials.password)
      .then(res => {
        return this.signInHandler(res);
      });
  }
  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((createUserWithCredsResponse) => {

        console.log('createUserWithCredsResponse', createUserWithCredsResponse);

        return this.signInHandler(createUserWithCredsResponse);
      });
  }

  async signInWithGoogle() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();
  //   await googleAuth.grantOfflineAccess().then(function (response) {
  //     const tok = response.code;
  //     console.log(tok);
  // });

    const idToken = googleUser.getAuthResponse().id_token;
    this.access_token = googleUser.getAuthResponse().access_token;
    console.log(googleUser);

    const credential = auth.GoogleAuthProvider.credential(idToken);


    return this.afAuth.auth.signInAndRetrieveDataWithCredential(credential)
    .then(res => {
        console.log('signInWithGoogle', res);
        this.signInHandler(res);
    });
  }


  public signInHandler(data): void {
    // console.log('this.signInHandler', data);

    this.afDb.database.ref('profile').orderByChild('userId').equalTo
    (data['additionalUserInfo']['profile']['email']).on('child_added', (snapshot) => {
      const sheetId: string = snapshot.child('sheetId')['node_']['value_'];

      const userInfo = new UserInfoModel(new TokenModel(this.access_token,
      data['user']['refreshToken'], sheetId), new UserProfileModel(data['additionalUserInfo']['profile']['email'],
      data['additionalUserInfo']['profile']['family_name'], data['additionalUserInfo']['profile']['given_name'],
      data['additionalUserInfo']['profile']['name'], data['additionalUserInfo']['profile']['picture']));

      console.log('userInfo', userInfo);

      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      if (data.additionalUserInfo.isNewUser) {
        // return this.setUpNewUser(data);
      }
      // this.router.navigate(['/home']);
      this.formstatusservice.checkmenustatus();
      this.formstatusservice.checkForInitialSetup();
      });

  }



  public oauthSignIn(provider: AuthProvider): any {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(provider);
    } else {
      return this.afAuth.auth.signInWithRedirect(provider)
        .then(() => {
          return this.afAuth.auth.getRedirectResult().then(result => {
            return this.signInHandler(result);
          }).catch(function (error) {
            console.error(error.message);
          });
        });
    }
  }


}
