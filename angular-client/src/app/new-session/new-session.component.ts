import { Component, OnInit } from '@angular/core';
import {SessionsService} from '../services/sessions.service';
import {TemperaturesService} from '../services/temperatures.service';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.css']
})
export class NewSessionComponent implements OnInit {

  isNewSessionRequested: boolean;
  isNewSessionConfirmed: boolean;

  constructor(private sessionService: SessionsService) {
    this.isNewSessionRequested = false;
    this.isNewSessionConfirmed = false;
  }

  ngOnInit() {
  }

  onNewSession() {
    this.isNewSessionRequested = true;
  }

  onNewSessionConfirmed() {
    this.isNewSessionRequested = false;
    this.isNewSessionConfirmed = true;
    this.sessionService.newSession().subscribe(res => {
      this.isNewSessionConfirmed = false;
      // TODO immediately clear old temperature list.
    }, (error) => {console.log(error)});
  }

}
