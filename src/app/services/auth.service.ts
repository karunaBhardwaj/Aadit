import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {FormstatusService} from './formstatus.service';
import { auth } from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { UserProfileModel, UserInfoModel, TokenModel } from '../models/user-info.model';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { firebaseConfig } from '../../config';
import { LoadingController, Platform} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { DbqueryService } from './dbquery.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: firebase.User;
  private userToken;
  private authToken;
  constructor(
    private plt: Platform,
    public afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private router: Router,
    public formstatusservice: FormstatusService,
    public googlePlus: GooglePlus,
    public loadingController: LoadingController,
    public alertCntrl: AlertController,
    private dbService: DbqueryService,
    public emailComposer: EmailComposer
  ) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  getEmail() {
    return this.user && this.user.email;
  }
  signOut() {
    if (this.plt.is('cordova')) {
      this.googlePlus.logout()
      .then(res => {
        localStorage.clear();
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
      });
  } else {
    localStorage.clear();
    return this.afAuth.auth.signOut();
  }


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

  async ErrorAlert(err) {
    const alert = await this.alertCntrl.create({
      header: 'Error Occured',
      message: `${err}
                Do you want to contact admin?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Contact',
          handler: () => {
            console.log('Conatct clicked');
            this.emailComposer.addAlias('gmail', 'com.google.android.gm');
            this.emailComposer.open({
              app: 'gmail',
              to: 'aaditlife.test@gmail.com'
            });
          }
        }
      ]
    });
    alert.present();
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  async signInWithGoogle(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    await this.googlePlus.login({
              'scopes': 'profile',
              'webClientId': firebaseConfig.firbase.client_id
    }).then(res => {
      console.log(res);
      this.userToken = res.idToken;
      this.authToken = res.accessToken;
    }).catch(err => {
      console.error(err);
      loading.dismiss();
      this.ErrorAlert(err);
    });
      const credential = auth.GoogleAuthProvider.credential(this.userToken);

      return this.afAuth.auth.signInAndRetrieveDataWithCredential(credential)
      .then(res => {
          console.log('signInWithGoogle', res);
          this.signInHandler(res);
          loading.dismiss();
      });
    }


    public signInHandler(data): void {
      this.afDb.database.ref('profile').orderByChild('userId').equalTo
      (data['additionalUserInfo']['profile']['email']).on('child_added', (snapshot) => {
        const sheetId: string = snapshot.child('sheetId')['node_']['value_'];
        const userInfo = new UserInfoModel(new TokenModel(this.authToken,
        data['user']['refreshToken'], sheetId), new UserProfileModel(data['additionalUserInfo']['profile']['email'],
        data['additionalUserInfo']['profile']['family_name'], data['additionalUserInfo']['profile']['given_name'],
        data['additionalUserInfo']['profile']['name'], data['additionalUserInfo']['profile']['picture']));

        console.log('userInfo', userInfo);

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        if (data.additionalUserInfo.isNewUser) {
          // return this.setUpNewUser(data);
        }
        // this.router.navigate(['/home']);
        this.formstatusservice.checkForInitialSetup();
        });

    }

    signInWithGoogleWeb() {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      // provider.addScope('https://www.googleapis.com/auth/spreadsheets');
      // provider.addScope('https://www.googleapis.com/auth/drive');

      return this.oauthSignIn(provider)
        .then(res => {
          console.log('signInWithGoogle', res);
          this.signInHandler(res);
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


    public PlatformSelect() {
      if (this.plt.is('cordova')) {
        this.signInWithGoogle().catch(
          error => console.log(error.message)
        );

    } else {
      this.signInWithGoogleWeb().catch(
      function(error) {
      console.log(error);
      });
    }
  }

}
