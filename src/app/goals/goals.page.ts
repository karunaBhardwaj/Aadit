import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {

  myForm: FormGroup;
  activity: string;
  constructor( private router: Router) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      reason: new FormControl('', [Validators.required]),
      reason2: new FormControl('', [Validators.required]),
      reason3: new FormControl('', [Validators.required]),
      activity: new FormControl('', [Validators.required])
    });

  }
  selectFrequency(activity) {
    this.activity = '';
    this.activity = activity;
  }

  get reason(): string {
    return this.myForm.value['reason'];
  }
  get reason2(): string {
    return this.myForm.value['reason2'];
  }
  get reason3(): string {
    return this.myForm.value['reason3'];
  }
  goToMedicalhistory() {
    console.log(this.reason);
    console.log(this.reason2);
    console.log(this.reason3);
    console.log(this.activity);
    this.router.navigateByUrl('/medicalhistory');

  }

}
