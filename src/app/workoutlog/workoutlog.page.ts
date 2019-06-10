import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../services/app.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-workoutlog',
  templateUrl: './workoutlog.page.html',
  styleUrls: ['./workoutlog.page.scss'],
})

export class WorkoutlogPage implements OnInit {
  myForm: FormGroup;
  Data = this.appservice.getUserInfo();
  feedback_value: string;

  constructor(private router: Router,
    private appservice: AppService,
    private http: HttpClient) { }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
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

      $.ajax('https://aadit-server.azurewebsites.net/sendMail', {
        method: 'POST',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({
            from : this.Data.profile.email,
            to: 'abhilash.vadlamudi@wissen.com',
            subject: 'Workout Feedback',
            message: `Date : ${new Date().toLocaleDateString()}<br/>
                      Workout Type: ${this.workout_type}<br/>
                      Feedback: ${this.feedback}<br/>
                      Comment:  ${this.comment}`
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
      workout_type: new FormControl(this.router.getNavigatedData()),
      feedback: new FormControl('',  [Validators.required]),
      comment: new FormControl('')
    });
  }

  onSubmit( ) {

    const values = [];
    Object.values(this.myForm.value).forEach(value => {
      values.push(value);
    });
    $.ajax('https://aadit-server.azurewebsites.net/addRow', {
      method: 'POST',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        'sheetid': '1Sv1BbZFmN4rxu2L1VM6RZ679xrV3RwtmlIY0vcIZC5I',
        'worksheet': 10,
        'data' : {
          'Date' : values[0],
          'Workout Type' : values[1],
          'Feedback'  : values[2],
          'Comment' : values[3]
        }
    })
  })
  .then(
      function success(mail) {
          console.log('Data updated succesfully');
      }
  );
    this.Mail();
    this.router.navigateByUrl('/workout');
  }

}
