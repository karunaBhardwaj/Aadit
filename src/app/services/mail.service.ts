import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor() { }

  sendMail(to, subject, text) {
    let values;
    let settings = {
      'async': true,
      'crossDomain': true,
      'url': `https://aadit-server.herokuapp.com/api/sendmail/${to}/${subject}`,
      'method': 'POST',
      'headers': {
        'Content-Type': 'text/plain',
        'cache-control': 'no-cache'
      },
      'data': `${text}`
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      this.values = response;
    });
    return values;
  }
}
