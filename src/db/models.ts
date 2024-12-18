import { Optional,Model } from 'sequelize'
import { EntityIntf, FoodType, GenderType, ReservationIntf, ReservationType, StudentIntf, TrainerIntf, FoodIntf, RecetsIntf, NutritionalPlanIntf, ExerciseIntf, TrainmentIntf, ExercisePlanIntf, DailyPlanIntf, PlanificationIntf, ClientPlanificationIntf, FoodRecetsIntf, DailyPlanJunctionIntf } from '../types'


interface EntityCreationAttributes extends Optional<EntityIntf, 'id'>{}

export class Entity extends Model<EntityIntf, EntityCreationAttributes> implements EntityIntf{
  public id!: number
  public name!: string
}

interface TrainerCreationAttributes extends Optional<TrainerIntf, 'id'> {}

export class Trainer extends Model<TrainerIntf, TrainerCreationAttributes> implements TrainerIntf {
  public id!: number
  public name!: string
  public lastName!: string
  public email!: string
  public phone!: string
  public password!: string
  public specializations!: string
  public entityId!: number
  
}

interface StudentCreationAttributes extends Optional<StudentIntf, 'id'> {}

export class Student extends Model<StudentIntf, StudentCreationAttributes> implements StudentIntf {
  public id!: number
  public name!: string
  public email!: string
  public lastName!: string
  public phone!: string
  public password!: string
  public course!: string
  public enrollmentDate!: Date
  public interests!: string
  public gender!: GenderType
  public weight!: number
  public height!: number
  public weightGoal!: number
  public trainerId!: number
}

interface ReservationCreationAttributes extends Optional<ReservationIntf, 'id'> {}

export class Reservation extends Model<ReservationIntf, ReservationCreationAttributes> implements ReservationIntf {
  public id!: number
  public trainerId!: number
  public studentId!: number
  public serviceId!: number
  public type!: ReservationType
  public limit!: number
  public date!: Date
  public timeSlot!: string
}


// Models for Nutritional Plans
interface RecetsCreationAttributes extends Optional<RecetsIntf, 'id'> {}
interface FoodCreationAttributes extends Optional<FoodIntf, 'id'> {}
interface FoodRecetsCreationAttributes extends Optional<FoodRecetsIntf, 'id'> {}
interface NutritionalPlanCreationAttributes extends Optional<NutritionalPlanIntf, 'id'> {}

export class Recets extends Model<RecetsIntf, RecetsCreationAttributes> implements RecetsIntf {
  public id!: number
  public name!: string
  public description!: string 
  public entityId!: number
  public proteins!: number
  public kcal!: number
  public videoUrl!: string
}

export class Food extends Model<FoodIntf, FoodCreationAttributes> implements FoodIntf {
  public id!: number
  public type!: FoodType
  public nombre!: string
  public entityId!: number
  public extras!: string[]
  public proteins!: number
  public kcal!: number
  public fats!: number
  public carbohydrates!: number
  public videoUrl!: string
}
export class FoodRecets extends Model<FoodRecetsIntf, FoodRecetsCreationAttributes> implements FoodRecetsIntf {
  public id!: number
  public foodId!: number
  public recetsId!: number
  public nutritionalPlanId!: number
}
export class NutritionalPlan extends Model<NutritionalPlanIntf, NutritionalPlanCreationAttributes> implements NutritionalPlanIntf {
  public id!: number
  public trainerId!: number
  public name!: string
}

// Modelos destinados a Planes de Entrenamiento
interface ExerciseCreationAttributes extends Optional<ExerciseIntf, 'id'> {}
interface TrainmentCreationAttributes extends Optional<TrainerIntf, 'id'> {}
interface ExercisePlanCreationAttributes extends Optional<ExercisePlanIntf, 'id'> {}

export class Exercise extends Model<ExerciseIntf, ExerciseCreationAttributes> implements ExerciseIntf{
  public id!: number
  public entityId!: number
  public name!: string
  public description!: string
  public videoUrl!: string
}

export class Trainment extends Model<TrainmentIntf, TrainmentCreationAttributes> implements TrainmentIntf{
  public id!: number
  public entityId!: number
  public name!: string
  public description!: string
}

export class ExercisePlan extends Model<ExercisePlanIntf, ExercisePlanCreationAttributes> implements ExercisePlanIntf{
  public id!: number
  public name!: string
  public exerciseId!: number
  public trainmentId!: number
  public trainerId!: number
  public repetitions!: number
  public series!: number
  public weight!: number
  public break!: number
}

interface DailyPlanCreationAttributes extends Optional<DailyPlanIntf, 'id'> {}
interface DailyPlanJunctionCreationAttributes extends Optional<DailyPlanJunctionIntf, 'id'> {}
interface PlanificationCreationAttributes extends Optional<PlanificationIntf, 'id'> {}
interface ClientPlanificationCreationAttributes extends Optional<ClientPlanificationIntf, 'id'> {}

export class DailyPlanJunction extends Model<DailyPlanJunctionIntf, DailyPlanJunctionCreationAttributes> implements DailyPlanJunctionIntf{
  public id!: number
  public trainmentId!: number
  public dailyPlanId!: number
}

export class DailyPlan extends Model<DailyPlanIntf, DailyPlanCreationAttributes> implements DailyPlanIntf{
  public id!: number
  public trainerId!: number
  public name!: string
  public description!: string
  public nutritionalPlanId!: number
  public dayn!: number
  public planificationId!: number
}

export class Planification extends Model<PlanificationIntf, PlanificationCreationAttributes> implements PlanificationIntf{
  public id!: number
  public name!: string
  public description!: string
  public weeks!: number
  public trainerId!: number
}

export class ClientPlanification extends Model<ClientPlanificationIntf, ClientPlanificationCreationAttributes> implements ClientPlanificationIntf{
  public id!: number
  public clienteId!: number
  public planificationId!: number
  public dateStart!: Date
}