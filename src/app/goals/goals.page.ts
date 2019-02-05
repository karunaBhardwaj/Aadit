import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleDriveService } from 'src/app/services/google-drive.service';
import { SheetTabsTitleConst } from '../constants/sheet.constant';
import { DriveRequestModel } from '../models/drive-postdata.model';
@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {

  myForm: FormGroup;
  activity_level: string;
  validation_messages = {
    'reason': [
    { type: 'required', message: 'Enter a valid Reason.'},
    { type: 'minlength', message: 'Enter a valid Reason.'},
    ],
    'reason2': [
    { type: 'required', message: 'Enter a valid Reason.'},
    { type: 'minlength', message: 'Enter a valid Reason .'},
    ],
    'activity': [
      { type: 'required', message: 'Select a valid option.'},
    ],
    'reason3': [
      { type: 'required', message: 'Enter a valid Reason.'},
      { type: 'minlength', message: 'Enter a valid Reason .'},
    ]

    };
  constructor( private router: Router, private googleDriveService: GoogleDriveService) { }

  ngOnInit() {
    console.log(this.googleDriveService.getAllSheetData(SheetTabsTitleConst.GOALS));
    this.myForm = new FormGroup({
      reason: new FormControl('', [Validators.required, Validators.minLength(5)]),
      reason2: new FormControl('', [Validators.required, Validators.minLength(5)]),
      activity: new FormControl('', [Validators.required]),
      reason3: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

  }
  selectFrequency(activity) {
    this.activity_level = '';
    this.activity_level = activity;
  }

  get reason(): string {
    return this.myForm.value['reason'];
  }
  get reason2(): string {
    return this.myForm.value['reason2'];
  }
  get activity(): string {
    return this.myForm.value['activity'] = this.activity_level;
  }
  get reason3(): string {
    return this.myForm.value['reason3'];
  }

  onSubmit() {
    const postData: DriveRequestModel = this.getParsedPostData(this.myForm.value);

    this.googleDriveService.setAllSheetData(this.googleDriveService.getSheetId(), postData).subscribe();

    this.router.navigateByUrl('/medicalhistory');
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
        'range': `${SheetTabsTitleConst.GOALS}!B2:B5`,
        'majorDimension': 'COLUMNS',
        'values': [values]
      }]
    };

    console.log('postData', postData);
    return postData;

  }


}

