import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';

@Injectable({
  providedIn: 'root',
})
export class AosService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  init(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1200,
        once: true,
      });
    }
  }
}
