import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Temperature} from '../models/temperature';
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
    return this.http.post(this.hostIp + environment.newSessionEndpoint, {});
  }
}
