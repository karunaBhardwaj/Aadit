import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleDriveService } from 'src/app/services/google-drive.service';
import { SheetTabsTitleConst } from '../constants/sheet.constant';
import { DriveRequestModel } from '../models/drive-postdata.model';
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
    // console.log(workData);
    const url = this.appservice.getParsedGetDataUrl(this.googleDriveService.getSheetId(), SheetTabsTitleConst.WORKOUT);
    console.log(url);
    let data: string;
    fetch(url).then(function(response) {return response.json(); }).then(function(myJson) {data = myJson;
      const value = data['values'] ;
      // console.log(data);
      console.log(value);
      const list: string[] = [];
      value.forEach(element => {
      list.push(element.value);
       });
      console.log(list);
     });

  }


}
