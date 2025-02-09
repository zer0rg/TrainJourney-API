import { CreateDailyPlanParams, DailyPlanIntf, QueryResponse, UpdateDailyPlanParams } from '../types'
import { sequelizeErrorHandler } from '../utils/errorHanlder'
import { Trainer, DailyPlan, Trainment, DailyPlanJunction } from './models'
import { sequelize } from './connector'
import { Transaction } from 'sequelize'
import { numberNotNull, stringNotNull } from '../utils/utils'
export async function getDailyPlansByTrainer(trainerUuid: string): Promise<QueryResponse> {
	try {
		const trainer = await Trainer.findOne({
			where: { uuid: trainerUuid },
			include: [{
				model: DailyPlan,
				as: 'dailyPlans',
				include: [{
					model: Trainment,
					as: 'trainments',
					through: { attributes: [] },
					required: false // Si quieres incluir planes sin entrenamientos
				}]
			}],
			nest: true,
			raw: false
		})

		if (!trainer?.dailyPlans?.length) {
			return { done: false, msg: 'No se encontraron planes diarios', data: null }
		}

		/* REVISAR ANTES DE DESCOMENTAR
		const result = trainer.dailyPlans.map(plan => ({
				...plan.get({ plain: true }),
				trainments: plan.trainments || []
		})) */

		return { done: true, data: trainer.dailyPlans, msg: 'Planes encontrados' }
	} catch (error) {
		const sequelize = sequelizeErrorHandler(error)
		if (sequelize !== false)
			return { done: false, msg: sequelize.output, data: null }
		console.error('UNHANDLED ERROR: ' + error)
		return { done: false, msg: 'Servicio inaccesible, inténtalo más tarde.', data: null }

	}
}

export async function createDailyPlan(params: CreateDailyPlanParams): Promise<QueryResponse> {
	const transaction = await sequelize.transaction()

	try {
		const validation = validateCreateDailyPlanParams(params)
		if (typeof validation !== 'boolean') {
			return { done: false, msg: validation, data: null }
		}
		const dailyPlan = await DailyPlan.create({
			trainerId: params.trainerId,
			name: params.name,
			description: params.description,
			dayn: params.dayn,
			nutritionalPlanId: params.nutritionalPlanId ? params.nutritionalPlanId : null,
			planificationId: params.planificationId
		}, { transaction })

		if (params.trainmentIds.length > 0)
			await createDailyPlanJunction(params.trainmentIds, dailyPlan.id, transaction)

		await transaction.commit()

		const createdPlan = await DailyPlan.findByPk(dailyPlan.id, {
			include: [{
				model: Trainment,
				as: 'trainments',
				through: { attributes: [] }
			}]
		})

		return {
			done: true,
			data: createdPlan,
			msg: 'Plan diario creado exitosamente'
		}
	} catch (error) {
		await transaction.rollback()
		const sequelizeError = sequelizeErrorHandler(error)
		if (sequelizeError !== false)
			return { done: false, msg: sequelizeError?.output || 'Error al crear el plan diario', data: null }
		return { done: false, msg: 'Servicio inaccesible intentalo más tarde', data: null }
	}
}

export async function updateDailyPlan(params: UpdateDailyPlanParams): Promise<QueryResponse> {
	const transaction = await sequelize.transaction()

	try {
		const dailyPlan = await DailyPlan.findByPk(params.id, {
			include: [{
				model: Trainment,
				as: 'trainments',
				through: { attributes: [] }
			}],
			transaction
		})

		if (!dailyPlan) {
			await transaction.rollback()
			return { done: false, msg: 'Plan diario no encontrado', data: null }
		}

		const updateData: Partial<UpdateDailyPlanParams> = { ...params }
		delete updateData.trainmentIds 

		await dailyPlan.update(updateData, { transaction })

		if (params.trainmentIds) {
			const existingTrainmentIds = dailyPlan.trainments?.map(t => t.id) || []

			const trainmentsToAdd = params.trainmentIds.filter(id => !existingTrainmentIds.includes(id))
			const trainmentsToRemove = existingTrainmentIds.filter(id => !params.trainmentIds.includes(id))

			if (trainmentsToRemove.length > 0) {
				deleteDailyPlanJunction(trainmentsToRemove, params.id, transaction)
			}

			if (trainmentsToAdd.length > 0) {
				createDailyPlanJunction(trainmentsToAdd, params.id, transaction)
			}
		}

		await transaction.commit()

		const updatedPlan = await DailyPlan.findByPk(params.id, {
			include: [{
				model: Trainment,
				as: 'trainments',
				through: { attributes: [] }
			}]
		})

		return {
			done: true,
			data: updatedPlan,
			msg: 'Plan diario actualizado exitosamente'
		}

	} catch (error) {
		await transaction.rollback()
		const sequelizeError = sequelizeErrorHandler(error)
		if(typeof sequelizeError !== 'boolean')
			return {
				done: false,
				msg: sequelizeError.output,
				data: null
			}
		return {
			done: false,
			msg: 'El servicio no está disponible, inténtalo más tarde',
			data: null
		}
	}
}

export async function createDailyPlanJunction(trainmentIds: number[], dailyPlanId: number, transaction: Transaction | null) {
	const junctionRecords = trainmentIds.map(trainmentId => ({
		dailyPlanId: dailyPlanId,
		trainmentId: trainmentId
	}))
	if (transaction)
		await DailyPlanJunction.bulkCreate(junctionRecords, { transaction })
	else
		await DailyPlanJunction.bulkCreate(junctionRecords)

}

export async function deleteDailyPlanJunction(trainmentsToRemove: number[], dailyPlanId: number, transaction: Transaction | null) {
	if (transaction)
		await DailyPlanJunction.destroy({
			where: {
				dailyPlanId,
				trainmentId: trainmentsToRemove
			},
			transaction
		})
	else 
		await DailyPlanJunction.destroy({
			where: {
				dailyPlanId,
				trainmentId: trainmentsToRemove
			}
		})
}

function validateCreateDailyPlanParams(params: CreateDailyPlanParams): boolean | string {
	if (!numberNotNull(params.trainerId))
		return 'No se ha seleccionado un entrenador'
	if (!stringNotNull(params.name))
		return 'El nombre del plan es requerido'
	return true
}

