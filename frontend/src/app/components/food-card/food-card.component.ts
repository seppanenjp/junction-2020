import { Component, Input } from '@angular/core';
import { FoodType } from '../../models/food-type';

@Component({
  selector: 'app-food-card',
  templateUrl: 'food-card.component.html'
})
export class FoodCardComponent {
  @Input() foodType?: FoodType;
}
