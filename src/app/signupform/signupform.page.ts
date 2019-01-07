import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GoogleDriveService } from 'src/app/services/google-drive.service';
import { SheetTabsTitleConst } from '../constants/sheet.constant';
import { DriveRequestModel } from '../models/drive-postdata.model';



@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.page.html',
  styleUrls: ['./signupform.page.scss'],
})
export class SignupformPage implements OnInit {

  myForm: FormGroup;
  sex: string ;
  constructor(private router: Router,
              private googleDriveService: GoogleDriveService
    ) {
  }

  ngOnInit() {

    this.myForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
      organization: new FormControl('', [Validators.required, Validators.minLength(2)]),
      contact: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]),
      gender: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required, Validators.minLength(4)])
      });
      console.log(this.googleDriveService.getLocalSheetTabData(SheetTabsTitleConst.SIGN_UP));
  }
  selectGender(gender) {
    this.sex = '';
    this.sex = gender;
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
  get firstname(): string {
    return this.myForm.value['firstname'];
  }
  get lastname(): string {
    return this.myForm.value['lastname'];
  }
  get gender(): string {
   return this.myForm.value['gender'] = this.sex;
  }

  get year(): string {
    return this.myForm.value['year'];
  }


  onSubmit( ) {

      const postData: DriveRequestModel = this.getParsedPostData(this.myForm.value);

      this.googleDriveService.setAllSheetData(this.googleDriveService.getSheetId(), postData).subscribe();

      this.router.navigateByUrl('/goals');
    }

    private getParsedPostData(formData): DriveRequestModel {

      console.log(formData);
      const values = [];

      Object.values(formData).forEach(value => {
        values.push(value);
      });

      const postData: DriveRequestModel = {
        'valueInputOption': 'USER_ENTERED',
        'data': [{
          'range': `${SheetTabsTitleConst.SIGN_UP}!A2:G2`,
          'majorDimension': 'ROWS',
          'values': [values]
        }]
      };

      console.log('postData', postData);
      return postData;

    }


}
