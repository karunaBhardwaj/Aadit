import { Component, OnInit } from '@angular/core';
import { SheetsService } from '../services/sheets.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {

  constructor(private sheetsservice: SheetsService) { }

  ngOnInit() {
          }

}
