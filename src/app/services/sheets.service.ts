import { Injectable } from '@angular/core';
import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor() { }

  getValues(sheetid, range) {
    let values;
    let settings = {
      'async': true,
      'crossDomain': true,
      'url': `https://aadit-server.herokuapp.com/api/getValues/${sheetid}/${range}`,
      'method': 'GET',
      'headers': {
        'Accept': 'application/json',
        'cache-control': 'no-cache'
      }
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      values = response;
    });
    return values;
  }

  batchGetValues(sheetid, range) {
    let values = [] ;
    let settings = {
      'async': true,
      'crossDomain': true,
      'url': `https://aadit-server.herokuapp.com/api/batchGetValues/${sheetid}/${range}`,
      'method': 'GET',
      'headers': {
        'Accept': 'application/json',
        'cache-control': 'no-cache'
      }
    };

    $.ajax(settings).done(function (response) {
      console.log('response', response);
      values.push(response.valueRanges);

    });
    console.log('values', values);
    return values;
  }


  updateValues(sheetid, range, input_option, data) {
    let values;
    let settings = {
      'async': true,
      'crossDomain': true,
      'url': `https://aadit-server.herokuapp.com/api/updateValues/${sheetid}/${range}/${input_option}`,
      'method': 'POST',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
      },
      'processData': false,
      'data': `${data}`
    };
    $.ajax(settings).done(function (response) {
      console.log(response);
      values = response;
    });
    return values;
  }


  appendValues(sheetid, range, input_option, data) {
    let values;
    let settings = {
      'async': true,
      'crossDomain': true,
      'url': `https://aadit-server.herokuapp.com/api/appendValues/${sheetid}/${range}/${input_option}`,
      'method': 'POST',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
      },
      'processData': false,
      'data': `${data}`
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      values = response;
    });
    return values;
  }
}
