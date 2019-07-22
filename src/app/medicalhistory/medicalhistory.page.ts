import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AppService } from '../services/app.service';
import { SheetsService } from '../services/sheets.service';
@Component({
  selector: 'app-medicalhistory',
  templateUrl: './medicalhistory.page.html',
  styleUrls: ['./medicalhistory.page.scss'],
})
export class MedicalhistoryPage implements OnInit {
  myForm: FormGroup;
  checkup_value: string;
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
    console.log(e);
}
  selectCheckup(checkup) {
    this.checkup_value = '';
    this.checkup_value = checkup;
  }

  get checkup(): string {
    return this.myForm.value['checkup'] = this.checkup_value;
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  async onSubmit() {
    const values = [];
    Object.values(this.myForm.value).forEach(value => {
      values.push([value]);
    });

    this.sheetsservice.updateValues('1Sv1BbZFmN4rxu2L1VM6RZ679xrV3RwtmlIY0vcIZC5I',
    'MedicalHistory!B2:B13', 'USER_ENTERED', values);

    this.router.navigateByUrl('/disclaimer');
  }

}
