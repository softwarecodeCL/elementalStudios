import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LcoCTcqAAAAAJh2jUyiB1kIJaTkWu8Adu5aeICk',
      } as RecaptchaSettings,
    },
  ],
};