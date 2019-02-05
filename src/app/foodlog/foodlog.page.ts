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
  foodData = this.googleDriveService.getLocalSheetTabData(SheetTabsTitleConst.WORKOUT_LOG);
  foodVal = (this.foodData.data.values.length) + 1;

  constructor(private router: Router,
    private googleDriveService: GoogleDriveService) { }
    food_value: string;

  ngOnInit() {
    this.myForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      time : new FormControl(new Date().toLocaleTimeString(), [Validators.required]),
      food : new FormControl('', [Validators.required]),
      details: new FormControl('', [Validators.required, , Validators.minLength(2)])
    });
     console.log(this.googleDriveService.getLocalSheetTabData(SheetTabsTitleConst.FOOD_LOG));
    }
    doRefresh(event) {
      console.log('Begin async operation');
      this.ngOnInit();
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
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
        'range': `${SheetTabsTitleConst.FOOD_LOG}!A${this.foodVal}:D${this.foodVal}`,
        'majorDimension': 'ROWS',
        'values': [values]
      }]
    };

    console.log('postData', postData);
    return postData;

  }
}
