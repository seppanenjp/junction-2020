import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { APIClient } from '../../services/api.service';
import { FoodType } from '../../models/food-type';

@Component({
  selector: 'app-food-selector',
  templateUrl: 'food-selector.component.html'
})
export class FoodSelectorComponent implements OnChanges {
  @Input() choices: number[] = [];
  @Output() select: EventEmitter<FoodType>;

  foodTypes: FoodType[] = [];

  constructor(private api: APIClient) {
    this.select = new EventEmitter<FoodType>();
    this.api.get('/foodtypes').subscribe((foodTypes: FoodType[]) => {
      this.foodTypes = foodTypes;
    });
  }

  ngOnChanges(): void {}

  selectFood(foodType: FoodType): void {
    this.select.emit(foodType);
  }

  getFoodType(id: number): FoodType {
    return this.foodTypes.find((t) => t.id === id);
  }
}
