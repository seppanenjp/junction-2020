import { Component } from '@angular/core';
import * as copy from 'copy-to-clipboard';
import { APIClient } from '../../services/api.service';
import { Lunch } from '../../models/lunch';
import { Participant } from '../../models/participant';
import { ActivatedRoute } from '@angular/router';

enum AppMode {
  JOIN = 'Join',
  VIEW = 'View'
}

@Component({
  selector: 'app-landing-page',
  templateUrl: 'landing.page.html',
  styleUrls: ['landing.page.scss']
})
export class LandingPageComponent {
  mode: AppMode = AppMode.VIEW;
  lunch?: Lunch;
  participants: Participant[] = [];

  constructor(private api: APIClient, private route: ActivatedRoute) {
    const { groupId } = this.route.snapshot.params;

    if (groupId) {
      this.api.get(`/lunch/${groupId}`).subscribe((lunch: Lunch) => {
        this.lunch = lunch;
        this.getParticipants();
      });
    }
  }

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

        // Set correct url
        history.pushState('', '', this.lunchUrl);
      });
  }

  get lunchUrl(): string {
    return `${location.origin}/lunch/${this.lunch.groupId}`;
  }

  getParticipants(): void {
    this.api
      .get(`/lunch/${this.lunch.id}/participants`)
      .subscribe((participants: Participant[]) => {
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
      // No possible to do other stuff so show error
    }
  }
}
