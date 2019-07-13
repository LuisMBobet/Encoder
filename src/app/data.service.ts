import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private inputBoxMessage = new BehaviorSubject('Default message for the input');

  currentInputBoxMessage = this.inputBoxMessage.asObservable();

  constructor() { }

  changeInputBoxMessage(message: string) {
    this.inputBoxMessage.next(message);
  }
}
