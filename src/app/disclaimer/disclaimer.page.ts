import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.page.html',
  styleUrls: ['./disclaimer.page.scss'],
})
export class DisclaimerPage implements OnInit {

  myForm: FormGroup;


  constructor(private router: Router) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      grantPermission: new FormControl(false, [Validators.required])
    });

  }
  get grantPermission(): string {
    return this.myForm.value['grantPermission'];
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  onSubmit() {
    const values = [];
    Object.values(this.myForm.value).forEach(value => {
      values.push(value);
    });
    $.ajax('https://aadit-server.azurewebsites.net/bulkUpdateCell', {
      method: 'POST',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        'sheetid': '1Sv1BbZFmN4rxu2L1VM6RZ679xrV3RwtmlIY0vcIZC5I',
        'worksheet': 3,
        'minRow'   : 14,
        'maxRow'   : 14,
        'minCol'   : 2,
        'maxCol'   : 2,
        'value'	   : values
    })
  })
  .then(
      function success(mail) {
          console.log('Data updated succesfully');
      }
  );
    alert('profile setup completed');
    this.router.navigateByUrl('/thankyou');
    }

}

