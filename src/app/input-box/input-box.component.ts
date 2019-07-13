import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { LogicChoicesService } from '../logic-choices.service';
import BASES from '../bases.json';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.sass']
})
export class InputBoxComponent implements OnInit {
  values = '';
  base = '';

  constructor(private data: DataService, private inputBase: LogicChoicesService) { }

  ngOnInit() {
    this.inputBase.currentInputBase.subscribe(base => {
      this.base = base;
      this.OnKey(this.values); });
  }

  /*
  OnKey
    Inputs: value (string)
    Assertion: Updates stored value, constructs allowed input and passes to
               DataService
  */

  OnKey(value: string) {
    this.values = value;
    this.data.changeInputBoxMessage(this.ConstructGeneral(this.values, this.base));
  }

  /*
  ConstructGeneral
    Inputs: value (any) - Input string
            base (string) - Assumed base of input, expected enum string
    Outputs: constructedValue (string) - Constructed string composed of allowed
                                         characters
    Assertion: Constructs a string from allowed characters
    Description: Goes through the input value characters and constructs a string
                 from the allowed characters, unexpected characters are ignored
  */
  ConstructGeneral(value: any, base: string) {
    let constructedValue = '';
    for (const digit of value) {
      if (BASES[base].values.hasOwnProperty(digit)) {
        constructedValue += BASES[base].values[digit];
      }
    }
    return constructedValue;
  }
}
