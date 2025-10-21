import { Component } from '@angular/core';
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-personal-info',
  imports: [NgxIntlTelInputModule],
  templateUrl: './personal-info.html',
  styleUrls: ['./personal-info.scss' , '../../../../../Shared/CSS/input.scss']
})
export class PersonalInfo {
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
}
