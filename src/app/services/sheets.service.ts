import { Injectable } from '@angular/core';
import $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor() { }

  getValues(sheetid, range) {
    let data;
    let settings = {
      'async': true,
      'crossDomain': true,
      'url': `https://aadit-server.herokuapp.com/api/getValues/${sheetid}/${range}`,
      'method': 'GET',
      'headers': {
        'Accept': 'application/json',
        'Host': 'aadit-server.herokuapp.com',
        'accept-encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'cache-control': 'no-cache'
      }
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      this.data = response;
    });
    return data;
  }
}
