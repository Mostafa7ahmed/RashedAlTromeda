import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header-pages',
  imports: [],
  templateUrl: './header-pages.html',
  styleUrl: './header-pages.scss'
})
export class HeaderPages {

    title = input<string>('الملف الشخصي');

}
