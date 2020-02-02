import { Component, OnInit } from '@angular/core';
import {FormstatusService} from './services/formstatus.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router} from '@angular/router';
import { AuthService } from './services/auth.service';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title : 'Google Profile',
      url : '/profile'
    },
    {
      title : 'About US',
      url : '/aboutus'
    },
    {
      title : 'Contact US',
      url : '/contactus'
    },
    {
      title : 'Profile',
      url : '/display-profile'
    },
    {
      title : 'Goals',
      url : '/display-goals'
    },
    {
      title : 'Medical History',
      url : '/display-medical'
    },
    {
      title : 'Disclaimer',
      url : '/display-disclaimer'
    }
  ];

public allPages = [
  {
    title : 'Google Profile',
    url : '/profile'
  },
  {
    title: 'Dashboard',
    url: '/dashboard'
  },
  {
    title : 'Workout',
    url : '/workout'
  },
  {
    title : 'Contact US',
    url : '/contactus'
  },
  {
    title : 'About US',
    url : '/aboutus'
  },
  {
    title : 'Workout log',
    url : '/workoutlog'
  },
  {
    title : 'Food Log',
    url : '/foodlog'
  },
  {
    title : 'Profile',
    url : '/display-profile'
  },
  {
    title : 'Goals',
    url : '/display-goals'
  },
  {
    title : 'Medical History',
    url : '/display-medical'
  },
  {
    title : 'Disclaimer',
    url : '/display-disclaimer'
  }
];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private auth: AuthService,
    private appService: AppService,
    private formstatusservice: FormstatusService
      ) {
    this.initializeApp();
  }
  async initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {

      document.addEventListener('deviceready', function() {
        const Sentry = cordova.require('sentry-cordova.Sentry');
        Sentry.init({ dsn: 'https://370d5dd528164e71bd430ce3b0cef543@sentry.io/1444624'});
      });
      // this.statusBar.styleDefault();
    }
    });

    console.log('userInfo', this.appService.getUserInfo());

    await this.auth.afAuth.authState
      .subscribe(
        user => {
          if (this.appService.getUserInfo()) {
            if (this.platform.is('cordova')) {

            const Sentry = cordova.require('sentry-cordova.Sentry');
            Sentry.configureScope(function (scope) {
              scope.setUser({email: JSON.parse(localStorage.getItem('userInfo')).profile.email,
              username: JSON.parse(localStorage.getItem('userInfo')).profile.fullName});
            });
          }
            // this.router.navigate(['/home']);
            this.formstatusservice.checkForInitialSetup();
          } else {
            this.router.navigate(['/login']);
          }
        },
        () => {
          this.router.navigate(['/login']);
        }
      );
    // this.router.navigate(['/workout']);
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }
  ngOnInit() { }

}
