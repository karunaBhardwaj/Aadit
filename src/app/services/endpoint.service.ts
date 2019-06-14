import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  public readonly googleApi = 'https://sheets.googleapis.com/v4/spreadsheets/';
  public readonly apiKey = 'AIzaSyDhrD_jc40DRSgxzwpw_BVJ80B8ZgzlAso';
}

