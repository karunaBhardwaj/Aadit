import { Injectable } from '@angular/core';
import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor() { }

  async getValues(sheetid, range) {
    let values = [];
    const settings = {
      'async': true,
      'crossDomain': true,
      'url': `https://aadit-server.herokuapp.com/api/getValues/${sheetid}/${range}`,
      'method': 'GET',
      'headers': {
        'Accept': 'application/json',
        'cache-control': 'no-cache'
      }
    };

    await $.ajax(settings).done(function (response) {
      console.log(response);
      values.push(response[0]);
    });
    return values;
  }

  async batchGetValues(sheetid, range) {
    const values = [] ;
    const settings = {
      'async': true,
      'crossDomain': true,
      'url': `https://aadit-server.herokuapp.com/api/batchGetValues/${sheetid}/${range}`,
      'method': 'GET',
      'headers': {
        'Accept': 'application/json',
        'cache-control': 'no-cache'
      }
    };

    await $.ajax(settings).then(function (response) {
      console.log('response', response);
      values.push(response.valueRanges[0]['values']);
      values.push(response.valueRanges[1]['values']);
      values.push(response.valueRanges[2]['values']);

    });
    return values;
  }


  updateValues(sheetid, range, input_option, data) {
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
    });
  }


  appendValues(sheetid, range, input_option, data) {
    const settings = {
      'async': true,
      'crossDomain': true,
      'url': `https://aadit-server.herokuapp.com/api/appendValues/${sheetid}/${range}/${input_option}`,
      'method': 'POST',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
      'dataType': 'json',
      'processData': false,
      'data': `${data}`
    };
    console.log('data', data);
    $.ajax(settings).done(function (response) {
      console.log(response.error);
    }).fail(function(error) {
      console.log(error);
    });
  }
}
