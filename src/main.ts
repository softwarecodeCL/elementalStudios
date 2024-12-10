import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
  navigator.serviceWorker.controller.postMessage({ type: 'disable-navigation-preload' });
}


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
