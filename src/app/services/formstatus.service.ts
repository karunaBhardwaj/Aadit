import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import * as $ from 'jquery';
import { SheetsService } from './sheets.service';
@Injectable({
    providedIn: 'root'
  })
export class FormstatusService {
    constructor( private router: Router, private menuCtrl: MenuController, private sheetsservice: SheetsService) {}

    async checkForInitialSetup() {
      const data = await this.sheetsservice.intialValuesCheck('1Sv1BbZFmN4rxu2L1VM6RZ679xrV3RwtmlIY0vcIZC5I',
      'MedicalHistory!B2:B2,TestData!A2:N2');
      if (data === 'profile Data unavailable') {
        console.log('Profile not updated');
        this.router.navigateByUrl('/signupform');
        this.menuCtrl.enable(true, 'menu1');
      } else if (data === false) {
        this.router.navigateByUrl('/workout');
        this.menuCtrl.enable(true, 'menu1');
      } else {
        this.router.navigateByUrl('/workout');
        this.menuCtrl.enable(true, 'menu2');
      }
    }
  }

