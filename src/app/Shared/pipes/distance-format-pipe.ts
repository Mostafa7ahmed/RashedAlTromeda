import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distanceFormat'
})
export class DistanceFormatPipe implements PipeTransform {

transform(value: number): string {
    if (value == null || isNaN(value)) return '';
    
    if (value < 1000) {
      return `${Math.round(value)} M`;
    } else {
      const km = value / 1000;
      return `${km.toFixed(1)} KM`;
    }
  }

}
