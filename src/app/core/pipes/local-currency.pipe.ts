import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localCurrency',
  standalone: true
})
export class LocalCurrencyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
