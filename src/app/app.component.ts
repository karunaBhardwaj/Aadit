import { Component, OnInit } from '@angular/core';
import {FormstatusService} from './services/formstatus.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router} from '@angular/router';
import { AuthService } from './services/auth.service';
import { AppService } from './services/app.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title : 'About US',
      url : '/aboutus'
    },
    {
      title : 'Contact US',
      url : '/contactus'
    },
    {
      title : 'Workout log',
      url : '/workoutlog'
    },
    {
      title : 'Food Log',
      url : '/foodlog'
    }
  ];

public allPages = [
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
  }
];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private auth: AuthService,
    private appService: AppService,
    private formstatusservice: FormstatusService,
    private backgroundMode: BackgroundMode
      ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.backgroundMode.enable();
      // this.statusBar.styleDefault();
    });
    console.log('userInfo', this.appService.getUserInfo());
    // setInterval(this.auth.refresh, 55 * 60 * 1000);

    this.auth.afAuth.authState
      .subscribe(
        user => {
          if (this.appService.getUserInfo()) {
            // this.router.navigate(['/home']);
            this.formstatusservice.checkmenustatus();
            this.formstatusservice.checkForInitialSetup();
          } else {
            this.router.navigate(['/login']);
          }
        },
        () => {
          this.router.navigate(['/login']);
        }
      );
    // this.router.navigate(['/workoutlog']);
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }
  ngOnInit() { }

}
