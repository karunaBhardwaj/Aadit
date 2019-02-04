import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { GoogleDriveService } from '../services/google-drive.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private menuCtrl: MenuController,
    private googleDriveService: GoogleDriveService,
    public modalController: ModalController,
    private router: Router
  ) { }

  ionViewWillEnter() {

    this.menuCtrl.enable(true);
    // this.checkForInitialSetup();
  }
  // checkForInitialSetup() {

  //   this.googleDriveService.getAllSheetData(this.googleDriveService.getSheetId()).subscribe(
  //     sheetData => {
  //       this.googleDriveService.saveAllSheetData(sheetData['valueRanges']);
  //       // console.log('this.isProfileSetupComplete()', this.googleDriveService.isProfileSetupComplete());
  //       if (this.googleDriveService.isProfileSetupComplete() === false) {console.log('Signup form is not updated');
  //       this.router.navigateByUrl('/signupform');
  //     } else if (this.googleDriveService.isGoalSetupComplete() === false) {console.log('Goals setup is not updated');
  //     this.router.navigateByUrl('/goals');
  //     } else if (this.googleDriveService.isMedicalSetupComplete() === false) {console.log('Medical history is not updated');
  //     this.router.navigateByUrl('/medicalhistory');
  //     } else {
  //     this.router.navigateByUrl('/thankyou'); }
  //     },
  //     err => {
  //       console.error(err);
  //     }
  //   );

  // }

}
