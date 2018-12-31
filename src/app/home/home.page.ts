import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { SheetTabsTitleConst } from '../constants/sheet.constant';
import { GoogleDriveService } from '../services/google-drive.service';
import { MedicalModal } from '../modals/medical/medical.modal';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private menuCtrl: MenuController,
    private googleDriveService: GoogleDriveService,
    public modalController: ModalController
  ) { }

  ionViewWillEnter() {
    
    this.menuCtrl.enable(true);
    this.checkForInitialSetup();
  }


  private async showMedicalModal() {
    const modal = await this.modalController.create({
      component: MedicalModal,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }
  checkForInitialSetup() {

    this.googleDriveService.getAllSheetData(this.googleDriveService.getSheetId()).subscribe(
      sheetData => {
        debugger
        this.googleDriveService.saveAllSheetData(sheetData['valueRanges']);
        console.log('this.isProfileSetupComplete()', this.googleDriveService.isProfileSetupComplete());
        console.log('this.isGoalSetupComplete()', this.googleDriveService.isGoalSetupComplete());
        console.log('this.isMedicalSetupComplete()', this.googleDriveService.isMedicalSetupComplete());

        this.showMedicalModal();

      },
      err => {
        console.error(err);
      }
    );
    this.googleDriveService.getSheetTabData(this.googleDriveService.getSheetId(), SheetTabsTitleConst.GOALS).subscribe();


  }

}
