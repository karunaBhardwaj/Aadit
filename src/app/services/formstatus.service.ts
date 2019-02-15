import { Injectable, NgZone } from '@angular/core';
import { GoogleDriveService } from './google-drive.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
  })
export class FormstatusService {
    constructor(private googleDriveService: GoogleDriveService, private router: Router,private menuCtrl: MenuController,
       private ngZone: NgZone) {}

    checkForInitialSetup() {

        this.googleDriveService.getAllSheetData(this.googleDriveService.getSheetId()).subscribe(
          sheetData => {
            this.googleDriveService.saveAllSheetData(sheetData['valueRanges']);
            // console.log('this.isProfileSetupComplete()', this.googleDriveService.isProfileSetupComplete());
            if (this.googleDriveService.isProfileSetupComplete() === false) {console.log('Signup form is not updated');
            this.ngZone.run(() => this.router.navigateByUrl('/signupform')).then();
          } else if (this.googleDriveService.isGoalSetupComplete() === false) {console.log('Goals setup is not updated');
            this.ngZone.run(() => this.router.navigateByUrl('/goals')).then();
          } else if (this.googleDriveService.isMedicalSetupComplete() === false) {console.log('Medical history is not updated');
            this.ngZone.run(() => this.router.navigateByUrl('/medicalhistory')).then();
          } else {
            this.ngZone.run(() => this.router.navigateByUrl('/thankyou')).then(); }
          },
          err => {
            console.error(err);
          }
        );
      }

    checkmenustatus() {
      this.googleDriveService.getAllSheetData(this.googleDriveService.getSheetId()).subscribe(
          sheetData => {
            this.googleDriveService.saveAllSheetData(sheetData['valueRanges']);
        if (this.googleDriveService.isTestSetupComplete() === false) { console.log('Data Unavailable Show Menu-1'); this.menuCtrl.enable(true, 'menu1');
      } else {console.log('Data available Show Menu-2'); this.menuCtrl.enable(true, 'menu2'); }
      },
      err => {
        console.error(err);
      }
    );
  }
}
