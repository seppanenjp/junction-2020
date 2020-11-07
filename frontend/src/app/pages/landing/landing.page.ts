import { Component } from '@angular/core';
import * as copy from 'copy-to-clipboard';
import { APIClient } from '../../services/api.service';
import { Lunch } from '../../models/lunch';
import { Participant } from '../../models/participant';
import { ActivatedRoute } from '@angular/router';

enum AppMode {
  CREATE = 'Create',
  JOIN = 'Join',
  VIEW = 'View'
}

@Component({
  selector: 'app-landing-page',
  templateUrl: 'landing.page.html',
  styleUrls: ['landing.page.scss']
})
export class LandingPageComponent {
  mode: AppMode = AppMode.CREATE;
  lunch?: Lunch;
  participants: Participant[] = [];

  constructor(private api: APIClient, private route: ActivatedRoute) {}

  getCode(position): void {
    const coordinates = position.coords;
    this.api
      .post('/lunch/create', {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      })
      .subscribe((lunch: any) => {
        this.lunch = lunch;
        this.getParticipants();
      });
  }

  get lunchUrl(): string {
    return `${location.origin}/lunch/${this.lunch.groupId}/join`;
  }

  getParticipants(): void {
    this.api
      .get(`/lunch/${this.lunch.groupId}/participants`)
      .subscribe((participants: Participant[]) => {
        console.log(participants);
        this.participants = participants;
      });
  }

  copyUrl(): void {
    copy(this.lunchUrl);
  }

  readyForLunch(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCode.bind(this));
    } else {
      // No possible to do other stuff
    }
  }
}
