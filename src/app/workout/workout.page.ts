import { Component, OnInit, Output } from '@angular/core';
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
  selectedOption;
  weekDay: string;
  constructor( private appservice: AppService,
    private router: Router, private googleDriveService: GoogleDriveService) { }
    doRefresh(event) {
      console.log('Begin async operation');
      this.ngOnInit();
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }

    fetchTodayWorkout(x) {
      const Url = this.appservice.getParsedGetDataUrl(this.googleDriveService.getSheetId(), SheetTabsTitleConst.WORKOUT);
      const Info = fetch(Url).then(function(response) {return response.json(); }).then(function(myJson) {
      const value = myJson['values'] ;
      let List: string[] = [] ;
      value.forEach(element => {
        for ( let i = 0; i < value.length ; i++) {
        if ((x === element[i])) { List = element; } }
        });
        console.log(List);
      return List;
      });
      return Info;
    }

    fetchStrengthex() {
      const Url = this.appservice.getParsedGetDataUrl(this.googleDriveService.getSheetId(), SheetTabsTitleConst.STRENGTH_EX);
      const Info = fetch(Url).then(function(response) {return response.json(); }).then(function(myJson) {
      const value: string[] = myJson['values'] ;
      console.log(value);
      return value;
      });
      return Info;
    }

    fetchSchedule() {
      const Url = this.appservice.getParsedGetDataUrl(this.googleDriveService.getSheetId(), SheetTabsTitleConst.SCHEDULE);
      const Info = fetch(Url).then(function(response) {return response.json(); }).then(function(myJson) {
      const value = myJson['values'] ;
      let List: string[] = [] ;
      value.forEach(element => {
        for ( let i = 0; i < value.length ; i++) {
        { List = element; } }
        });
        console.log(List);
      return List;
      });
      return Info;
    }
    goToWorkoutLog() {
      if (this.selectedOption === 'Today') {
      this.router.navigateByData({ url: ['/workoutlog'],
      data: this.weekDay});
      } else {
      this.router.navigateByData({ url: ['/workoutlog'],
      data: this.selectedOption});
      }
    }
    goToFoodLog() {
      this.router.navigateByUrl('/foodlog');
    }

    async SelectedValue(selectedOption) {
      console.log(selectedOption);
      let Data: string[];
      if (selectedOption === 'Today') {
        if (this.weekDay === 'Strength') {
          document.getElementById('container').style.display = 'none';
          document.getElementById('Strengthex').style.display = 'block';
          await this.fetchStrengthex().then(function(x) {Data = x; });
          document.getElementById('Excer1').innerHTML = Data[1][0];
          document.getElementById('Excer1_unit').innerHTML = Data[1][1];
          document.getElementById('Excer1_unitType').innerHTML = Data[1][2];
          document.getElementById('Excer2').innerHTML = Data[2][0];
          document.getElementById('Excer2_unit').innerHTML = Data[2][1];
          document.getElementById('Excer2_unitType').innerHTML = Data[2][2];
          document.getElementById('Excer3').innerHTML = Data[3][0];
          document.getElementById('Excer3_unit').innerHTML = Data[3][1];
          document.getElementById('Excer3_unitType').innerHTML = Data[3][2];
          document.getElementById('Excer4').innerHTML = Data[4][0];
          document.getElementById('Excer4_unit').innerHTML = Data[4][1];
          document.getElementById('Excer4_unitType').innerHTML = Data[4][2];
          document.getElementById('Excer5').innerHTML = Data[5][0];
          document.getElementById('Excer5_unit').innerHTML = Data[5][1];
          document.getElementById('Excer5_unitType').innerHTML = Data[5][2];
          document.getElementById('Excer6').innerHTML = Data[6][0];
          document.getElementById('Excer6_unit').innerHTML = Data[6][1];
          document.getElementById('Excer6_unitType').innerHTML = Data[6][2];
          document.getElementById('Excer7').innerHTML = Data[7][0];
          document.getElementById('Excer7_unit').innerHTML = Data[7][1];
          document.getElementById('Excer7_unitType').innerHTML = Data[7][2];
          document.getElementById('Excer8').innerHTML = Data[8][0];
          document.getElementById('Excer8_unit').innerHTML = Data[8][1];
          document.getElementById('Excer8_unitType').innerHTML = Data[8][2];
        } else {
          document.getElementById('Strengthex').style.display = 'none';
          document.getElementById('container').style.display = 'block';
          await this.fetchTodayWorkout(this.weekDay).then(function (x) { Data = x; });
          document.getElementById('workout_type').innerHTML = Data[1];
          document.getElementById('activity_time').innerHTML = Data[2];
          document.getElementById('activity_speed').innerHTML = Data[3];
          document.getElementById('recovery_time').innerHTML = Data[4];
          document.getElementById('recovery_speed').innerHTML = Data[5];
          document.getElementById('repeats').innerHTML = Data[6];
          document.getElementById('duration').innerHTML = Data[7];
        }
      } else if (selectedOption === 'Long') {
        document.getElementById('Strengthex').style.display = 'none';
        document.getElementById('container').style.display = 'block';
        await this.fetchTodayWorkout('Long').then(function (x) { Data = x; });
        document.getElementById('workout_type').innerHTML = Data[1];
        document.getElementById('activity_time').innerHTML = Data[2];
        document.getElementById('activity_speed').innerHTML = Data[3];
        document.getElementById('recovery_time').innerHTML = Data[4];
        document.getElementById('recovery_speed').innerHTML = Data[5];
        document.getElementById('repeats').innerHTML = Data[6];
        document.getElementById('duration').innerHTML = Data[7];
      } else if (selectedOption === 'Tempo') {
        document.getElementById('Strengthex').style.display = 'none';
        document.getElementById('container').style.display = 'block';
        await this.fetchTodayWorkout('Tempo').then(function (x) { Data = x; });
        document.getElementById('workout_type').innerHTML = Data[1];
        document.getElementById('activity_time').innerHTML = Data[2];
        document.getElementById('activity_speed').innerHTML = Data[3];
        document.getElementById('recovery_time').innerHTML = Data[4];
        document.getElementById('recovery_speed').innerHTML = Data[5];
        document.getElementById('repeats').innerHTML = Data[6];
        document.getElementById('duration').innerHTML = Data[7];
      } else if (selectedOption === 'Interval') {
        document.getElementById('Strengthex').style.display = 'none';
        document.getElementById('container').style.display = 'block';
        await this.fetchTodayWorkout('Interval').then(function (x) { Data = x; });
        document.getElementById('workout_type').innerHTML = Data[1];
        document.getElementById('activity_time').innerHTML = Data[2];
        document.getElementById('activity_speed').innerHTML = Data[3];
        document.getElementById('recovery_time').innerHTML = Data[4];
        document.getElementById('recovery_speed').innerHTML = Data[5];
        document.getElementById('repeats').innerHTML = Data[6];
        document.getElementById('duration').innerHTML = Data[7];
      } else if (selectedOption === 'Speed') {
        document.getElementById('Strengthex').style.display = 'none';
        document.getElementById('container').style.display = 'block';
        await this.fetchTodayWorkout('Speed').then(function (x) { Data = x; });
        document.getElementById('workout_type').innerHTML = Data[1];
        document.getElementById('activity_time').innerHTML = Data[2];
        document.getElementById('activity_speed').innerHTML = Data[3];
        document.getElementById('recovery_time').innerHTML = Data[4];
        document.getElementById('recovery_speed').innerHTML = Data[5];
        document.getElementById('repeats').innerHTML = Data[6];
        document.getElementById('duration').innerHTML = Data[7];
      } else if (selectedOption === 'Strengthex') {
        document.getElementById('container').style.display = 'none';
        document.getElementById('Strengthex').style.display = 'block';
        await this.fetchStrengthex().then(function(x) {Data = x; });
        document.getElementById('Excer1').innerHTML = Data[1][0];
        document.getElementById('Excer1_unit').innerHTML = Data[1][1];
        document.getElementById('Excer1_unitType').innerHTML = Data[1][2];
        document.getElementById('Excer2').innerHTML = Data[2][0];
        document.getElementById('Excer2_unit').innerHTML = Data[2][1];
        document.getElementById('Excer2_unitType').innerHTML = Data[2][2];
        document.getElementById('Excer3').innerHTML = Data[3][0];
        document.getElementById('Excer3_unit').innerHTML = Data[3][1];
        document.getElementById('Excer3_unitType').innerHTML = Data[3][2];
        document.getElementById('Excer4').innerHTML = Data[4][0];
        document.getElementById('Excer4_unit').innerHTML = Data[4][1];
        document.getElementById('Excer4_unitType').innerHTML = Data[4][2];
        document.getElementById('Excer5').innerHTML = Data[5][0];
        document.getElementById('Excer5_unit').innerHTML = Data[5][1];
        document.getElementById('Excer5_unitType').innerHTML = Data[5][2];
        document.getElementById('Excer6').innerHTML = Data[6][0];
        document.getElementById('Excer6_unit').innerHTML = Data[6][1];
        document.getElementById('Excer6_unitType').innerHTML = Data[6][2];
        document.getElementById('Excer7').innerHTML = Data[7][0];
        document.getElementById('Excer7_unit').innerHTML = Data[7][1];
        document.getElementById('Excer7_unitType').innerHTML = Data[7][2];
        document.getElementById('Excer8').innerHTML = Data[8][0];
        document.getElementById('Excer8_unit').innerHTML = Data[8][1];
        document.getElementById('Excer8_unitType').innerHTML = Data[8][2];
      }
    }

  async ngOnInit() {
    let schedule: string[];
      // const weekdays = new Array(7);
      // weekdays[0] = 'Sunday'; weekdays[1] = 'Monday';
      // weekdays[2] = 'Tuesday'; weekdays[3] = 'Wednesday';
      // weekdays[4] = 'Thursday'; weekdays[5] = 'Friday';
      // weekdays[6] = 'Saturday';
      const Day = new Date().getDay();
      await this.fetchSchedule().then(function (x) { schedule = x;  });
      this.weekDay = schedule[Day];
      document.getElementById('Day').innerHTML = new Date().toDateString();
    }
}
