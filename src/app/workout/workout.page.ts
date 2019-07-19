import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AppService } from '../services/app.service';
import { SheetsService } from '../services/sheets.service';
@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
})
export class WorkoutPage implements OnInit {
  selectedOption;
  weekDay: string;
  WorkoutData;
  strngthExData;
  constructor(private router: Router, private appservice: AppService, private sheetsservice: SheetsService) { }
    doRefresh(event) {
      console.log('Begin async operation');
      this.ngOnInit();
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
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
      if (selectedOption === 'Today') {
        if (this.weekDay === 'Strength') {
          document.getElementById('container').style.display = 'none';
          document.getElementById('Strengthex').style.display = 'block';
          document.getElementById('Excer1').innerHTML = this.strngthExData[0][0];
          document.getElementById('Excer1_unit').innerHTML = this.strngthExData[0][1];
          document.getElementById('Excer1_unitType').innerHTML = this.strngthExData[0][2];
          document.getElementById('Excer2').innerHTML = this.strngthExData[1][0];
          document.getElementById('Excer2_unit').innerHTML = this.strngthExData[1][1];
          document.getElementById('Excer2_unitType').innerHTML = this.strngthExData[1][2];
          document.getElementById('Excer3').innerHTML = this.strngthExData[2][0];
          document.getElementById('Excer3_unit').innerHTML = this.strngthExData[2][1];
          document.getElementById('Excer3_unitType').innerHTML = this.strngthExData[2][2];
          document.getElementById('Excer4').innerHTML = this.strngthExData[3][0];
          document.getElementById('Excer4_unit').innerHTML = this.strngthExData[3][1];
          document.getElementById('Excer4_unitType').innerHTML = this.strngthExData[3][2];
          document.getElementById('Excer5').innerHTML =this.strngthExData[4][0];
          document.getElementById('Excer5_unit').innerHTML = this.strngthExData[4][1];
          document.getElementById('Excer5_unitType').innerHTML = this.strngthExData[4][2];
          document.getElementById('Excer6').innerHTML = this.strngthExData[5][0];
          document.getElementById('Excer6_unit').innerHTML = this.strngthExData[5][1];
          document.getElementById('Excer6_unitType').innerHTML = this.strngthExData[5][2];
          document.getElementById('Excer7').innerHTML = this.strngthExData[6][0];
          document.getElementById('Excer7_unit').innerHTML = this.strngthExData[6][1];
          document.getElementById('Excer7_unitType').innerHTML = this.strngthExData[6][2];
          document.getElementById('Excer8').innerHTML =this.strngthExData[7][0];
          document.getElementById('Excer8_unit').innerHTML = this.strngthExData[7][1];
          document.getElementById('Excer8_unitType').innerHTML = this.strngthExData[7][2];
        } else {
          document.getElementById('Strengthex').style.display = 'none';
          document.getElementById('container').style.display = 'block';
          document.getElementById('workout_type').innerHTML = this.WorkoutData[this.weekDay][0];
          document.getElementById('activity_time').innerHTML = this.WorkoutData[this.weekDay][1];
          document.getElementById('activity_speed').innerHTML = this.WorkoutData[this.weekDay][2];
          document.getElementById('recovery_time').innerHTML = this.WorkoutData[this.weekDay][3];
          document.getElementById('recovery_speed').innerHTML = this.WorkoutData[this.weekDay][4];
          document.getElementById('repeats').innerHTML = this.WorkoutData[this.weekDay][5];
          document.getElementById('duration').innerHTML = this.WorkoutData[this.weekDay][6];
        }
      } else if (selectedOption === 'Long') {
        document.getElementById('Strengthex').style.display = 'none';
        document.getElementById('container').style.display = 'block';
        document.getElementById('workout_type').innerHTML = this.WorkoutData['Long'][0];
        document.getElementById('activity_time').innerHTML = this.WorkoutData['Long'][1];
        document.getElementById('activity_speed').innerHTML = this.WorkoutData['Long'][2];
        document.getElementById('recovery_time').innerHTML = this.WorkoutData['Long'][3];
        document.getElementById('recovery_speed').innerHTML = this.WorkoutData['Long'][4];
        document.getElementById('repeats').innerHTML = this.WorkoutData['Long'][5];
        document.getElementById('duration').innerHTML = this.WorkoutData['Long'][6];
      } else if (selectedOption === 'Tempo') {
        document.getElementById('Strengthex').style.display = 'none';
        document.getElementById('container').style.display = 'block';
        document.getElementById('workout_type').innerHTML = this.WorkoutData['Tempo'][0];
        document.getElementById('activity_time').innerHTML = this.WorkoutData['Tempo'][1];
        document.getElementById('activity_speed').innerHTML = this.WorkoutData['Tempo'][2];
        document.getElementById('recovery_time').innerHTML = this.WorkoutData['Tempo'][3];
        document.getElementById('recovery_speed').innerHTML = this.WorkoutData['Tempo'][4];
        document.getElementById('repeats').innerHTML = this.WorkoutData['Tempo'][5];
        document.getElementById('duration').innerHTML = this.WorkoutData['Tempo'][6];
      } else if (selectedOption === 'Interval') {
        document.getElementById('Strengthex').style.display = 'none';
        document.getElementById('container').style.display = 'block';
        document.getElementById('workout_type').innerHTML = this.WorkoutData['Interval'][0];
        document.getElementById('activity_time').innerHTML = this.WorkoutData['Interval'][1];
        document.getElementById('activity_speed').innerHTML = this.WorkoutData['Interval'][2];
        document.getElementById('recovery_time').innerHTML = this.WorkoutData['Interval'][3];
        document.getElementById('recovery_speed').innerHTML = this.WorkoutData['Interval'][4];
        document.getElementById('repeats').innerHTML = this.WorkoutData['Interval'][5];
        document.getElementById('duration').innerHTML = this.WorkoutData['Interval'][6];
      } else if (selectedOption === 'Speed') {
        document.getElementById('Strengthex').style.display = 'none';
        document.getElementById('container').style.display = 'block';
        document.getElementById('workout_type').innerHTML = this.WorkoutData['Speed'][0];
        document.getElementById('activity_time').innerHTML = this.WorkoutData['Speed'][1];
        document.getElementById('activity_speed').innerHTML = this.WorkoutData['Speed'][2];
        document.getElementById('recovery_time').innerHTML = this.WorkoutData['Speed'][3];
        document.getElementById('recovery_speed').innerHTML = this.WorkoutData['Speed'][4];
        document.getElementById('repeats').innerHTML = this.WorkoutData['Speed'][5];
        document.getElementById('duration').innerHTML = this.WorkoutData['Speed'][6];
      } else if (selectedOption === 'Strengthex') {
        document.getElementById('container').style.display = 'none';
        document.getElementById('Strengthex').style.display = 'block';
        document.getElementById('Excer1').innerHTML = this.strngthExData[0][0];
        document.getElementById('Excer1_unit').innerHTML = this.strngthExData[0][1];
        document.getElementById('Excer1_unitType').innerHTML = this.strngthExData[0][2];
        document.getElementById('Excer2').innerHTML = this.strngthExData[1][0];
        document.getElementById('Excer2_unit').innerHTML = this.strngthExData[1][1];
        document.getElementById('Excer2_unitType').innerHTML = this.strngthExData[1][2];
        document.getElementById('Excer3').innerHTML = this.strngthExData[2][0];
        document.getElementById('Excer3_unit').innerHTML = this.strngthExData[2][1];
        document.getElementById('Excer3_unitType').innerHTML = this.strngthExData[2][2];
        document.getElementById('Excer4').innerHTML = this.strngthExData[3][0];
        document.getElementById('Excer4_unit').innerHTML = this.strngthExData[3][1];
        document.getElementById('Excer4_unitType').innerHTML = this.strngthExData[3][2];
        document.getElementById('Excer5').innerHTML =this.strngthExData[4][0];
        document.getElementById('Excer5_unit').innerHTML = this.strngthExData[4][1];
        document.getElementById('Excer5_unitType').innerHTML = this.strngthExData[4][2];
        document.getElementById('Excer6').innerHTML = this.strngthExData[5][0];
        document.getElementById('Excer6_unit').innerHTML = this.strngthExData[5][1];
        document.getElementById('Excer6_unitType').innerHTML = this.strngthExData[5][2];
        document.getElementById('Excer7').innerHTML = this.strngthExData[6][0];
        document.getElementById('Excer7_unit').innerHTML = this.strngthExData[6][1];
        document.getElementById('Excer7_unitType').innerHTML = this.strngthExData[6][2];
        document.getElementById('Excer8').innerHTML =this.strngthExData[7][0];
        document.getElementById('Excer8_unit').innerHTML = this.strngthExData[7][1];
        document.getElementById('Excer8_unitType').innerHTML = this.strngthExData[7][2];
      }
    }

  async ngOnInit() {
    document.getElementById('Day').innerHTML = new Date().toDateString();
    let schedule: string[];
    const data = await this.sheetsservice.batchGetValues('1Sv1BbZFmN4rxu2L1VM6RZ679xrV3RwtmlIY0vcIZC5I',
    'Schedule!A2:G2, Workout!B2:H5, StrengthEx!A2:C9');
    schedule = data[0][0];
    this.WorkoutData = { 'Long' : data[1][0],

    'Tempo' : data[1][1],

    'Interval' : data[1][2],

    'Speed' : data[1][3]
    };
    console.log('Workout Data retrieved succesfully');
    this.strngthExData = data[2];
    const Day = new Date().getDay();
    this.weekDay = schedule[Day];
    console.log(this.WorkoutData);
    }
}
