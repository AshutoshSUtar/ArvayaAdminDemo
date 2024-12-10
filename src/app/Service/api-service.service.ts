import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { appkeys } from '../app.constant';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  clientId: number = 1;
  cloudID: any;
  httpHeaders = new HttpHeaders();
  options = {
    headers: this.httpHeaders,
  };

  httpHeaders1 = new HttpHeaders();
  options1 = {
    headers: this.httpHeaders1,
  };

  gmUrl = appkeys.gmUrl;
  applicationId = 1;

  baseUrl = appkeys.baseUrl;
  url = appkeys.url;
  retriveimgUrl = appkeys.retriveimgUrl;
  imgUrl = appkeys.imgUrl;
  imgUrl1 = appkeys.imgUrl1;
  dateforlog =
    new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
  emailId = sessionStorage.getItem('emailId');
  userId = Number(sessionStorage.getItem('userId'));
  userName = sessionStorage.getItem('userName');
  roleId = sessionStorage.getItem('roleId');

  constructor(private cookie: CookieService, private httpClient: HttpClient) {}
  // APIKEY="WGykEs0b241gNKcDshYU9C4I0Ft1JoSb"

  // APPLICATION_KEY = 'ZU63HDzj79PEFzz5'
  // For  Testing server
  getheader() {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      apikey: 'WGykEs0b241gNKcDshYU9C4I0Ft1JoSb',
      applicationkey: 'ZU63HDzj79PEFzz5',
      deviceid: this.cookie.get('deviceId'),
      supportkey: this.cookie.get('supportKey'),
      Token: this.cookie.get('token'),
    });
    this.options = {
      headers: this.httpHeaders,
    };
  }

  login(email: string, password: string) {
    //

    this.options = {
      headers: this.httpHeaders,
    };

    var data = {
      username: email,
      password: password,
    };

    return this.httpClient.post(
      this.baseUrl + 'user/login',
      JSON.stringify(data)
    );
  }

  createUser(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/user/create',
      JSON.stringify(user)
    );
  }

  loggerInit() {
    this.options1 = {
      headers: this.httpHeaders1,
    };

    var data = {
      CLIENT_ID: this.clientId,
    };

    return this.httpClient.post(
      this.gmUrl + 'device/init',
      JSON.stringify(data)
    );
  }

  getForms(roleId: number) {
    this.options = {
      headers: this.httpHeaders,
    };

    var data = {
      ROLE_ID: roleId,
    };

    return this.httpClient.post<any>(
      this.url + 'user/getForms',
      JSON.stringify(data)
    );
  }

  getAllForms(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/form/get',
      JSON.stringify(data)
    );
  }

  createForm(form: any): Observable<any> {
    form.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/form/create',
      JSON.stringify(form)
    );
  }

  updateForm(form: any): Observable<any> {
    form.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.baseUrl + 'api/form/update',
      JSON.stringify(form)
    );
  }

  getAllRoles(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/role/get',
      JSON.stringify(data)
    );
  }

  createRole(application: any): Observable<any> {
    application.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/role/create',
      JSON.stringify(application)
    );
  }

  updateRole(application: any): Observable<any> {
    application.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.baseUrl + 'api/role/update',
      JSON.stringify(application)
    );
  }

  updateUser(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.baseUrl + 'api/user/update',
      JSON.stringify(user)
    );
  }

  getRoleDetails(roleId: number) {
    var data = {
      ROLE_ID: roleId,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/roleDetails/getData',
      JSON.stringify(data)
    );
  }

  getAllUsers(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/user/get',
      JSON.stringify(data)
    );
  }

  addRoleDetails(roleId: number, data1: string[]): Observable<any> {
    var data = {
      ROLE_ID: roleId,
      data: data1,
    };

    return this.httpClient.post<any>(
      this.baseUrl + 'api/roleDetails/addBulk',
      data
    );
  }

  sendOTP(TYPE: any, TYPE_VALUE): Observable<any> {
    var data = {
      TYPE: TYPE,
      TYPE_VALUE: TYPE_VALUE,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/sendOtpToDevice',
      JSON.stringify(data)
    );
  }

  confirmOTP(passwordData: any): Observable<any> {
    var data = {
      TYPE: passwordData.TYPE,
      TYPE_VALUE: passwordData.TYPE_VALUE,
      OTP: passwordData.OTP,
      RID: passwordData.RID,
      VID: passwordData.VID,
    };

    return this.httpClient.post<any>(
      this.baseUrl + 'api/verifyOtp',
      JSON.stringify(data)
    );
  }

  changePassword(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/user/changePassword',
      JSON.stringify(user)
    );
  }

  forgetPasswordAdmin(data: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + 'api/user/forgetPasswordAdmin',
      JSON.stringify(data)
    );
  }

  deleteAllCookies() {
    // Retrieve all cookies
    const cookies: string[] = document.cookie.split(';');

    // Iterate over each cookie
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const cookieName =
        eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

      // Explicitly delete the cookie with the root path '/'
      this.cookie.delete(cookieName, '/');
    }
  }

  getDesignationData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/designation/get',
      JSON.stringify(data)
    );
  }

  onUpload(folderName, selectedFile, filename): Observable<any> {
    this.onuploadheader();
    let params = new HttpParams();

    const options1 = {
      headers: this.httpHeaders1,
      params: params,
      reportProgress: true,
    };

    const fd = new FormData();
    fd.append('Image', selectedFile, filename);
    const req = new HttpRequest('POST', this.imgUrl + folderName, fd, options1);
    return this.httpClient.request(req);
  }

  // For Testing server
  onuploadheader() {
    this.httpHeaders1 = new HttpHeaders({
      Accept: 'application/json',
      apikey: 'WGykEs0b241gNKcDshYU9C4I0Ft1JoSb',
      applicationkey: 'ZU63HDzj79PEFzz5',
      supportkey: this.cookie.get('supportKey'),
      Token: this.cookie.get('token'),
    });

    this.options1 = {
      headers: this.httpHeaders,
    };
  }
  getAllCityMaster(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<any>(
      this.url + 'city/get',
      JSON.stringify(data)
    );
  }

  CreateCityMaster(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;

    return this.httpClient.post<any>(
      this.url + 'city/create',
      JSON.stringify(user)
    );
  }

  UpdateCityMaster(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;

    return this.httpClient.put<any>(
      this.url + 'city/update',
      JSON.stringify(user)
    );
  }
  getAllStateMaster(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<any>(
      this.url + 'State/get',
      JSON.stringify(data)
    );
  }

  getAllCountryMaster(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<any>(
      this.url + 'country/get',
      JSON.stringify(data)
    );
  }
  getAllPincodeMaster(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<any>(
      this.url + 'pincode/get',
      JSON.stringify(data)
    );
  }
  // getAllPincode(
  //   pageIndex: number,
  //   pageSize: number,
  //   sortKey: string,
  //   sortValue: string,
  //   filter: string
  // ): Observable<OrganizationMaster[]> {
  //   var data = {
  //     pageIndex: pageIndex,
  //     pageSize: pageSize,
  //     sortKey: sortKey,
  //     sortValue: sortValue,
  //     filter: filter,
  //   };

  //   return this.httpClient.post<OrganizationMaster[]>(
  //     this.url + 'pincode/get',
  //     JSON.stringify(data)
  //   );
  // }

  getAllPincode(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
 
    return this.httpClient.post<any[]>(
      this.url + "pincode/get",
      JSON.stringify(data),
      this.options
    );
  }

  createPincode(pincode: any): Observable<number> {
    pincode.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(
      this.url + 'pincode/create',
      JSON.stringify(pincode)
    );
  }

  updatePincode(pincode: any): Observable<number> {
    pincode.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(
      this.url + 'pincode/update',
      JSON.stringify(pincode)
    );
  }

  getLanguageData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/language/get',
      JSON.stringify(data)
    );
  }

  createLanguage(form: any): Observable<any> {
    form.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/language/create',
      JSON.stringify(form)
    );
  }

  updateLanguage(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.baseUrl + 'api/language/update',
      JSON.stringify(user)
    );
  }

  // State get, create, update
  getState(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<any>(
      this.url + 'state/get',
      JSON.stringify(data)
    );
  }

  createState(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;

    return this.httpClient.post<any>(
      this.url + 'state/create',
      JSON.stringify(data)
    );
  }

  updateState(data: any): Observable<any> {
    return this.httpClient.put<any>(
      this.url + 'state/update',
      JSON.stringify(data)
    );
  }

  // City get, create, update
  getCity(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<any>(
      this.url + 'city/get',
      JSON.stringify(data)
    );
  }

  createCity(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;

    return this.httpClient.post<any>(
      this.url + 'city/create',
      JSON.stringify(data)
    );
  }

  updateCity(data: any): Observable<any> {
    return this.httpClient.put<any>(
      this.url + 'city/update',
      JSON.stringify(data)
    );
  }
  createCountryData(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'country/create',
      JSON.stringify(data)
    );
  }

  updateCountryData(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.url + 'country/update',
      JSON.stringify(user)
    );
  }

  getRolesData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/role/get',
      JSON.stringify(data)
    );
  }

  getCountryData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<any>(
      this.url + 'country/get',
      JSON.stringify(data)
    );
  }

  getAppLanguageData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/appLanguage/get',
      JSON.stringify(data)
    );
  }
  createAppLanguageData(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'appLanguage/create',
      JSON.stringify(data)
    );
  }

  updateAppLanguageData(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.url + 'appLanguage/update',
      JSON.stringify(user)
    );
  }
}
