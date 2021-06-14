import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  consoleInfo(msg: string) {
    console.info(msg);
  }
}
