import { Component, OnInit } from '@angular/core';
import { GoogleDriveService } from 'src/app/services/google-drive.service';
import { SheetTabsTitleConst } from '../constants/sheet.constant';
import { DriveRequestModel } from '../models/drive-postdata.model';
import {  Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-workoutlog',
  templateUrl: './workoutlog.page.html',
  styleUrls: ['./workoutlog.page.scss'],
})
export class WorkoutlogPage implements OnInit {
  myForm: FormGroup;
  constructor(private router: Router,
    private googleDriveService: GoogleDriveService) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      date: new FormControl(new Date().toLocaleDateString(), [Validators.required, Validators.minLength(2)]),
      workout_type: new FormControl('', [Validators.required]),
      feedback: new FormControl('', [Validators.required, Validators.minLength(2)]),
      comment: new FormControl('', [Validators.required])
    });
      console.log(this.googleDriveService.getLocalSheetTabData(SheetTabsTitleConst.SIGN_UP));
  }
  onSave( ) {

    const postData: DriveRequestModel = this.getParsedPostData(this.myForm.value);

    this.googleDriveService.setAllSheetData(this.googleDriveService.getSheetId(), postData).subscribe();

    // this.router.navigateByUrl('/goals');
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
        'range': `${SheetTabsTitleConst.WORKOUT_LOG}!A2:D2`,
        'majorDimension': 'ROWS',
        'values': [values]
      }]
    };

    console.log('postData', postData);
    return postData;

  }


}
