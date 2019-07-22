import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { AppService } from '../services/app.service';
import { SheetsService } from '../services/sheets.service';
@Component({
  selector: 'app-foodlog',
  templateUrl: './foodlog.page.html',
  styleUrls: ['./foodlog.page.scss'],
})
export class FoodlogPage implements OnInit {
  myForm: FormGroup;
  myDate: String = new Date().toISOString();

  constructor(private router: Router, private sheetsservice: SheetsService, private appservice: AppService) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      date: new FormControl(new Date().getUTCDate(), [Validators.required]),
      time : new FormControl(new Date().toLocaleTimeString(), [Validators.required]),
      food : new FormControl('', [Validators.required]),
      details: new FormControl('', [Validators.required, , Validators.minLength(2)])
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

  onSave() {
    const values = [];
    Object.values(this.myForm.value).forEach(value => {
      values.push(value);
    });
    this.sheetsservice.appendValues('1Sv1BbZFmN4rxu2L1VM6RZ679xrV3RwtmlIY0vcIZC5I',
    'FoodLog!A2:D2', 'USER_ENTERED', [values]);
    this.router.navigateByUrl('/workout');
  }

}
