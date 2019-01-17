import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppService } from './app.service';
import { SheetTabsTitleConst } from '../constants/sheet.constant';
import { SheetModel } from '../models/sheet.model';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { NewSheetModel } from '../models/google-sheet-setup.model';
import { EndpointService } from './endpoint.service';
import { DbqueryService } from './dbquery.service';
// import { UserProfileModel, UserInfoModel } from '../models/user-info.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private endpointService: EndpointService,
    private router: Router,

    private queryService: DbqueryService) { }

  private allSheetData: SheetModel[] = [];
  public readonly SESSION_STORAGE_KEY: string = 'accessToken';

  public isProfileSetupComplete(): boolean {
    const profileData = this.getLocalSheetTabData(SheetTabsTitleConst.SIGN_UP);
    const profileValue = profileData['data']['values'] || [];
    if (profileValue.length < 2) {
      return false;
    }

    const profileColumnLen = profileValue[0].length;

    if (profileValue[1].length !== profileColumnLen) {      // if enteries are not equal to title enteries
      return false;
    }

    for (const value of profileValue[1]) {
      if (value.length === 0) {
        return false;
      }
    }
    return true;
  }
  public isGoalSetupComplete(): boolean {
    const goalsData = this.getLocalSheetTabData(SheetTabsTitleConst.GOALS);
    const goalsValue = goalsData['data']['values'] || [];

    if (goalsValue.length < 2) {
      return false;
    }

    const goalsColumnLen = goalsValue[0].length;

    for (let i = 1; i < goalsValue.length; i++) {
      if (goalsValue[i].length !== goalsColumnLen || goalsValue[i][1].length === 0) {
        return false;
      }
    }
    return true;
  }

  public isMedicalSetupComplete(): boolean {
    const medicalData = this.getLocalSheetTabData(SheetTabsTitleConst.MEDICAL_HISTORY);
    const medicalValue = medicalData['data']['values'] || [];

    if (medicalValue.length < 2) {
      return false;
    }

    const medicalColumnLen = medicalValue[0].length;

    for (let i = 1; i < medicalValue.length; i++) {
      if (medicalValue[i].length !== medicalColumnLen || medicalValue[i][1].length === 0) {
        return false;
      }
    }
    return true;
  }

    public isTestSetupComplete(): boolean {
    const testData = this.getLocalSheetTabData(SheetTabsTitleConst.TEST_DATA);
    const testValue = testData['data']['values'] || [];

    if (testValue.length < 2) {
      return false;
    }

    const testColumnLen = testValue[0].length;

    // for (let i = 1; i < testValue.length; i++) {
    //   if (testValue[i].length !== testColumnLen || testValue[i][1].length === 0) {
    //     return false;
    //   }
    for (const value of testValue[1]) {
      if (value.length === 0) {
        return false;
      }
    }
    return true;
  }

  public getAllSheetDataObj(): SheetModel[] {
    return this.allSheetData;
  }


  public getLocalSheetTabData(tab: string) {
    const sheetData = this.getAllSheetDataObj();
    return sheetData.find(sheet => sheet.title === tab);
  }

  public getAllSheetData(sheetId: string): Observable<any> {
    const url = this.appService.getParsedGetDataUrl(sheetId);
    return this.http.get(url);
  }

  public saveAllSheetData(sheetApidata): void {
    Object.values(SheetTabsTitleConst).forEach((title, index) => {
      const sheetObj: SheetModel = {
        title: '',
        data: {}
      };

      sheetObj.title = title;
      sheetObj.data = sheetApidata[index];

      this.allSheetData.push(sheetObj);
    });
  }
  public getSheetTabData(sheetId: string, tab: string): Observable<any> {
    const url = this.appService.getParsedGetDataUrl(sheetId, tab);
    return this.http.get(url);
  }


  public setAllSheetData(sheetId: string, postData: any): Observable<any> {
    const url = this.appService.getParsedPostDataUrl(sheetId);
    return this.http.post(url, postData);
  }

  public setSheetTabData(sheetId: string, postData: any, tab?: string): Observable<any> {
    const url = this.appService.getParsedPostDataUrl(sheetId, tab);
    return this.http.post(url, postData);
  }

  public createUser(user_id, authToken: string): Observable<any> {
    const postData: NewSheetModel = this.getNewSheetModel();
    postData.properties.title = user_id;

    return this.http.post(this.endpointService.googleApi, postData);

  }
  public getToken(): string {
    const token: string = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error('no token set , authentication required');
    }
    return token;
  }

  public getNewSheetModel(): NewSheetModel {

    const model = {
      properties: {
        title: ''
      },
      sheets: []
    };

    Object.values(SheetTabsTitleConst).forEach(title => {
      const sheet = {
        properties: {
          title: title
        }
      };
      model.sheets.push(sheet);
    });

    return model;
  }



  public getSheetId(): string {
    const userInfo = this.appService.getUserInfo();
    if (!userInfo) {
      this.router.navigate(['/login']);
      return '';
    }
    return this.appService.getUserInfo().token.sheetId;
  }

  public getOauthToken(): string {
    const userInfo = this.appService.getUserInfo();
    if (!userInfo) {
      this.router.navigate(['/login']);
      return '';
    }
    return userInfo.token.oAuthToken;
  }

}
