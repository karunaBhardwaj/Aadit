import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  title = [];
  Data;
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
          document.getElementById('Workout').style.display = 'none';
          document.getElementById('rest').style.display = 'none';
          document.getElementById('Strengthex').style.display = 'block';
        } else if (this.weekDay === 'Rest') {
          document.getElementById('Workout').style.display = 'none';
          document.getElementById('Strengthex').style.display = 'none';
          document.getElementById('rest').style.display = 'block';
        } else {
          document.getElementById('Strengthex').style.display = 'none';
          document.getElementById('rest').style.display = 'none';
          document.getElementById('Workout').style.display = 'block';
          this.Data = this.WorkoutData[this.weekDay];
          this.title = this.WorkoutData['Title'];
        }
      } else if (selectedOption === 'Long') {
        document.getElementById('Strengthex').style.display = 'none';
        document.getElementById('rest').style.display = 'none';
        document.getElementById('Workout').style.display = 'block';
        this.Data = this.WorkoutData['Long'];
        this.title = this.WorkoutData['Title'];
      } else if (selectedOption === 'Tempo') {
        document.getElementById('Strengthex').style.display = 'none';
        document.getElementById('rest').style.display = 'none';
        document.getElementById('Workout').style.display = 'block';
        this.title = this.WorkoutData['Title'];
        this.Data =  this.WorkoutData['Tempo'];
      } else if (selectedOption === 'Interval') {
        document.getElementById('Strengthex').style.display = 'none';
        document.getElementById('rest').style.display = 'none';
        document.getElementById('Workout').style.display = 'block';
        this.Data =  this.WorkoutData['Interval'];
        this.title = this.WorkoutData['Title'];
      } else if (selectedOption === 'Speed') {
        document.getElementById('Strengthex').style.display = 'none';
        document.getElementById('rest').style.display = 'none';
        document.getElementById('Workout').style.display = 'block';
        this.Data =  this.WorkoutData['Speed'];
        this.title = this.WorkoutData['Title'];
      } else if (selectedOption === 'Strengthex') {
        document.getElementById('Workout').style.display = 'none';
        document.getElementById('rest').style.display = 'none';
        document.getElementById('Strengthex').style.display = 'block';
      }
    }

  async ngOnInit() {
    this.selectedOption = 'Today';
    document.getElementById('Day').innerHTML = new Date().toDateString();
    let schedule: string[];
    const data = await this.sheetsservice.batchGetValues(this.appservice.getUserInfo().token.sheetId,
    'Schedule!A2:G2, Workout!C1:H5, StrengthEx!A1:C9');
    schedule = data[0][0];
    this.WorkoutData = {'Title' : data[1][0], 'Long' : data[1][1], 'Tempo' : data[1][2], 'Interval' : data[1][3], 'Speed' : data[1][4]};
    console.log('Workout Data retrieved succesfully');
    this.strngthExData = data[2];
    const Day = new Date().getDay();
    this.weekDay = schedule[Day];
    this.SelectedValue('Today');

    }
}
