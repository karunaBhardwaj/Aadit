import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { AppService } from '../services/app.service';
@Component({
  selector: 'app-foodlog',
  templateUrl: './foodlog.page.html',
  styleUrls: ['./foodlog.page.scss'],
})
export class FoodlogPage implements OnInit {
  myForm: FormGroup;
  foodVal;
  myDate: String = new Date().toISOString();

  constructor(private router: Router, private appservice: AppService) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      date: new FormControl(new Date().toLocaleDateString(), [Validators.required]),
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
    $.ajax('https://aadit-nodeserver.herokuapp.com/addRow', {
      method: 'POST',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        'sheetid': `${this.appservice.getUserInfo().token.sheetId}`,
        'worksheet': 9,
        'data' : {
          'Date' : values[0],
          'Time' : values[1],
          'Meal Time'  : values[2],
          'Meal Details' : values[3]
        }
    })
  })
  .then(
      function success(mail) {
          console.log('Data updated succesfully');
      }
  );
    this.router.navigateByUrl('/workout');
  }

}
