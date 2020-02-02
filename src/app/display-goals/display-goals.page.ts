import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { SheetsService } from '../services/sheets.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-display-goals',
  templateUrl: './display-goals.page.html',
  styleUrls: ['./display-goals.page.scss'],
})
export class DisplayGoalsPage implements OnInit {
  reason1 = '';
  reason2 = '';
  frequency = '';
  reason3 = '';

  constructor( private router: Router, private appservice: AppService, private sheetsservice: SheetsService) { }

  async ngOnInit() {
    await this.sheetsservice.getRowValues(this.appservice.getUserInfo().token.sheetId, 'Goals!B2:B5').then(res => {
      this.reason1 = res[0][0];
      this.reason2 = res[0][1];
      this.frequency = res[0][2][0];
      console.log(this.frequency);
      this.reason3 = res[0][3];
    });
  }

}
