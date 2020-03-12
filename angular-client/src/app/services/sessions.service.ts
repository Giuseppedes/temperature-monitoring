import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  hostIp;

  constructor(private http: HttpClient) {
  }

  newSession() {
    this.hostIp = window.location.origin;  // <- (RASPBERRY) WEB SERVER IP
    // remove port number
    if (this.hostIp.indexOf(':', this.hostIp.indexOf('http:') + 5) > 0) {
      this.hostIp = this.hostIp.substring(0, this.hostIp.indexOf(':', this.hostIp.indexOf('http:') + 5));
    }
    return this.http.post(this.hostIp + environment.newSessionEndpoint, {});
  }
}
