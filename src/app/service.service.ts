import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  dataSubject = new Subject<any>();

  sendData(msg: string) {
    this.dataSubject.next(msg);
  }
  constructor() {}
}
