import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import * as $ from 'jquery';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../services/app.service';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {

  constructor(private http: HttpClient,
    private appService: AppService
    ) { }
  myForm: FormGroup;
  Data = this.appService.getUserInfo();

  ngOnInit() {
    this.myForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      country: new FormControl('', ),
      message: new FormControl('', [Validators.required, Validators.minLength(4)])
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
  get firstname(): string {
    return this.myForm.value['firstname'];
  }
  get lastname(): string {
    return this.myForm.value['lastname'];
  }
  get country(): string {
    return this.myForm.value['country'];
  }
  get message(): string {
    return this.myForm.value['message'];
  }

  onSubmit() {
    $.ajax('https://aadit-server.azurewebsites.net/sendMail', {
      method: 'POST',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
          from : this.Data.profile.email,
          to: 'abhilash.vadlamudi@wissen.com',
          subject: 'Contact Form',
          message: `First Name : ${this.firstname}<br/>
                    Last Name: ${this.lastname}<br/>
                    Country: ${this.country}<br/>
                    Message: ${this.message}`
      })
  })
  .then(
      function success(mail) {
          console.log('Mail has been sent successfully');
      }
  );
  }
}
