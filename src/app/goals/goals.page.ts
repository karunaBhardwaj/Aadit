import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { SheetsService } from '../services/sheets.service';
@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {

  myForm: FormGroup;
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
  constructor( private router: Router, private appservice: AppService, private sheetsservice: SheetsService) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      reason: new FormControl('', [Validators.required, Validators.minLength(5)]),
      reason2: new FormControl('', [Validators.required, Validators.minLength(5)]),
      activity: new FormControl('', [Validators.required]),
      reason3: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

  }

  onSubmit() {
    const values = [];
    Object.values(this.myForm.value).forEach(value => {
      values.push([value]);
    });
    console.log(values);
    this.sheetsservice.updateValues(this.appservice.getUserInfo().token.sheetId, 'Goals!B2:B5', 'USER_ENTERED', values);

    this.router.navigateByUrl('/medicalhistory');
  }

}

