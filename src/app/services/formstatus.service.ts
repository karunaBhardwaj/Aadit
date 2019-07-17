import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import * as $ from 'jquery';
@Injectable({
    providedIn: 'root'
  })
export class FormstatusService {
    constructor( private router: Router, private menuCtrl: MenuController) {}

    async checkForInitialSetup() {
      const pages = [3, 4];
      let ProfileData;
      let TestData;
      // Profile Data
      await $.ajax('https://aadit-nodeserver.herokuapp.com/getCells', {
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        processData: false,
        data: JSON.stringify({
          sheetid: '1Sv1BbZFmN4rxu2L1VM6RZ679xrV3RwtmlIY0vcIZC5I',
          worksheet: 3,
          options: {
            'min-row': 2,
            'max-row': 2,
            'min-col': 2,
            'max-col': 2,
            'return-empty': true
          }
        })
      }).then(function success(mail) {
        if (mail[0]['_value'] === '') {
          console.log('no data ');
          return ProfileData = false;
        } else {
          console.log('data present');
          return ProfileData = true;
        }
      });
      // Test Data
      await $.ajax('https://aadit-nodeserver.herokuapp.com/getCells', {
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        processData: false,
        data: JSON.stringify({
          sheetid: '1Sv1BbZFmN4rxu2L1VM6RZ679xrV3RwtmlIY0vcIZC5I',
          worksheet: 4,
          options: {
            'min-row': 2,
            'max-row': 2,
            'min-col': 2,
            'max-col': 2,
            'return-empty': true
          }
        })
      }).then(function success(mail) {
        if (mail[0]['_value'] === '') {
          console.log('no data ');
          return TestData = false;
        } else {
          console.log('data present');
          return TestData = true;
        }
      });

      if (ProfileData === false && TestData === false) {
        console.log('Profile not updated');
        this.router.navigateByUrl('/signupform');
        this.menuCtrl.enable(true, 'menu1');
      } else if (ProfileData === true && TestData === false) {
        this.router.navigateByUrl('/workout');
        this.menuCtrl.enable(true, 'menu1');
      } else {
        this.router.navigateByUrl('/workout');
        this.menuCtrl.enable(true, 'menu2');
      }
    }
  }

