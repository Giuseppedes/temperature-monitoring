import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Temperature} from '../models/temperature';
import {Subject} from 'rxjs';
import {UrlUtilsService} from './url-utils.service';

@Injectable({
  providedIn: 'root'
})
export class TemperaturesService {

  temperatureListObservable = new Subject<Temperature[]>();

  constructor(private http: HttpClient, private urlUtilsService: UrlUtilsService) {}

  getAll() {
    const serviceBaseUrl = this.urlUtilsService.buildUrl(window.location.origin);  // origin = (RASPBERRY) WEB SERVER IP OR HOSTNAME
    return this.http.get<Temperature[]>(serviceBaseUrl + environment.temperaturesEndpoint);
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
