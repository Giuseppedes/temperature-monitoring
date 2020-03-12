import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Temperature} from '../models/temperature';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperaturesService {

  temperatureListObservable = new Subject<Temperature[]>();

  hostIp;

  constructor(private http: HttpClient) {
  }

  getAll() {
    this.hostIp = window.location.origin;  // <- (RASPBERRY) WEB SERVER IP
    // remove port number
    if (this.hostIp.indexOf(':', this.hostIp.indexOf('http:') + 5) > 0) {
      this.hostIp = this.hostIp.substring(0, this.hostIp.indexOf(':', this.hostIp.indexOf('http:') + 5));
    }
    return this.http.get<Temperature[]>(this.hostIp + environment.temperaturesEndpoint);
  }

  refreshAndLoop() {
    this.getAll().subscribe(response => {
      this.temperatureListObservable.next(response);
      this.loop();
    });
  }

  loop() {
    setTimeout(() => {
      this.refreshAndLoop();
    }, 60000);  // milliseconds
  }

}
