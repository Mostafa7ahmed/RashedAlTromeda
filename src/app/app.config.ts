import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './Core/interceptors/headers-interceptor';
import { errorInterceptor } from './Core/interceptors/error-interceptor';
import { refreshTokenInterceptor } from './Core/interceptors/refresh-token-interceptor';



import {provideTranslateService, provideTranslateLoader} from "@ngx-translate/core";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader"; 
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideZonelessChangeDetection(),
    provideHttpClient(withFetch(),withInterceptors([authInterceptor,errorInterceptor , refreshTokenInterceptor])),
    provideRouter(routes),
        provideAnimations(),
 provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    })
  ]
};
