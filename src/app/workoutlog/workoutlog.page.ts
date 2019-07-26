import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../services/app.service';
import { SheetsService } from '../services/sheets.service';
import { MailService } from '../services/mail.service';
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
    private mailservice: MailService,
    private sheetsservice: SheetsService) { }

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
      const data = `Date : ${new Date().toLocaleDateString()},
      Email: ${this.Data.profile.email},
      Workout Type: ${this.workout_type},
      Feedback: ${this.feedback},
      Comment:  ${this.comment}`;
      this.mailservice.sendMail('abhilash.vadlamudi@wissen.com', 'Workout Feedback', data );
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
    const values = []  ;

    Object.values(this.myForm.value).forEach(value => {
      values.push(value);
    });
    this.sheetsservice.appendValues(this.appservice.getUserInfo().token.sheetId,
    'WorkoutLog!A2:D2', 'USER_ENTERED', [values]);

    this.Mail();
    this.router.navigateByUrl('/workout');
  }

}
