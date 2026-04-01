import { Dish, dishes, MealTime, Weather, Budget, DishSource } from '@/data/dishes';

function getCurrentMealTime(): MealTime {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 10) return 'sáng';
  if (hour >= 10 && hour < 15) return 'trưa';
  return 'tối';
}

export interface SuggestOptions {
  mealTime?: MealTime;
  weather?: Weather;
  budget?: Budget;
  kidFriendly?: boolean;
  source?: DishSource;
  excludeIds?: string[];
  ingredients?: string[];
}

function scoreDish(dish: Dish, options: SuggestOptions): number {
  let score = 0;
  const mealTime = options.mealTime || getCurrentMealTime();

  // Must match meal time
  if (!dish.mealTime.includes(mealTime)) return -1;

  // Must match source filter if set
  if (options.source && dish.source !== options.source) return -1;

  // Must match budget if set
  if (options.budget && dish.budget !== options.budget) return -1;

  // Must be kid friendly if required
  if (options.kidFriendly && !dish.kidFriendly) return -1;

  // Exclude specific IDs
  if (options.excludeIds?.includes(dish.id)) return -1;

  // Weather bonus
  if (options.weather && dish.weather.includes(options.weather)) {
    score += 3;
  }

  // Ingredient matching
  if (options.ingredients && options.ingredients.length > 0) {
    const matched = dish.ingredients.filter((ing) =>
      options.ingredients!.some(
        (userIng) => ing.toLowerCase().includes(userIng.toLowerCase()) || userIng.toLowerCase().includes(ing.toLowerCase())
      )
    );
    if (matched.length === 0 && dish.ingredients.length > 0) return -1;
    score += matched.length * 5;
  }

  // Tag bonuses
  if (dish.tags.includes('gia-đình')) score += 2;
  if (dish.tags.includes('ngon')) score += 1;

  // Add randomness to keep suggestions fresh
  score += Math.random() * 4;

  return score;
}

export function suggestDishes(options: SuggestOptions = {}, count: number = 3): Dish[] {
  const scored = dishes
    .map((dish) => ({ dish, score: scoreDish(dish, options) }))
    .filter((s) => s.score >= 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map((s) => s.dish);
}

export function randomDish(options: SuggestOptions = {}): Dish {
  const mealTime = options.mealTime || getCurrentMealTime();
  const eligible = dishes.filter((d) => d.mealTime.includes(mealTime));
  return eligible[Math.floor(Math.random() * eligible.length)];
}

export function suggestByIngredients(ingredients: string[]): Dish[] {
  if (ingredients.length === 0) return [];

  return dishes
    .map((dish) => {
      if (dish.ingredients.length === 0) return { dish, matched: 0 };
      const matched = dish.ingredients.filter((ing) =>
        ingredients.some(
          (userIng) => ing.toLowerCase().includes(userIng.toLowerCase()) || userIng.toLowerCase().includes(ing.toLowerCase())
        )
      );
      return { dish, matched: matched.length };
    })
    .filter((s) => s.matched > 0)
    .sort((a, b) => b.matched - a.matched)
    .slice(0, 6)
    .map((s) => s.dish);
}

export function suggestBreakfast(): { home: Dish[]; outside: Dish[]; store: Dish[] } {
  const breakfastDishes = dishes.filter((d) => d.mealTime.includes('sáng'));

  const shuffle = <T>(arr: T[]): T[] => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return {
    home: shuffle(breakfastDishes.filter((d) => d.source === 'nấu-tại-nhà')).slice(0, 3),
    outside: shuffle(breakfastDishes.filter((d) => d.source === 'mua-ngoài')).slice(0, 3),
    store: shuffle(breakfastDishes.filter((d) => d.source === 'cửa-hàng-tiện-lợi')).slice(0, 3),
  };
}

export { getCurrentMealTime };
