import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
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
  constructor(private router: Router) { }
    doRefresh(event) {
      console.log('Begin async operation');
      this.ngOnInit();
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }

    async fetchTodayWorkout() {
      let workOut: any;

      await $.ajax('https://aadit-server.azurewebsites.net/getRows', {
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        processData: false,
        data: JSON.stringify({
          'sheetid': '1Sv1BbZFmN4rxu2L1VM6RZ679xrV3RwtmlIY0vcIZC5I',
          'worksheet': 7
      })
    })
    .then(
        function success(mail) {
            workOut = { 'Long' : [mail[0]['workouttype'], mail[0]['activitytime-minutes'], mail[0]['activityspeed-kmph'],
            mail[0]['recoverytime-minutes'], mail[0]['recoveryspeed'], mail[0]['ofrepeats'], mail[0]['totalduration']],

            'Tempo' : [mail[1]['workouttype'], mail[1]['activitytime-minutes'], mail[1]['activityspeed-kmph'],
            mail[1]['recoverytime-minutes'], mail[1]['recoveryspeed'], mail[1]['ofrepeats'], mail[1]['totalduration']],

            'Interval' : [mail[2]['workouttype'], mail[2]['activitytime-minutes'], mail[2]['activityspeed-kmph'],
            mail[2]['recoverytime-minutes'], mail[2]['recoveryspeed'], mail[2]['ofrepeats'], mail[2]['totalduration']],

            'Speed' : [mail[3]['workouttype'], mail[3]['activitytime-minutes'], mail[3]['activityspeed-kmph'],
            mail[3]['recoverytime-minutes'], mail[3]['recoveryspeed'], mail[3]['ofrepeats'], mail[3]['totalduration']]};
            console.log('Workout Data retrieved succesfully');
        }
    );
      this.WorkoutData = workOut;
      // console.log('Workout Data', this.WorkoutData);

    }

    async fetchStrengthex() {
      let Data: any;
      await $.ajax('https://aadit-server.azurewebsites.net/getRows', {
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        processData: false,
        data: JSON.stringify({
          'sheetid': '1Sv1BbZFmN4rxu2L1VM6RZ679xrV3RwtmlIY0vcIZC5I',
          'worksheet': 8
      })
    })
    .then(
        function success(mail) {
            Data = [
              [mail[0]['strengthexercise'], mail[0]['unit'], mail[0]['unittype']],
              [mail[1]['strengthexercise'], mail[1]['unit'], mail[1]['unittype']],
              [mail[2]['strengthexercise'], mail[2]['unit'], mail[2]['unittype']],
              [mail[3]['strengthexercise'], mail[3]['unit'], mail[3]['unittype']],
              [mail[4]['strengthexercise'], mail[4]['unit'], mail[4]['unittype']],
              [mail[5]['strengthexercise'], mail[5]['unit'], mail[5]['unittype']],
              [mail[6]['strengthexercise'], mail[6]['unit'], mail[6]['unittype']],
              [mail[7]['strengthexercise'], mail[7]['unit'], mail[7]['unittype']]
            ];
            console.log('StrengthEx Data retrieved succesfully');
        }
    );
    this.strngthExData = Data;
    // console.log('StrngthEx Data', this.strngthExData);
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
    let schedule: string[];
    await $.ajax('https://aadit-server.azurewebsites.net/getRows', {
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      processData: false,
      data: JSON.stringify({
        'sheetid': '1Sv1BbZFmN4rxu2L1VM6RZ679xrV3RwtmlIY0vcIZC5I',
        'worksheet': 6
    })
  })
  .then(
      function success(mail) {
          schedule = [mail[0].su, mail[0].mo, mail[0].tu, mail[0].we, mail[0].th, mail[0].fr, mail[0].sat];
          // console.log('Schedule', schedule);
          console.log('Schedule Data retrieved succesfully');
      }
  );
      const Day = new Date().getDay();
      this.weekDay = schedule[Day];
      await this.fetchTodayWorkout();
      await this.fetchStrengthex();
      document.getElementById('Day').innerHTML = new Date().toDateString();
    }
}
