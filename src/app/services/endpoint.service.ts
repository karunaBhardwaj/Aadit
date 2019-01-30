import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  public readonly googleApi = 'https://sheets.googleapis.com/v4/spreadsheets/';
  public readonly apiKey = 'AIzaSyDhrD_jc40DRSgxzwpw_BVJ80B8ZgzlAso';
  public readonly sendgridApi = 'https://api.sendgrid.com/v3/mail/send';
  public readonly sgApiKey = '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';
}

