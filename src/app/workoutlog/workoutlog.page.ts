import { Component, OnInit } from '@angular/core';
import { GoogleDriveService } from 'src/app/services/google-drive.service';
import { SheetTabsTitleConst } from '../constants/sheet.constant';
import { DriveRequestModel } from '../models/drive-postdata.model';
import {  Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../services/app.service';
import $ from 'jquery';

@Component({
  selector: 'app-workoutlog',
  templateUrl: './workoutlog.page.html',
  styleUrls: ['./workoutlog.page.scss'],
})

export class WorkoutlogPage implements OnInit {
  myForm: FormGroup;
  Data = this.appservice.getUserInfo();
  workData = this.googleDriveService.getLocalSheetTabData(SheetTabsTitleConst.WORKOUT_LOG);
  workVal = (this.workData.data.values.length) + 1;
  constructor(private router: Router,
    private appservice: AppService,
    private http: HttpClient,
    private googleDriveService: GoogleDriveService) { }

  feedback_value: string;
  // fetchTodayWorkout() {
  //   const Url = this.appservice.getParsedGetDataUrl(this.googleDriveService.getSheetId(), SheetTabsTitleConst.WORKOUT);
  //   const Info = fetch(Url).then(function(response) {return response.json(); }).then(function(myJson) {
  //   const value = myJson['values'] ;
  //   let List: string[] = [] ;
  //   value.forEach(element => {
  //     for ( let i = 0; i < value.length ; i++) {
  //     if (new Date().toLocaleDateString() === element[i]) { List = element; } }
  //     });
  //   return List;
  //   });
  //   return Info;
  // }
  get workout_type(): string {
    // let Type_Data: string[];
    // this.fetchTodayWorkout().then(function (x) { Type_Data = x; });
    return this.myForm.value['workout_type'] ;
  }

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

  get comment(): string {
    return this.myForm.value['comment'];
  }
  Mail() {
    if (this.feedback_value === 'Happy') {
      console.log('No need to send mail');
    } else {
      $.ajax('http://localhost:3030/sendMail', {
        method: 'POST',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({
            from: this.Data.profile.email,
            to: 'abhilash.vadlamudi@wissen.com' ,
            subject: 'Workout Feedback',
            message: `Date : ${new Date().toLocaleDateString()}<br/>
                      Workout Type: ${this.workout_type}<br/>
                      Feedback: ${this.feedback}<br/>
                      Comment:  ${this.comment}`
        })
    })
    .then(
        function success(userInfo) {
            console.log('Mail has been sent successfully');
        }
    );
    }
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      date: new FormControl(new Date().toLocaleDateString(), [Validators.required]),
      workout_type: new FormControl(''),
      feedback: new FormControl('',  [Validators.required]),
      comment: new FormControl('')
    });
    console.log(this.googleDriveService.getLocalSheetTabData(SheetTabsTitleConst.WORKOUT_LOG));
  }


  onSubmit( ) {

    const postData: DriveRequestModel = this.getParsedPostData(this.myForm.value);
    this.googleDriveService.setAllSheetData(this.googleDriveService.getSheetId(), postData).subscribe();
    this.Mail();
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

}
