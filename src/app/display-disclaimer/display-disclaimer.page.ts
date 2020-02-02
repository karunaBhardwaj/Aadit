import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { SheetsService } from '../services/sheets.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-display-disclaimer',
  templateUrl: './display-disclaimer.page.html',
  styleUrls: ['./display-disclaimer.page.scss'],
})
export class DisplayDisclaimerPage implements OnInit {
  grantPermission;
  constructor(private router: Router, private appservice: AppService, private sheetsservice: SheetsService) { }

  async ngOnInit() {
    await this.sheetsservice.getRowValues(this.appservice.getUserInfo().token.sheetId, 'MedicalHistory!B14:B14').then(res => {
      this.grantPermission = res[0][0][0];
      console.log(this.grantPermission);
      if (this.grantPermission === 'TRUE') {$('#customCheck1').prop('checked', true); }
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

}
