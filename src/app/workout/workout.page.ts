import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleDriveService } from 'src/app/services/google-drive.service';
import { SheetTabsTitleConst } from '../constants/sheet.constant';
import { AppService} from '../services/app.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
})
export class WorkoutPage implements OnInit {

  constructor( private appservice: AppService,
    private router: Router, private googleDriveService: GoogleDriveService) { }

  ngOnInit() {
    // const workData = this.googleDriveService.getLocalSheetTabData(SheetTabsTitleConst.WORKOUT);
    // console.log(workData.data);
    const Url = this.appservice.getParsedGetDataUrl(this.googleDriveService.getSheetId(), SheetTabsTitleConst.WORKOUT);
    // console.log(Url);
    let data: string;
    function abhi(url) {
    fetch(url).then(function(response) {return response.json(); }).then(function(myJson) {data = myJson;
    const values = data['values'] ;
    // console.log(value);
    let list: string[] = [];
    // let  title: string[] = [];
    // title = values[0];
    // console.log(title);
    values.forEach(element => {
      for ( let i = 0; i < 10; i++) {
      if (new Date().toLocaleDateString() === element[i]) { list = element; } }
      });
    console.log(list);
    });
  }
  abhi(Url);
}
}
