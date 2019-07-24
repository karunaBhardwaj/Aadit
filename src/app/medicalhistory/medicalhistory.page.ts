import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { SheetsService } from '../services/sheets.service';
import $ from 'jquery';
@Component({
  selector: 'app-medicalhistory',
  templateUrl: './medicalhistory.page.html',
  styleUrls: ['./medicalhistory.page.scss'],
})
export class MedicalhistoryPage implements OnInit {
  myForm: FormGroup;
  constructor(private router: Router, private appservice: AppService, private sheetsservice: SheetsService) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      checkup: new FormControl(''),
      rev1: new FormControl(false),
      rev2: new FormControl(false),
      rev3: new FormControl(false),
      rev4: new FormControl(false),
      rev5: new FormControl(false),
      rev6: new FormControl(false),
      rev7: new FormControl(false),
      rev8: new FormControl(false),
      rev9: new FormControl(false),
      rev10: new FormControl(false),
      rev11: new FormControl(false)
    });
  }

  datachanged(e) {
    if (this.myForm.value.rev11) {

    }
  }

  onSubmit() {

    const values = [];
    Object.values(this.myForm.value).forEach(value => {
      values.push([value]);
    });
    console.log(values);

    this.sheetsservice.updateValues(this.appservice.getUserInfo().token.sheetId,
    'MedicalHistory!B2:B13', 'USER_ENTERED', values);

    this.router.navigateByUrl('/disclaimer');
  }

}
