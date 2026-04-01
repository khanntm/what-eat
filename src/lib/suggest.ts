import { Dish, DishType, dishes, MealTime, Weather, Budget, DishSource } from '@/data/dishes';

// Match whole words only to avoid "cá" matching "các" in "rau các loại"
function ingredientMatches(ingredient: string, userInput: string): boolean {
  const ing = ingredient.toLowerCase().trim();
  const input = userInput.toLowerCase().trim();
  if (ing === input) return true;
  const words = ing.split(/\s+/);
  if (words.some((w) => w === input)) return true;
  const inputWords = input.split(/\s+/);
  if (inputWords.some((w) => w === ing)) return true;
  if (input.length > 2 && ing.startsWith(input)) return true;
  if (ing.length > 2 && input.startsWith(ing)) return true;
  return false;
}

function shuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

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
  vegetarian?: boolean;
}

function getEligible(mealTime: MealTime, dishType?: DishType, source?: DishSource, vegetarian?: boolean): Dish[] {
  return dishes.filter((d) => {
    if (!d.mealTime.includes(mealTime)) return false;
    if (dishType && d.dishType !== dishType) return false;
    if (source && d.source !== source) return false;
    if (vegetarian && !d.vegetarian) return false;
    return true;
  });
}

function pickRandom(arr: Dish[], count: number = 1): Dish[] {
  return shuffle(arr).slice(0, count);
}

// ===== COMBO BỮA CƠM: món mặn + rau + canh =====
export interface MealCombo {
  monMan: Dish;
  rau: Dish;
  canh: Dish;
}

export function suggestMealCombo(options: SuggestOptions = {}): MealCombo {
  const mealTime = options.mealTime || getCurrentMealTime();
  const veg = options.vegetarian;

  const monManList = getEligible(mealTime, 'món-mặn', 'nấu-tại-nhà', veg);
  const rauList = getEligible(mealTime, 'rau', 'nấu-tại-nhà', veg);
  const canhList = getEligible(mealTime, 'canh', 'nấu-tại-nhà', veg);

  return {
    monMan: pickRandom(monManList)[0],
    rau: pickRandom(rauList)[0],
    canh: pickRandom(canhList)[0],
  };
}

export function suggestMealCombos(options: SuggestOptions = {}, count: number = 2): MealCombo[] {
  const combos: MealCombo[] = [];
  const usedMonMan = new Set<string>();
  const veg = options.vegetarian;
  for (let i = 0; i < count; i++) {
    const mealTime = options.mealTime || getCurrentMealTime();
    const monManList = getEligible(mealTime, 'món-mặn', 'nấu-tại-nhà', veg).filter((d) => !usedMonMan.has(d.id));
    const rauList = getEligible(mealTime, 'rau', 'nấu-tại-nhà', veg);
    const canhList = getEligible(mealTime, 'canh', 'nấu-tại-nhà', veg);

    if (monManList.length === 0 || rauList.length === 0 || canhList.length === 0) break;
    const monMan = pickRandom(monManList)[0];
    usedMonMan.add(monMan.id);
    combos.push({
      monMan,
      rau: pickRandom(rauList)[0],
      canh: pickRandom(canhList)[0],
    });
  }
  return combos;
}

// ===== MÓN CHÍNH (1 món trọn bữa) =====
export function suggestMainDishes(options: SuggestOptions = {}, count: number = 3): Dish[] {
  const mealTime = options.mealTime || getCurrentMealTime();
  const eligible = getEligible(mealTime, 'món-chính', undefined, options.vegetarian);
  return pickRandom(eligible, count);
}

// ===== RANDOM =====
export function randomDish(options: SuggestOptions = {}): Dish {
  const mealTime = options.mealTime || getCurrentMealTime();
  let eligible = dishes.filter((d) => d.mealTime.includes(mealTime));
  if (options.vegetarian) eligible = eligible.filter((d) => d.vegetarian);
  return eligible[Math.floor(Math.random() * eligible.length)];
}

// ===== INGREDIENT-BASED =====
export function suggestByIngredients(ingredients: string[]): Dish[] {
  if (ingredients.length === 0) return [];

  return dishes
    .map((dish) => {
      if (dish.ingredients.length === 0) return { dish, matched: 0 };
      const matched = dish.ingredients.filter((ing) =>
        ingredients.some((userIng) => ingredientMatches(ing, userIng))
      );
      return { dish, matched: matched.length };
    })
    .filter((s) => s.matched > 0)
    .sort((a, b) => b.matched - a.matched)
    .slice(0, 8)
    .map((s) => s.dish);
}

// ===== BREAKFAST =====
export function suggestBreakfast(): { home: Dish[]; outside: Dish[]; store: Dish[] } {
  const breakfastDishes = dishes.filter((d) => d.mealTime.includes('sáng'));

  return {
    home: shuffle(breakfastDishes.filter((d) => d.source === 'nấu-tại-nhà')).slice(0, 3),
    outside: shuffle(breakfastDishes.filter((d) => d.source === 'mua-ngoài')).slice(0, 3),
    store: shuffle(breakfastDishes.filter((d) => d.source === 'cửa-hàng-tiện-lợi')).slice(0, 3),
  };
}

// ===== VOTING =====
export function suggestForVoting(options: SuggestOptions = {}, count: number = 4): Dish[] {
  const mealTime = options.mealTime || getCurrentMealTime();
  if (mealTime === 'sáng') {
    return pickRandom(getEligible(mealTime), count);
  }
  // For lunch/dinner: mix món chính + combo ideas
  const mainDishes = pickRandom(getEligible(mealTime, 'món-chính'), 2);
  const monMan = pickRandom(getEligible(mealTime, 'món-mặn', 'nấu-tại-nhà'), 2);
  return [...mainDishes, ...monMan].slice(0, count);
}

export { getCurrentMealTime };
