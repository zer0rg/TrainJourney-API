import { Food } from './models'
import { FoodIntf, QueryResponse } from '../types'
import { Db } from 'mongodb'
import { mongoErrorHandler } from '../utils/errorHanlder'

export async function getFoodByName(name: string, mongoDb: Db): Promise<QueryResponse> {
  try {
	const foods = await mongoDb.collection('products').find({$text: { $search: 'macarrones' }}).toArray()
	const customFoods = foods.map((food) => (generateFood(food)))
	return {done: true, data:customFoods, msg: 'Se han encontrado los siguientes alimentos:'}

  } catch (error) {
	const mongoErr = mongoErrorHandler(error)
    if (mongoErr !== false) {
    	console.error('MONGO ERROR: ' + mongoErr.dbg)
    	return {done:false, msg:mongoErr.output, data: null}
    }
    console.error('UNHANDLED ERROR: ' + error)
    return {done:false, msg:'Se ha producido un error inesperado, intentalo de nuevo más tarde.', data: null}
  }
}

export async function getAllFoods(mongoDb: Db): Promise<QueryResponse> {
  try {
    const foods = await mongoDb.collection('products').find({ 
        nutriments: { $exists: true, $ne: null },
        'nutriments.salt_100g':{$exists: true, $ne: null},
        'nutriments.salt_unit':{$exists: true, $ne: null},
        'nutriments.carbohydrates_unit': {$exists: true, $ne: null},
        'nutriments.carbohydrates_100g': { $exists: true, $ne: null },
        'nutriments.energy_100g': { $exists: true, $ne: null },
        'nutriments.energy_unit': { $exists: true, $ne: null },
        'nutriments.fiber_100g': { $exists: true, $ne: null },
        'nutriments.fiber_unit': { $exists: true, $ne: null },
        'nutriments.fat_unit':{ $exists: true, $ne: null },
        'nutriments.fat_100g':{ $exists: true, $ne: null },
        countries: {$in: ['Spain']} })
		.toArray()

	const customFoods = foods.map((food) => (generateFood(food)))

  	return {done: true, data:customFoods, msg: 'Se han encontrado los siguientes alimentos:'}
  } catch (error) {
    const mongoErr = mongoErrorHandler(error)
    if (mongoErr !== false) {
      console.error('MONGO ERROR: ' + mongoErr.dbg)
      return {done:false, msg:mongoErr.output, data: null}
    }
    console.error('UNHANDLED ERROR: ' + error)
    return {done:false, msg:'Se ha producido un error inesperado, intentalo de nuevo más tarde.', data: null}
  }
}

function calculatePerServing(nutriments: any, servingSize: string) {
    if (!servingSize) return null

    const grams = parseFloat(servingSize)
    if (isNaN(grams)) return null

    return {
        energy: nutriments.energy_100g * (grams / 100),
        fat: nutriments.fat_100g * (grams / 100),
        carbohydrates: nutriments.carbohydrates_100g * (grams / 100),
        proteins: nutriments.proteins_100g * (grams / 100),
        fiber: nutriments.fiber_100g * (grams / 100),
    }
}
function extractServingSize(servingSize: string | undefined | null): number | null {
    if (!servingSize) return null // Si el campo no existe, retornar null

    const match = servingSize.match(/(?:\(|^)(\d+(\.\d+)?)\s*(g|ml|unit)(?:\))?/i)

    if (match) {
        return parseFloat(match[1]) 
    }

    return null 
}

function generateFood(food: any) : FoodIntf{
	const res : FoodIntf = {
		id: food._id,
		name: food.product_name,
		entityId: food.code,
		extras: food.ingredients_text.split(','),
		proteins_100: food.nutriments.proteins,
		kcal_100: food.nutriments.energy,
		carbohydrates_100: food.nutriments.carbohydrates,
		fats_100: food.nutriments.fat,
		fiber_100: food.nutriments.fiber,
		kcal_u: food.nutriments.energy,
		fats_u: food.nutriments.fat,
		fiber_u: food.nutriments.fiber,
		proteins_u: food.nutriments.proteins,
		carbohydrates_u: food.nutriments.carbohydrates,
		imgUrl: food.image_url
	}
	if (food.serving_size && food.serving_size != null && food.serving_size.toLowerCase().includes('ml')) {
		const perServing = calculatePerServing(food.nutriments, food.serving_size)
		if (perServing){
			res.kcal_u = perServing.energy
			res.fats_u = perServing.fat
			res.fiber_u = perServing.fiber
			res.proteins_u = perServing.proteins,
			res.carbohydrates_u = perServing.carbohydrates
		}
	}
	return res
}