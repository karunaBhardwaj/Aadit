import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicalhistory',
  templateUrl: './medicalhistory.page.html',
  styleUrls: ['./medicalhistory.page.scss'],
})
export class MedicalhistoryPage implements OnInit {
  myForm: FormGroup;
  checkup: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      checkup: new FormControl('', [Validators.required]),
      review: new FormControl('', [Validators.required])
    });
  }

  selectCheckup(checkup) {
    this.checkup = '';
    this.checkup = checkup;
  }
  get review(): string {
    return this.myForm.value['review'];
  }
  goToDisclaimer() {
    console.log(this.checkup);
    console.log(this.review);
    this.router.navigateByUrl('/disclaimer');

  }
}
