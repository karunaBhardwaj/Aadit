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

    fetchTodayWorkout() {
      const Url = this.appservice.getParsedGetDataUrl(this.googleDriveService.getSheetId(), SheetTabsTitleConst.WORKOUT);
      const Info = fetch(Url).then(function(response) {return response.json(); }).then(function(myJson) {
      const value = myJson['values'] ;
      let List: string[] = [] ;
      value.forEach(element => {
        for ( let i = 0; i < value.length ; i++) {
        if (new Date().toLocaleDateString() === element[i]) { List = element; } }
        });
      return List;
      });
      return Info;
    }
    goToWorkoutLog() {
      this.router.navigateByUrl('/workoutlog');
    }
    goToFoodLog() {
      this.router.navigateByUrl('/foodlog');
    }

  async ngOnInit() {
    let Data: string[];
    const weekdays = new Array(7);
    weekdays[0] = 'Sunday';
    weekdays[1] = 'Monday';
    weekdays[2] = 'Tuesday';
    weekdays[3] = 'Wednesday';
    weekdays[4] = 'Thursday';
    weekdays[5] = 'Friday';
    weekdays[6] = 'Saturday';
    const date = new Date();
    const Day = date.getDay();
    await this.fetchTodayWorkout().then(function (x) { Data = x; });
    document.getElementById('date').innerHTML = Data[0];
    document.getElementById('workout_type').innerHTML = Data[1];
    document.getElementById('activity_time').innerHTML = Data[2];
    document.getElementById('activity_speed').innerHTML = Data[3];
    document.getElementById('recovery_time').innerHTML = Data[4];
    document.getElementById('recovery_speed').innerHTML = Data[5];
    document.getElementById('repeats').innerHTML = Data[6];
    document.getElementById('duration').innerHTML = Data[7];
    document.getElementById('Day').innerHTML = weekdays[Day];
  }
}
