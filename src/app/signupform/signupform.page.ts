import { Component, OnInit } from '@angular/core';
// import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.page.html',
  styleUrls: ['./signupform.page.scss'],
})
export class SignupformPage implements OnInit {

  myForm: FormGroup;
  gender: string ;
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      organization: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
      year: new FormControl('', [Validators.required, Validators.minLength(4)]),
      contact: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      gender: new FormControl('', [Validators.required])
      });
  }
  selectGender(gender) {
    this.gender = '';
    this.gender = gender;
  }
  get email(): string {
    return this.myForm.value['email'];
  }
  get organization(): string {
    return this.myForm.value['organization'];
  }
  get contact(): string {
    return this.myForm.value['contact'];
  }
  get name(): string {
    return this.myForm.value['name'];
  }
  // get gender(): string {
  //   return this.myForm.value['gender'];
  // }

  get year(): string {
    return this.myForm.value['year'];
  }


  goToGoals( ) {
    console.log(this.email);
    console.log(this.organization);
    console.log(this.contact);
    console.log(this.name);
    console.log(this.gender);
    console.log(this.year);
    this.router.navigateByUrl('/goals');

  }
}
