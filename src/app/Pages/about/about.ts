import { Component, signal } from '@angular/core';
import { BookBtn } from "../../components/book-btn/book-btn";
import { LangChangeEvent, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  imports: [BookBtn, TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
 buttonLabel = signal('احجز خدمتك الآن');
  color = 'var(--color-orange-dark)';
  buttonColorText = signal('#FFF');

  explorLabel = signal('استكشف المزيد');
  contactLabel = signal('تواصل معنا ');

  rates: any[] = [];
  features = signal<string[]>([]);

  private langSub: Subscription;

  constructor(private translate: TranslateService) {
    this.loadRates();
    this.loadFeatures();

    // متابعة أي تغيير في اللغة
    this.langSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadFeatures(); // تحديث features عند تغيير اللغة
      this.loadRates();    // لو عايز تحديث النصوص في rates كمان
    });
  }

  loadRates() {
    this.rates = [
      {
        icon: 'Icons/target.svg',
        title: this.translate.instant('ABOUT.TITLE_1'),
        text: this.translate.instant('ABOUT.TEXT1'),
      },
      {
        icon: 'Icons/Mission Achieved.svg',
        title: this.translate.instant('ABOUT.TITLE_2'),
        text: this.translate.instant('ABOUT.TEXT2'),
      },
      {
        icon: 'Icons/Mission.svg',
        title: this.translate.instant('ABOUT.TITLE_3'),
        text: this.translate.instant('ABOUT.TEXT3'),
      },
    ];
  }

  loadFeatures() {
    this.translate.get('ABOUT.FEATURES').subscribe((res: string[]) => {
      this.features.set(res);
    });
  }

  ngOnDestroy() {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }
}
