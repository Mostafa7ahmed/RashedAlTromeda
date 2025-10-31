import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experience'
})
export class ExperiencePipe implements PipeTransform {
  transform(startYear?: number): string {
    if (!startYear) return 'غير متوفر';
    
    const currentYear = new Date().getFullYear();
    const experience = currentYear - startYear;
    return `${experience}`;
  }

}
