import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogicChoicesService {
  private inputBase = new BehaviorSubject('Binary');
  private outputBase = new BehaviorSubject('Decimal');

  currentInputBase = this.inputBase.asObservable();
  currentOutputBase = this.outputBase.asObservable();

  constructor() { }

  changeInputBase(base: string) {
    this.inputBase.next(JSON.parse(base));
  }

  changeOutputBase(base: string) {
    this.outputBase.next(JSON.parse(base));
  }
}
