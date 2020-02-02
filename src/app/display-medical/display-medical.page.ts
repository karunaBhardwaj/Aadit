import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { SheetsService } from '../services/sheets.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-display-medical',
  templateUrl: './display-medical.page.html',
  styleUrls: ['./display-medical.page.scss'],
})
export class DisplayMedicalPage implements OnInit {
checkup;
rev1;
rev2;
rev3;
rev4;
rev5;
rev6;
rev7;
rev8;
rev9;
rev10;
rev11;
Dummy;

  constructor(private router: Router, private appservice: AppService, private sheetsservice: SheetsService) { }

  async ngOnInit() {
    await this.sheetsservice.getRowValues(this.appservice.getUserInfo().token.sheetId, 'MedicalHistory!B2:B13').then(res => {
      this.checkup = res[0][0][0];
      this.rev1 = res[0][1][0];
      this.rev2 = res[0][2][0];
      this.rev3 = res[0][3][0];
      this.rev4 = res[0][4][0];
      this.rev5 = res[0][5][0];
      this.rev6 = res[0][6][0];
      this.rev7 = res[0][7][0];
      this.rev8 = res[0][8][0];
      this.rev9 = res[0][9][0];
      this.rev10 = res[0][10][0];
      this.rev11 = res[0][11][0];
      if (this.rev1 === 'TRUE') {$('#customCheck1').prop('checked', true); }
      if (this.rev2 === 'TRUE') {$('#customCheck2').prop('checked', true); }
      if (this.rev3 === 'TRUE') {$('#customCheck3').prop('checked', true); }
      if (this.rev4 === 'TRUE') {$('#customCheck4').prop('checked', true); }
      if (this.rev5 === 'TRUE') {$('#customCheck5').prop('checked', true); }
      if (this.rev6 === 'TRUE') {$('#customCheck6').prop('checked', true); }
      if (this.rev7 === 'TRUE') {$('#customCheck7').prop('checked', true); }
      if (this.rev8 === 'TRUE') {$('#customCheck8').prop('checked', true); }
      if (this.rev9 === 'TRUE') {$('#customCheck9').prop('checked', true); }
      if (this.rev10 === 'TRUE') {$('#customCheck10').prop('checked', true); }
      if (this.rev11 === 'TRUE') {$('#customCheck11').prop('checked', true); }
    });
  }

}
