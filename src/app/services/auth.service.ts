import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {FormstatusService} from './formstatus.service';
import { auth } from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { UserProfileModel, UserInfoModel, TokenModel } from '../models/user-info.model';
import { Router } from '@angular/router';
import { DbqueryService } from './dbquery.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as $ from 'jquery';
import { AppService } from './app.service';
import { firebaseConfig } from '../../config';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: firebase.User;
  private userToken;
  private authToken;
  constructor(
    public afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private appservice: AppService,
    private router: Router,
    private dbService: DbqueryService,
    public formstatusservice: FormstatusService,
    public googlePlus: GooglePlus
  ) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  get authenticated(): boolean {
    return this.user !== null;
  }
  async refresh() {
    const settings = {
      'async': true,
      'crossDomain': true,
      'url': 'https://www.googleapis.com/oauth2/v4/token',
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache',
      },
      'data': {
        'grant_type': 'refresh_token',
        'client_id': firebaseConfig.firbase.client_id,
        'client_secret': firebaseConfig.firbase.client_secret,
        'refresh_token': this.appservice.getUserInfo().token.refreshToken
      }
    };

    await $.ajax(settings).done(function (response) {
      console.log(response);
      const data = JSON.parse(localStorage.getItem('userInfo'));
        data['token']['oAuthToken'] = response.access_token;
        localStorage.setItem('userInfo', JSON.stringify(data));
        console.log(response.access_token);
    });
  }

  async generateToken(code) {
    const settings = {
      'async': true,
      'crossDomain': true,
      'url': 'https://www.googleapis.com/oauth2/v4/token',
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache',
      },
      'data': {
        'grant_type': 'authorization_code',
        'code': code,
        'client_id': firebaseConfig.firbase.client_id,
        'client_secret': firebaseConfig.firbase.client_secret,
        'redirect_uri': ''
      }
    };
    let data;
    await $.ajax(settings).done(function (response) {
      console.log(response);
      data = response;
    });
    this.userToken = await data;
  }

  getEmail() {
    return this.user && this.user.email;
  }
  signOut(): Promise<void> {
    localStorage.clear();
    this.googlePlus.logout();
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

  async signInWithGoogle(): Promise<void> {
  await this.googlePlus.login({
            'scopes': 'profile https://www.googleapis.com/auth/spreadsheets',
            'webClientId': firebaseConfig.firbase.client_id,
            'offline': true
  }).then(res => {
    this.authToken = res.serverAuthCode;
  }).catch(err => {
    console.error(err);
  });
  await this.generateToken(this.authToken);
    const credential = auth.GoogleAuthProvider.credential(this.userToken.id_token);

    return this.afAuth.auth.signInAndRetrieveDataWithCredential(credential)
    .then(res => {
        console.log('signInWithGoogle', res);
        this.signInHandler(res);
    });
  }


  public signInHandler(data): void {
    this.afDb.database.ref('profile').orderByChild('userId').equalTo
    (data['additionalUserInfo']['profile']['email']).on('child_added', (snapshot) => {
      const sheetId: string = snapshot.child('sheetId')['node_']['value_'];

      const userInfo = new UserInfoModel(new TokenModel(this.userToken.access_token,
      this.userToken.refresh_token, sheetId), new UserProfileModel(data['additionalUserInfo']['profile']['email'],
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

}
