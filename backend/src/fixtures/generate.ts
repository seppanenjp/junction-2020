import { Restaurant } from '../entities/restaurant';
import { FoodType } from '../entities/foodType';
import { v4 as uuid } from 'uuid';

export const generateFoodType = (
  id,
  name
): FoodType => {
  return {id, name};
}

export const generateRestaurant = (
  name,
  foodTypes,
  latitude,
  longitude,
  menu
): Restaurant => {
  return { id: uuid(), name, foodTypes, latitude, longitude, menu };
};
