import { Injectable } from '@angular/core';
import { GoogleDriveService } from './google-drive.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class FormstatusService {
    constructor(private googleDriveService: GoogleDriveService,private router: Router) {}

    checkForInitialSetup() {

        this.googleDriveService.getAllSheetData(this.googleDriveService.getSheetId()).subscribe(
          sheetData => {
            this.googleDriveService.saveAllSheetData(sheetData['valueRanges']);
            // console.log('this.isProfileSetupComplete()', this.googleDriveService.isProfileSetupComplete());
            if (this.googleDriveService.isProfileSetupComplete() === false) {console.log('Signup form is not updated');
            this.router.navigateByUrl('/signupform');
          } else if (this.googleDriveService.isGoalSetupComplete() === false) {console.log('Goals setup is not updated');
          this.router.navigateByUrl('/goals');
          } else if (this.googleDriveService.isMedicalSetupComplete() === false) {console.log('Medical history is not updated');
          this.router.navigateByUrl('/medicalhistory');
          } else {
          this.router.navigateByUrl('/thankyou'); }
          },
          err => {
            console.error(err);
          }
        );
      }
}
