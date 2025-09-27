import { Component } from '@angular/core';
import { HeaderPages } from "../../../components/header-pages/header-pages";
import { NgxIntlTelInputModule, SearchCountryField, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-infomation',
  imports: [HeaderPages, NgxIntlTelInputModule],
  templateUrl: './infomation.html',
  styleUrls: ['./infomation.scss' , '../../../../../src/app/Shared/CSS/input.scss']
})
export class Infomation {
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
}
