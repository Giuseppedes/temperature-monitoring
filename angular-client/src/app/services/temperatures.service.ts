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
    return this.http.get<Temperature[]>(this.hostIp + environment.temperaturesEndpoint);
  }

  refresh() {
    this.getAll().subscribe(response => {
      console.log(response);
      this.temperatureListObservable.next(response);
      this.loop();
    });
  }

  loop() {
    setTimeout(() => {
      this.refresh();
    }, 60000);  // milliseconds
  }

}
