import { Component, OnInit } from '@angular/core';
import { LogicChoicesService } from '../logic-choices.service';
import BASES from '../bases.json';

@Component({
  selector: 'app-logic-box',
  templateUrl: './logic-box.component.html',
  styleUrls: ['./logic-box.component.sass']
})
export class LogicBoxComponent implements OnInit {
  initialInputBase = 'Binary';
  initialOutputBase = 'Decimal';
  inputBase = '';
  outputBase = '';
  baseNames = Object.keys(BASES);
  constructor(private baseService: LogicChoicesService) { }

  ngOnInit() {
  }

  selectInputBase(base: string) {
    this.inputBase = JSON.stringify(base);
    this.baseService.changeInputBase(this.inputBase);
  }

  selectOutputBase(base: string) {
    this.outputBase = JSON.stringify(base);
    this.baseService.changeOutputBase(this.outputBase);
  }
}
