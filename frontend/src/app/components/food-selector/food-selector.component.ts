import { Component } from '@angular/core';
import { APIClient } from '../../services/api.service';
import { FoodType } from '../../models/food-type';

@Component({
  selector: 'app-food-selector',
  templateUrl: 'food-selector.component.html'
})
export class FoodSelectorComponent {
  foodType: FoodType = { id: 1, name: 'Mexican food' };
  foodType2: FoodType = { id: 1, name: 'Italian food' };

  foodTypes: FoodType[] = [];

  constructor(private api: APIClient) {
    this.api.get('/foodtypes').subscribe((foodTypes: FoodType[]) => {
      this.foodTypes = foodTypes;
    });
  }

  selectFood(foodType: FoodType): void {}
}
