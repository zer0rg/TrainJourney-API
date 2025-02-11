import { Optional,Model, Association } from 'sequelize'
import { EntityIntf, FoodType, GenderType, ReservationIntf, ServiceIntf, ReservationType, StudentIntf, TrainerIntf, FoodIntf, RecetsIntf, NutritionalPlanIntf, ExerciseIntf, TrainmentIntf, ExercisePlanIntf, DailyPlanIntf, PlanificationIntf, ClientPlanificationIntf, FoodRecetsIntf, DailyPlanJunctionIntf, UserType } from '../types'


interface EntityCreationAttributes extends Optional<EntityIntf, 'id'>{}

export class Entity extends Model<EntityIntf, EntityCreationAttributes> implements EntityIntf{
  declare id: number
  declare name: string
  declare defaultTrainerId: number
  declare excersiseTags: string[]
  declare uuid: string
}

interface TrainerCreationAttributes extends Optional<TrainerIntf, 'id'> {}

export class Trainer extends Model<TrainerIntf, TrainerCreationAttributes> implements TrainerIntf {
  declare id: number
  declare excersiseTags?: string[] | undefined
  declare resetPassword: boolean
  declare isAdmin: boolean
  declare role?: UserType | undefined
  declare uuid: string
  declare name: string
  declare lastName: string
  declare email: string
  declare phone: string
  declare password: string
  declare specializations: string
  declare entityId: number
  declare dailyPlans?: DailyPlanIntf[]

  
}

interface StudentCreationAttributes extends Optional<StudentIntf, 'id'> {}

export class Student extends Model<StudentIntf, StudentCreationAttributes> implements StudentIntf {
  declare id: number
  declare uuid: string
  declare name: string
  declare email: string
  declare lastName: string
  declare phone: string
  declare password: string
  declare enrollmentDate: Date
  declare interests: string
  declare gender: GenderType
  declare weight: number
  declare height: number
  declare weightGoal: number
  declare trainerId: number
}

interface ServiceCreationAttributes extends Optional<ServiceIntf, 'id'> {}

export class Service extends Model<ServiceIntf, ServiceCreationAttributes> implements ServiceIntf {
  declare id: number
  declare trainerId: number
  declare entityId: number
  declare onlinePrice: number
  declare onsitePrice: number
  declare name: string
  declare description: string
}

interface ReservationCreationAttributes extends Optional<ReservationIntf, 'id'> {}

export class Reservation extends Model<ReservationIntf, ReservationCreationAttributes> implements ReservationIntf {
  declare id: number
  declare trainerId: number
  declare studentId: number
  declare serviceId: number
  declare type: ReservationType
  declare limit: number
  declare date: Date
  declare timeSlot: string
}

// Models for Nutritional Plans
interface RecetsCreationAttributes extends Optional<RecetsIntf, 'id'> {}
interface FoodCreationAttributes extends Optional<FoodIntf, 'id'> {}
interface FoodRecetsCreationAttributes extends Optional<FoodRecetsIntf, 'id'> {}
interface NutritionalPlanCreationAttributes extends Optional<NutritionalPlanIntf, 'id'> {}

export class Recets extends Model<RecetsIntf, RecetsCreationAttributes> implements RecetsIntf {
  declare id: number
  declare name: string
  declare trainerId: number
  declare description: string 
  declare entityId: number
  declare proteins: number
  declare kcal: number
  declare videoUrl: string
}

export class Food extends Model<FoodIntf, FoodCreationAttributes> implements FoodIntf {
  declare id: number
  declare entityId: number
  declare trainerId: number
  declare extras: string[]
  declare name: string
  declare proteins_100: number
  declare kcal_100: number
  declare fats_100: number
  declare fiber_100: number
  declare carbohydrates_100: number
  declare proteins_u: number
  declare kcal_u: number
  declare fats_u: number
  declare fiber_u: number
  declare carbohydrates_u: number
  declare imgUrl: string
}
export class FoodRecets extends Model<FoodRecetsIntf, FoodRecetsCreationAttributes> implements FoodRecetsIntf {
  declare id: number
  declare type: FoodType
  declare foodId: number
  declare recetsId: number
  declare nutritionalPlanId: number
}
export class NutritionalPlan extends Model<NutritionalPlanIntf, NutritionalPlanCreationAttributes> implements NutritionalPlanIntf {
  declare id: number
  declare trainerId: number
  declare name: string
  declare description: string
}

// Modelos destinados a Planes de Entrenamiento
interface ExerciseCreationAttributes extends Optional<ExerciseIntf, 'id'> {}
interface TrainmentCreationAttributes extends Optional<TrainmentIntf, 'id'> {}
interface ExercisePlanCreationAttributes extends Optional<ExercisePlanIntf, 'id'> {}

export class Exercise extends Model<ExerciseIntf, ExerciseCreationAttributes> implements ExerciseIntf{
  declare imgUrl: string
  declare muscle_principal: string
  declare equipment: string
  declare movement: string
  declare level: string
  declare speciality: string
  declare mecanic: string
  declare id: number
  declare trainerId: number
  declare name: string
  declare description: string
  declare videoUrl: string
  declare exercisePlans: ExercisePlan[]
}

export class Trainment extends Model<TrainmentIntf, TrainmentCreationAttributes> implements TrainmentIntf{
  declare id: number
  declare entityId: number
  declare name: string
  declare description: string
}

export class ExercisePlan extends Model<ExercisePlanIntf, ExercisePlanCreationAttributes> implements ExercisePlanIntf{
  declare id: number
  declare name: string
  declare exerciseId: number
  declare trainmentId: number
  declare trainerId: number
  declare repetitions: number
  declare series: number
  declare weight: number
  declare break: number
}

interface DailyPlanCreationAttributes extends Optional<DailyPlanIntf, 'id'> {}
interface DailyPlanJunctionCreationAttributes extends Optional<DailyPlanJunctionIntf, 'id'> {}
interface PlanificationCreationAttributes extends Optional<PlanificationIntf, 'id'> {}
interface ClientPlanificationCreationAttributes extends Optional<ClientPlanificationIntf, 'id'> {}

export class DailyPlanJunction extends Model<DailyPlanJunctionIntf, DailyPlanJunctionCreationAttributes> implements DailyPlanJunctionIntf{
  declare id: number
  declare trainmentId: number
  declare dailyPlanId: number
}

export class DailyPlan extends Model<DailyPlanIntf, DailyPlanCreationAttributes> implements DailyPlanIntf{
  declare id: number
  declare trainerId: number
  declare name: string
  declare description: string
  declare nutritionalPlanId: number
  declare dayn: number
  declare planificationId: number
  declare trainments?: Trainment[]
  
  public static associations: {
    trainments: Association<DailyPlan, Trainment>;
  }
}

export class Planification extends Model<PlanificationIntf, PlanificationCreationAttributes> implements PlanificationIntf{
  declare id: number
  declare name: string
  declare description: string
  declare weeks: number
  declare trainerId: number
}

export class ClientPlanification extends Model<ClientPlanificationIntf, ClientPlanificationCreationAttributes> implements ClientPlanificationIntf{
  declare id: number
  declare clienteId: number
  declare planificationId: number
  declare dateStart: Date
  declare studentId: number
}