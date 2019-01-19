import { Component, OnInit } from '@angular/core';
import { GoogleDriveService } from 'src/app/services/google-drive.service';
import { SheetTabsTitleConst } from '../constants/sheet.constant';
import { DriveRequestModel } from '../models/drive-postdata.model';
import {  Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-workoutlog',
  templateUrl: './workoutlog.page.html',
  styleUrls: ['./workoutlog.page.scss'],
})

export class WorkoutlogPage implements OnInit {
  myForm: FormGroup;
  workData = this.googleDriveService.getLocalSheetTabData(SheetTabsTitleConst.WORKOUT_LOG);
  workVal = (this.workData.data.values.length) + 1;

  constructor(private router: Router,
    private appservice: AppService,
    private http: HttpClient,
    private googleDriveService: GoogleDriveService) { }

  feedback_value: string;

  addExpression(feedback) {
    this.feedback_value = '';
    this.feedback_value = feedback;
    if (this.feedback_value === 'Happy') {
      document.getElementById('div1').style.display = 'none';
    } else { document.getElementById('div1').style.display = 'block'; }
  }
  get feedback(): string {
    return this.myForm.value['feedback'] = this.feedback_value;
  }

  async ngOnInit() {
    let Data: string[];
    await this.fetchTodayWorkout().then(function (x) { Data = x; });
    document.getElementById('type').innerHTML = 'hi';

    this.myForm = new FormGroup({
      date: new FormControl(new Date().toLocaleDateString(), [Validators.required]),
      workout_type: new FormControl('Data[1]', [Validators.required]),
      feedback: new FormControl('',  [Validators.required]),
      comment: new FormControl('')
    });
    console.log(this.googleDriveService.getLocalSheetTabData(SheetTabsTitleConst.WORKOUT_LOG));
  }


  onSubmit( ) {

    const postData: DriveRequestModel = this.getParsedPostData(this.myForm.value);
    this.googleDriveService.setAllSheetData(this.googleDriveService.getSheetId(), postData).subscribe();
    this.router.navigateByUrl('/workout');
  }

  private getParsedPostData(formData): DriveRequestModel {
    const values = [];
    Object.values(formData).forEach(value => {
      values.push(value);
    });
    const postData: DriveRequestModel = {
      'valueInputOption': 'USER_ENTERED',
      'data': [{
        'range': `${SheetTabsTitleConst.WORKOUT_LOG}!A${this.workVal}:D${this.workVal}`,
        'majorDimension': 'ROWS',
        'values': [values]
      }]
    };
    console.log('postData', postData);
    return postData;
  }

  fetchTodayWorkout() {
    const Url = this.appservice.getParsedGetDataUrl(this.googleDriveService.getSheetId(), SheetTabsTitleConst.WORKOUT);
    const Info = fetch(Url).then(function(response) {return response.json(); }).then(function(myJson) {
    const value = myJson['values'] ;
    let List: string[] = [] ;
    value.forEach(element => {
      for ( let i = 0; i < value.length ; i++) {
      if (new Date().toLocaleDateString() === element[i]) { List = element; } }
      });
    return List;
    });
    return Info;
  }

}
