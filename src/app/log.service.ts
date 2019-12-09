import { Injectable } from '@angular/core';

export class LogService {

  constructor() { }

  writeLog(logText) {
    console.log(logText);
  }

}
