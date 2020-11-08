import { getCustomRepository } from 'typeorm';
import { FoodTypeRepository } from '../repositories/foodType';
import { RestaurantRepository } from '../repositories/restaurant';
import { generateRestaurant, generateFoodType } from './generate';

export const createPostgresData = async () => {
  const restaurantRepository: RestaurantRepository = getCustomRepository(
    RestaurantRepository
  );
  await restaurantRepository.save([
    generateRestaurant('Barbarossa', [1], 60.168265, 24.930987, 'Pizzaa'),
    generateRestaurant(
      'Singapore Hot Wok',
      [2],
      60.169161,
      24.933669,
      'Numero 1, Numero 2, Numero 3'
    ),
    generateRestaurant(
      'McDonalds',
      [3],
      60.169005,
      24.929982,
      'Big Mac & Cheesburger'
    ),
    generateRestaurant(
      'Noodle Master',
      [4],
      60.171396,
      24.926701,
      'Dan Dan noodles'
    ),
    generateRestaurant(
      'Classic Pizza Stockmann',
      [5],
      60.168415,
      24.942684,
      'Best Pizza in town'
    ),
    generateRestaurant(
      'Ravintola Paulette',
      [6],
      60.158708,
      24.945918,
      'French cuisine'
    )
  ]);

  const foodTypeRepository: FoodTypeRepository = getCustomRepository(
    FoodTypeRepository
  );
  await foodTypeRepository.save([
    generateFoodType(0, 'Pizza'),
    generateFoodType(1, 'Sushi'),
    generateFoodType(2, 'Thai'),
    generateFoodType(3, 'Chinese'),
    generateFoodType(4, 'Burger'),
    generateFoodType(5, 'Mexican'),
    generateFoodType(6, 'Italian'),
    generateFoodType(7, 'Salad'),
    generateFoodType(8, 'Nepalese'),
    generateFoodType(9, 'Healthy'),
    generateFoodType(10, 'Wings'),
    generateFoodType(11, 'Kebab'),
    generateFoodType(12, 'Sandwich'),
    generateFoodType(13, 'Taco'),
    generateFoodType(14, 'Vegetarian'),
    generateFoodType(15, 'Burrito'),
    generateFoodType(16, 'Indian'),
    generateFoodType(17, 'American'),
    generateFoodType(18, 'Ramen'),
    generateFoodType(19, 'Falafel')
  ]);
};
