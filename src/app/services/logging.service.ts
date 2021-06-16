import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  consoleInfo(msg: string, data?: any) {
    if (data) {
      console.info(msg, data);
    } else {
      console.info(msg);
    }
  }

  consoleError(err: any) {
    console.error(err);
  }
}
