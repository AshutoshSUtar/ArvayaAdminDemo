import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HTTPintercptorInterceptor implements HttpInterceptor {

  constructor(private cookie: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.cookie.get('token');
    const deviceId = this.cookie.get('deviceId');
    const supportKey = this.cookie.get('supportKey');

  

    const modifiedrequest = request.clone({
      setHeaders:{
        'Content-Type': 'application/json',
        apikey: 'WGykEs0b241gNKcDshYU9C4I0Ft1JoSb',
        applicationkey: 'ZU63HDzj79PEFzz5',
        deviceid: deviceId,
        supportkey: supportKey,
        Token: token || '', 

      }
    })
        // console.log(modifiedrequest,'demo ..');

    return next.handle(modifiedrequest);
  }
}
