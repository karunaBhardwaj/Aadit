import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { SheetsService } from '../services/sheets.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  Data = this.appservice.getUserInfo();
  Number;
  Gender;
  Company;
  constructor(private appservice: AppService, private sheetsservice: SheetsService) { }

  async ngOnInit() {
    const data = await this.sheetsservice.getValues(this.appservice.getUserInfo().token.sheetId,
    'SignUp!A2:G2');
    this.Number = data[0][4];
    this.Gender = data[0][5];
    this.Company = data[0][3];
  }

}
