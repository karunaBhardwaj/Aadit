import { Component, OnInit } from '@angular/core';
import { GoogleDriveService } from 'src/app/services/google-drive.service';
import { SheetTabsTitleConst } from '../constants/sheet.constant';
import { DriveRequestModel } from '../models/drive-postdata.model';
import {  Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-foodlog',
  templateUrl: './foodlog.page.html',
  styleUrls: ['./foodlog.page.scss'],
})
export class FoodlogPage implements OnInit {
  myForm: FormGroup;

  constructor(private router: Router,
    private googleDriveService: GoogleDriveService) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      date: new FormControl(new Date().toLocaleDateString(), [Validators.required]),
     time : new FormControl('', [Validators.required]),
      details: new FormControl('', [Validators.required, , Validators.minLength(2)])
    });
     console.log(this.googleDriveService.getLocalSheetTabData(SheetTabsTitleConst.FOOD_LOG));
  }
  onSave( ) {

    const postData: DriveRequestModel = this.getParsedPostData(this.myForm.value);
    this.googleDriveService.setAllSheetData(this.googleDriveService.getSheetId(), postData).subscribe();
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
        'range': `${SheetTabsTitleConst.FOOD_LOG}!A2:C2`,
        'majorDimension': 'ROWS',
        'values': [values]
      }]
    };

    console.log('postData', postData);
    return postData;

  }
}
