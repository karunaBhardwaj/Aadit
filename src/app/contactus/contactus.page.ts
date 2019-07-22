import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import * as $ from 'jquery';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../services/app.service';
import { MailService } from '../services/mail.service';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {

  constructor(private http: HttpClient,
    private appService: AppService,
    private mailservice: MailService
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
    const data = `First Name : ${this.firstname},
    Last Name: ${this.lastname},
    Email : ${this.Data.profile.email},
    Country: ${this.country},
    Message: ${this.message}`;
    this.mailservice.sendMail('abhilash.vadlamudi@wissen.com', 'Contact Form', data);
   }
}
