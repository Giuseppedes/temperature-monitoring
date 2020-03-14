import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UrlUtilsService} from './url-utils.service';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private http: HttpClient, private urlUtilsService: UrlUtilsService) { }

  newSession() {
    const serviceBaseUrl = this.urlUtilsService.buildUrl(window.location.origin);  // origin = (RASPBERRY) WEB SERVER IP OR HOSTNAME
    return this.http.post(serviceBaseUrl + environment.newSessionEndpoint, {});
  }
}
