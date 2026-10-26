import { ApplicationConfig } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

export const appConfig: ApplicationConfig = {
  providers: [
    // Configuración de rutas con SSR y navegación inicial bloqueante
    provideRouter(routes, withEnabledBlockingInitialNavigation()),

    // Provisión de hidratación del cliente (SSR)
    provideClientHydration(),

    // Configuración de HTTP con soporte para Fetch API
    provideHttpClient(withFetch()),

    // Configuración de Google ReCAPTCHA
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LcoCTcqAAAAAJh2jUyiB1kIJaTkWu8Adu5aeICk',
      } as RecaptchaSettings,
    },
  ],
};
