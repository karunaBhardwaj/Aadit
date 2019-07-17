import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AppService } from '../services/app.service';
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
  constructor( private router: Router, private appservice: AppService) { }

  ngOnInit() {
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

    $.ajax('https://aadit-nodeserver.herokuapp.com/bulkUpdateCell', {
      method: 'POST',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        'sheetid': `${this.appservice.getUserInfo().token.sheetId}`,
        'worksheet': 2,
        'minRow'   : 2,
        'maxRow'   : 5,
        'minCol'   : 2,
        'maxCol'   : 2,
        'value'	   : [this.reason, this.reason2, this.activity, this.reason3]
    })
  })
  .then(
      function success(mail) {
          console.log('Data updated succesfully');
      }
  );

    this.router.navigateByUrl('/medicalhistory');
  }

}

