import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Temperature} from '../models/temperature';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperaturesService {

  temperatureListObservable = new Subject<Temperature[]>();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {
  }

  getAll(hostIp) {
    console.log('this.hostIp: ' + hostIp);
    return this.http.get<Temperature[]>(hostIp + environment.temperaturesEndpoint);
  }

  refreshAndLoop(hostIp) {
    this.getAll(hostIp).subscribe(response => {
      this.temperatureListObservable.next(response);
      this.loop(hostIp);
    }, (error) => {console.log(error)});
  }

  loop(hostIp) {
    setTimeout(() => {
      this.refreshAndLoop(hostIp);
    }, 60000);  // milliseconds
  }

}
