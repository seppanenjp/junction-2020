import { Restaurant } from "../entities/restaurant"

import { v4 as uuid } from 'uuid';

export const generateRestaurant = (name, foodTypes, latitude, longitude, menu):Restaurant => {
    return {id: uuid(), name, foodTypes, latitude, longitude, menu}
}