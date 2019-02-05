import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleDriveService } from 'src/app/services/google-drive.service';
import { SheetTabsTitleConst } from '../constants/sheet.constant';
import { DriveRequestModel } from '../models/drive-postdata.model';
@Component({
  selector: 'app-medicalhistory',
  templateUrl: './medicalhistory.page.html',
  styleUrls: ['./medicalhistory.page.scss'],
})
export class MedicalhistoryPage implements OnInit {
  myForm: FormGroup;
  checkup_value: string;
  constructor(private router: Router, private googleDriveService: GoogleDriveService) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      checkup: new FormControl(''),
      rev1: new FormControl(false),
      rev2: new FormControl(false),
      rev3: new FormControl(false),
      rev4: new FormControl(false),
      rev5: new FormControl(false),
      rev6: new FormControl(false),
      rev7: new FormControl(false),
      rev8: new FormControl(false),
      rev9: new FormControl(false),
      rev10: new FormControl(false),
      rev11: new FormControl(false)
    });
  }
  datachanged(e) {
    console.log(e);
}
  selectCheckup(checkup) {
    this.checkup_value = '';
    this.checkup_value = checkup;
  }

  get checkup(): string {
    return this.myForm.value['checkup'] = this.checkup_value;
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  onSubmit() {
    const postData: DriveRequestModel = this.getParsedPostData(this.myForm.value);

    this.googleDriveService.setAllSheetData(this.googleDriveService.getSheetId(), postData).subscribe();

    this.router.navigateByUrl('/disclaimer');
  }

  private getParsedPostData(formData): DriveRequestModel {
    console.log(formData);
    const values = [];

    Object.values(formData).forEach(value => {
      values.push(value);
    });

    const postData: DriveRequestModel = {
      'valueInputOption': 'USER_ENTERED',
      'data': [{
        'range': `${SheetTabsTitleConst.MEDICAL_HISTORY}!B2:B13`,
        'majorDimension': 'COLUMNS',
        'values': [values]
      }]
    };

    console.log('postData', postData);
    return postData;

  }

}
