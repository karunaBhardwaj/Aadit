import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../services/app.service';
import * as $ from 'jquery';
import { SheetsService } from '../services/sheets.service';


@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.page.html',
  styleUrls: ['./signupform.page.scss'],
})
export class SignupformPage implements OnInit {
  Data = this.appservice.getUserInfo();
  myForm: FormGroup;
  sex: string ;
  validation_messages = {
    'firstname': [
    { type: 'required', message: 'Firstname is required.'},
    { type: 'minlength', message: 'Minimum 2 characters are required .'},
    ],
    'lastname': [
    { type: 'required', message: 'Lastname is required.'},
    { type: 'minlength', message: 'Minimum 2 characters are required .'},
    ],
    'email': [
      { type: 'required', message: 'Email is required.'},
      { type: 'email', message: 'Enter valid email.'},
    ],
    'organization': [
      { type: 'required', message: 'Organization is required.'},
      { type: 'minlength', message: 'Minimum 2 characters are required .'},
    ],
    'contact': [
      { type: 'required', message: 'Number is required.'},
      { type: 'minlength', message: 'Enter valid Number.'},
      { type: 'maxlength', message: 'Enter valid Number.'}
    ],
    'gender': [
      { type: 'required', message: 'Select a valid option.'}
    ],
    'year': [
      { type: 'required', message: 'Year is required.'},
      { type: 'minlength', message: 'Enter valid Year.'},
      { type: 'maxlength', message: 'Enter valid Year.'}
    ]

    };
  constructor(private router: Router,
    private appservice: AppService,
    private sheetsservice: SheetsService
    ) {
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      firstname: new FormControl(this.Data.profile.firstName, [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl(this.Data.profile.lastName, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(this.Data.profile.email, [Validators.required, Validators.email]),
      organization: new FormControl('', [Validators.required, Validators.minLength(2)]),
      contact: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      gender: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
      });
  }
  selectGender(gender) {
    this.sex = '';
    this.sex = gender;
  }
  get email(): string {
    return this.myForm.value['email'];
  }
  get organization(): string {
    return this.myForm.value['organization'];
  }
  get contact(): string {
    return this.myForm.value['contact'];
  }
  get firstname(): string {
    return this.myForm.value['firstname'];
  }
  get lastname(): string {
    return this.myForm.value['lastname'];
  }
  get gender(): string {
   return this.myForm.value['gender'] = this.sex;
  }

  get year(): string {
    return this.myForm.value['year'];
  }


  onSubmit( ) {
    const values = []  ;

    Object.values(this.myForm.value).forEach(value => {
      values.push(value);
    });
    console.log(values);
    this.sheetsservice.updateValues('1Sv1BbZFmN4rxu2L1VM6RZ679xrV3RwtmlIY0vcIZC5I',
    'SignUp!A2:G2', 'USER_ENTERED', [values]);

    this.router.navigateByUrl('/goals');
    }
}
