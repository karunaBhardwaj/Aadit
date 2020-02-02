import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor() { }

  async getValues(sheetid, range) {
    const values = [];
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

  async getRowValues(sheetid, range) {
    const values = [];
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
      values.push(response);
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

  async intialValuesCheck(sheetid, range) {
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
    });
    if (values[0] === undefined) {
      return 'profile Data unavailable';
    } else if (values[1] === undefined) {
      return false;
    }
    return true;
  }


  updateValues(sheetid, range, input_option, data) {
    const settings = {
      'async': true,
      'crossDomain': true,
      'url': `https://aadit-server.herokuapp.com/api/updateValues/${sheetid}/${range}/${input_option}`,
      'method': 'POST',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      'processData': false,
      'data': `${JSON.stringify(data)}`
    };
    $.ajax(settings).done(function (response) {
      console.log(response);
    }).fail(function(error) {
      console.log(error);
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
      },
      'processData': false,
      'data': `${JSON.stringify(data)}`
    };
    $.ajax(settings).done(function (response) {
      console.log(response);
    }).fail(function(error) {
      console.log(error);
    });
  }
}
