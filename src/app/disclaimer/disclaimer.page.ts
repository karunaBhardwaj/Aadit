import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.page.html',
  styleUrls: ['./disclaimer.page.scss'],
})
export class DisclaimerPage implements OnInit {

  myForm: FormGroup;


  constructor() { }

  ngOnInit() {
    this.myForm = new FormGroup({
      grantPermission: new FormControl('', [Validators.required])
    });

  }
  get grantPermission(): string {
    return this.myForm.value['grantPermission'];
  }


  Submit() {
    console.log(this.grantPermission);

  }
}
