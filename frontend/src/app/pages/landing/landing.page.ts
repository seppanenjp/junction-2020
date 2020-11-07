import { Component } from '@angular/core';
import * as copy from 'copy-to-clipboard';

@Component({
  selector: 'app-landing-page',
  templateUrl: 'landing.page.html',
  styleUrls: ['landing.page.scss']
})
export class LandingPageComponent {
  code?: string;

  constructor() {}

  getCode(position): void {
    console.log(position);
    this.code = '0304AF92-6E96-409F-8CDA-C2244AE61C34';
  }

  get lunchUrl(): string {
    return `${location.href}lunch/${this.code}`;
  }

  copyUrl(): void {
    copy(this.lunchUrl);
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCode);
    } else {
      // No possible to do other stuff
    }
  }
}
