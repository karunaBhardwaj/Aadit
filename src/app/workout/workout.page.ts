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
    async fetchTodayWorkout() {
      let Data: string[] = [] ;
      const Url = this.appservice.getParsedGetDataUrl(this.googleDriveService.getSheetId(), SheetTabsTitleConst.WORKOUT);
      await fetch(Url).then(function(response) {return response.json(); }).then(function(myJson) {
      const value = myJson['values'] ;
      let list: string[] = [];

      value.forEach(element => {
        for ( let i = 0; i < 10; i++) {
        if (new Date().toLocaleDateString() === element[i]) { list = element; } }
        });
      return list;
      }).then(function(x) { Data = x; });
    console.log(Data);
    return Data;
    }
  ngOnInit() {
    // const workData = this.googleDriveService.getLocalSheetTabData(SheetTabsTitleConst.WORKOUT);
    // console.log(workData.data);
    this.fetchTodayWorkout();
  }
}
