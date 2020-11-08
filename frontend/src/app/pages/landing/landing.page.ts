import { Component } from '@angular/core';
import * as copy from 'copy-to-clipboard';
import { APIClient } from '../../services/api.service';
import { Lunch } from '../../models/lunch';
import { Participant, Status } from '../../models/participant';
import { ActivatedRoute } from '@angular/router';
import { FoodType } from '../../models/food-type';
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-landing-page',
  templateUrl: 'landing.page.html',
  styleUrls: ['landing.page.scss']
})
export class LandingPageComponent {
  lunch?: Lunch;
  participants: Participant[] = [];
  participant?: Participant;
  choices: number[] = [];

  restaurant?: Restaurant;
  username = '';
  choiceCount = 0;

  constructor(private api: APIClient, private route: ActivatedRoute) {
    const { groupId } = this.route.snapshot.params;

    if (groupId) {
      this.api.get(`/lunch/${groupId}`).subscribe((lunch: Lunch) => {
        this.lunch = lunch;
        this.getParticipants();
        if (this.lunch.restaurantId) {
          this.getRestaurant();
        }
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

  suggestRestaurant(): void {
    this.api.get(`/lunch/${this.lunch.id}/ready`).subscribe((lunch: Lunch) => {
      this.lunch = lunch;
      this.getRestaurant();
    });
  }

  joinLunch(): void {
    this.api
      .post(`/lunch/${this.lunch.id}/join`, { username: this.username })
      .subscribe((options: { participant: Participant; choices: number[] }) => {
        this.participant = options.participant;
        this.participants.push(options.participant);
        this.choices = options.choices;
      });
  }

  selectFood(foodType: FoodType): void {
    this.api
      .post(`/choice`, {
        participantId: this.participant.id,
        foodType: this.choices,
        result: foodType.id - 1
      })
      .subscribe((choices: number[]) => {
        this.choiceCount++;
        this.choices = choices;
      });
  }

  setReady(): void {
    this.api.get(`/participants/${this.participant.id}/ready`).subscribe(() => {
      this.participant.status = Status.Ready;
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

  getRestaurant(): void {
    this.api
      .get(`/restaurant/${this.lunch.restaurantId}`)
      .subscribe((restaurant: Restaurant) => {
        this.restaurant = restaurant;
      });
  }

  get hasParticipants(): boolean {
    return Boolean(
      this.participants.filter((p) => p.status === Status.Ready).length
    );
  }
}
