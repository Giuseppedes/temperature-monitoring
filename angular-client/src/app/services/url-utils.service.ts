import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlUtilsService {

  constructor() { }

  buildUrl(hostName) {

    let serviceUrl = hostName;

    // remove port number
    if (serviceUrl.indexOf(':', serviceUrl.indexOf('http:') + 5) > 0) {
      serviceUrl = serviceUrl.substring(0, serviceUrl.indexOf(':', serviceUrl.indexOf('http:') + 5));
    }

    // add port number if outside http tunnel
    if (!serviceUrl.includes('ngrok')) {
      serviceUrl = serviceUrl + ':' + environment.apiPort;
    }

    return serviceUrl;
  }
}
