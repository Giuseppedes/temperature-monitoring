import { Component, OnInit } from '@angular/core';
import {TemperaturesService} from '../services/temperatures.service';
import {Temperature} from '../models/temperature';

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

  constructor(private temperaturesService: TemperaturesService) {
    this.isSoundEnabled = false;
    this.temperatureTooHigh = false;
    this.temperatureTooLow = false;

    this.alarmSound = new Audio();
    this.alarmSound.src = './assets/alarm.wav';

  }

  ngOnInit() {
    this.temperaturesService.refresh();
    this.temperaturesService.temperatureListObservable.subscribe(value => {
      this.temperatureList = value;
      this.lastTemperature = this.temperatureList[this.temperatureList.length - 1].temperature;
      this.lastTemperatureTime = this.temperatureList[this.temperatureList.length - 1].time;
      this.checkTemperature();
    });
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
