import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GoogleDriveService } from 'src/app/services/google-drive.service';
import { SheetTabsTitleConst } from '../constants/sheet.constant';
import { DriveRequestModel } from '../models/drive-postdata.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.page.html',
  styleUrls: ['./disclaimer.page.scss'],
})
export class DisclaimerPage implements OnInit {

  myForm: FormGroup;


  constructor(private router: Router, private googleDriveService: GoogleDriveService) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      grantPermission: new FormControl(false, [Validators.required])
    });

  }
  get grantPermission(): string {
    return this.myForm.value['grantPermission'];
  }

  onSubmit() {
    const postData: DriveRequestModel = this.getParsedPostData(this.myForm.value);

    this.googleDriveService.setAllSheetData(this.googleDriveService.getSheetId(), postData).subscribe();
    alert('profile setup completed');
    this.router.navigateByUrl('/workout');
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
        'range': `${SheetTabsTitleConst.MEDICAL_HISTORY}!B14`,
        'majorDimension': 'COLUMNS',
        'values': [values]
      }]
    };

    console.log('postData', postData);
    return postData;

  }

}

