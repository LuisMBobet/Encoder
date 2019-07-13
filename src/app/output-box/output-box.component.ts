import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { LogicChoicesService } from '../logic-choices.service';
import BASES from '../bases.json';
import Big from 'big.js';

Big.DP = 40;
Big.PE = 40;
@Component({
  selector: 'app-output-box',
  templateUrl: './output-box.component.html',
  styleUrls: ['./output-box.component.sass']
})
export class OutputBoxComponent implements OnInit {
  inputBase: string;
  outputBase = 'Decimal';
  inputValue = '';
  outputValue: '';

  constructor(private data: DataService,
              private baseService: LogicChoicesService) { }

  ngOnInit() {
    this.baseService.currentInputBase.subscribe(next => {
      this.inputBase = next;
      this.UpdateOutput(); });
    this.baseService.currentOutputBase.subscribe(next => {
      this.outputBase = next;
      this.UpdateOutput(); });
    this.data.currentInputBoxMessage.subscribe(next => {
      this.inputValue = next;
      this.UpdateOutput(); });
  }

  UpdateOutput() {
    if (this.inputValue) {
      this.outputValue = this.ConvertDecimalToBase(this.ConvertBaseToDecimal(this.inputValue, this.inputBase), this.outputBase);
    }
  }

  /*
  ConvertBaseToDecimal
    Inputs: value (string) - Value to be converted
            base (string) - Base to be converted from, expected enum string
    Outputs: decimalValue (number) - Converted value
    Assertion: Converts a given value with a given base into equivalent decimal
  */
  ConvertBaseToDecimal(value: any, base: string) {
    const numberBase = Big(BASES[base].base);
    const baseValues = BASES[base].values;
    let decimalValue = Big(0);
    value = value.split('').reverse().join('');
    for (const digit in value) {
      if (baseValues.hasOwnProperty(value[digit])) {
        decimalValue = decimalValue.add(Big(numberBase).pow(Number(digit)).times(Number(baseValues[value[digit]])));
      }
    }
    return decimalValue;
  }
  /*
  ConvertDecimalToBase
    Inputs: value (any) - Input value, expected as a decimal Big
            base (string) - Expected as enum of keys of BASES
            endValue (string) - carry over sum, don't initialise
    Outputs: Type ()
    Assertion: Tail recursive conversion of a given decimal input into desired
               base
  */
  ConvertDecimalToBase(value: any, base: string, endValue = '') {
    const baseNumber = BASES[base].base;
    const quotient = value.div(baseNumber).round(0, 0);
    const remainder = value.mod(baseNumber).toString();
    endValue += this.getKeyByValue(BASES[base].values, remainder);
    if (quotient.valueOf() === '0') {
      return endValue.split('').reverse().join('');
    }
    return this.ConvertDecimalToBase(quotient, base, endValue);
    }

  /*
  getKeyByValue
    Inputs: objectToCheck (object)
            value (string) - value to check
    Assertion: Helper function to get key from a given value
  */
  getKeyByValue(objectToCheck: object, value: string) {
    return Object.keys(objectToCheck).find(key => objectToCheck[key] === value);
  }
}
