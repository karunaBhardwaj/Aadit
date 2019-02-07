import { Component, OnInit } from '@angular/core';
import { GoogleDriveService } from 'src/app/services/google-drive.service';
import { SheetTabsTitleConst } from '../constants/sheet.constant';
import { DriveRequestModel } from '../models/drive-postdata.model';
import {  Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../services/app.service';
import $ from 'jquery';
import {EndpointService} from '../services/endpoint.service';
import * as moment from 'moment';
@Component({
  selector: 'app-workoutlog',
  templateUrl: './workoutlog.page.html',
  styleUrls: ['./workoutlog.page.scss'],
})

export class WorkoutlogPage implements OnInit {
  myForm: FormGroup;
  Data = this.appservice.getUserInfo();
  workVal;
  feedback_value: string;

  constructor(private router: Router,
    private appservice: AppService,
    private sgservice: EndpointService,
    private http: HttpClient,
    private googleDriveService: GoogleDriveService) { }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  fetchWorkLog() {
    const Url = this.appservice.getParsedGetDataUrl(this.googleDriveService.getSheetId(), SheetTabsTitleConst.WORKOUT_LOG);
    const Info = fetch(Url).then(function(response) {return response.json(); }).then(function(myJson) {
    const value = myJson['values'] ;
    let List = 1 ;
    value.forEach(element => {
      for ( let i = 0; i < value.length ; i++) {
      if (moment(element[i], 'M/D/YYYY', true).isValid() === true ) { List = List + 1; } }
      });
    return List;
    });
    return Info;
  }

  async ionViewWillEnter () {
    let Type_Data: number;
    await this.fetchWorkLog().then(function (x) { Type_Data = x; });
    console.log(Type_Data);
    this.workVal = Type_Data + 1;

  }

  addExpression(feedback) {
    this.feedback_value = '';
    this.feedback_value = feedback;
    if (this.feedback_value === 'Happy') {
      document.getElementById('div1').style.display = 'none';
    } else { document.getElementById('div1').style.display = 'block'; }
  }

  get workout_type(): string {
    return this.myForm.value['workout_type'] ;
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
      $.ajax(this.sgservice.sendgridApi, {
      async: true,
      crossDomain: true,
      method: 'POST',
      headers: {
        'authorization': `Bearer ${this.sgservice.sgApiKey}`,
        'content-type': 'application/json'
      },
      processData: false,
      data: JSON.stringify({
        'personalizations': [
          {
            'to': [
              {
                'email': 'abhilash.vadlamudi@wissen.com',
                'name': `Aadit Life`
              }
            ],
            'subject': 'Workout Feedback !!'
          }
        ],
        'from': {
          'email': `${this.Data.profile.email}`,
          'name': `${this.Data.profile.fullName}`
        },
        'reply_to': {
          'email': 'aaditlife.test@gmail.com',
          'name': 'Aadit Life'
        },
        'content': [
          {
            'type': 'text/html',
            'value': `Date : ${new Date().toLocaleDateString()}<br/>
                      Workout Type: ${this.workout_type}<br/>
                      Feedback: ${this.feedback}<br/>
                      Comment:  ${this.comment}`
          }
        ]
      })
  })
  .then(
      function success(mail) {
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
