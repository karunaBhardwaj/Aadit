import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { SheetsService } from '../services/sheets.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-display-profile',
  templateUrl: './display-profile.page.html',
  styleUrls: ['./display-profile.page.scss'],
})
export class DisplayProfilePage implements OnInit {
  FirstName = '';
  LastName = '';
  EmailAddress = '';
  Organization = '';
  MobileNumber = '';
  Gender = '';
  Year = '';


  constructor(private router: Router,
    private appservice: AppService,
    private sheetsservice: SheetsService,
    ) {
  }


  async ngOnInit() {
    await this.sheetsservice.getValues(this.appservice.getUserInfo().token.sheetId, 'SignUp!A2:G2').then(res => {
      this.FirstName = res[0][0];
      this.LastName = res[0][1];
      this.EmailAddress = res[0][2];
      this.Organization = res[0][3];
      this.MobileNumber = res[0][4];
      this.Gender = res[0][5];
      this.Year = res[0][6];
      });
  }
}

