import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {TemperaturesService} from '../services/temperatures.service';
import {Temperature} from '../models/temperature';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-last-temperature',
  templateUrl: './last-temperature.component.html',
  styleUrls: ['./last-temperature.component.css']
})
export class LastTemperatureComponent implements OnInit {

  temperatureList: Temperature[];
  lastTemperature;
  lastTemperatureTime;

  targetTemperature;
  maxDifferenceAllowed;
  isSoundEnabled: boolean;

  temperatureColor;
  temperatureTooHigh: boolean;
  temperatureTooLow: boolean;
  temperatureDifference;

  alarmSound;

  hostIp;

  constructor(private temperaturesService: TemperaturesService, @Inject(PLATFORM_ID) private platformId: any) {
    this.isSoundEnabled = false;
    this.temperatureTooHigh = false;
    this.temperatureTooLow = false;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.hostIp = window.location.origin;  // <- (RASPBERRY) WEB SERVER IP
      if (this.hostIp.indexOf(':',this.hostIp.indexOf('http:')+5) > 0) {
        this.hostIp = this.hostIp.substring(0, this.hostIp.indexOf(':',this.hostIp.indexOf('http:')+5));
      }
      this.temperaturesService.refreshAndLoop(this.hostIp);
      this.temperaturesService.temperatureListObservable.subscribe(value => {
        this.temperatureList = value;
        this.lastTemperature = this.temperatureList[this.temperatureList.length - 1].temperature;
        this.lastTemperatureTime = this.temperatureList[this.temperatureList.length - 1].time;
        this.checkTemperature();
      }, (error) => {console.log(error)});
      this.alarmSound = new Audio();
      this.alarmSound.src = './assets/alarm.wav';
    } else {
      this.hostIp = 'http://localhost';
      this.temperaturesService.getAll(this.hostIp).subscribe(response => {
        this.temperatureList = response;
        this.lastTemperature = this.temperatureList[this.temperatureList.length - 1].temperature;
        this.lastTemperatureTime = this.temperatureList[this.temperatureList.length - 1].time;
        this.temperaturesService.temperatureListObservable.next(response);
      }, (error) => {console.log(error)});
    }
  }

  checkTemperature() {
    if (this.lastTemperature - this.targetTemperature < (-1) * this.maxDifferenceAllowed) {
      // LOW
      this.temperatureTooHigh = false;
      this.temperatureTooLow = true;
      this.temperatureColor = 'blue';
      this.temperatureDifference = this.targetTemperature - this.lastTemperature;
    } else if (this.lastTemperature - this.targetTemperature > this.maxDifferenceAllowed) {
      // HIGH
      this.temperatureTooHigh = true;
      this.temperatureTooLow = false;
      this.temperatureColor = 'red';
      this.temperatureDifference = this.lastTemperature - this.targetTemperature;
    } else  {
      // OK
      this.temperatureTooHigh = false;
      this.temperatureTooLow = false;
      this.temperatureColor = 'black';
      this.temperatureDifference = 0;
    }

    if (this.isSoundEnabled) {
      if (this.temperatureTooLow || this.temperatureTooHigh) {
        this.alarmSound.load();
        this.alarmSound.play();
      }
    }

  }

}
