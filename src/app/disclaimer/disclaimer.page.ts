import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { SheetsService } from '../services/sheets.service';
@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.page.html',
  styleUrls: ['./disclaimer.page.scss'],
})
export class DisclaimerPage implements OnInit {

  myForm: FormGroup;


  constructor(private router: Router, private appservice: AppService, private sheetsservice: SheetsService) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      grantPermission: new FormControl(false, [Validators.required])
    });

  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  onSubmit() {
    const values = [];
    Object.values(this.myForm.value).forEach(value => {
      values.push(value);
    });
    console.log(values);
    this.sheetsservice.updateValues(this.appservice.getUserInfo().token.sheetId,
    'MedicalHistory!B14:B14', 'USER_ENTERED', [values]);
    alert('profile setup completed');
    this.router.navigateByUrl('/thankyou');
    }

}

