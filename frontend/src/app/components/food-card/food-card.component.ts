import { Component, Input } from '@angular/core';
import { FoodType } from '../../models/food-type';

@Component({
  selector: 'app-food-card',
  templateUrl: 'food-card.component.html',
  styleUrls: ['food-card.component.scss']
})
export class FoodCardComponent {
  @Input() foodType?: FoodType;

  foodImage(): string {
    return `assets/images/${this.foodType.name}.jpg`;
  }
}
