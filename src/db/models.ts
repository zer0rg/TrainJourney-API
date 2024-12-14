import { Optional,Model } from 'sequelize'
import { EntityIntf, FoodType, GenderType, ReservationIntf, ReservationType, StudentIntf, TrainerIntf, FoodIntf, RecetsIntf, NutritionalPlanIntf, ExcersiseIntf, TrainmentIntf, ExercisePlanIntf } from '../types'


interface EntityCreationAttributes extends Optional<EntityIntf, 'id'>{}

export class Entity extends Model<EntityIntf, EntityCreationAttributes> implements EntityIntf{
  public id!: string
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
  public specializations!: string[]
  public entity!: string
  
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
  public interests!: string[]
  public gender!: GenderType
  public weight!: number
  public height!: number
  public weightGoal!: number
  public trainerid!: number
}

interface ReservationCreationAttributes extends Optional<ReservationIntf, 'id'> {}

export class Reservation extends Model<ReservationIntf, ReservationCreationAttributes> implements ReservationIntf {
  public id!: number
  public trainerId!: string
  public studentId!: string
  public serviceId!: string
  public type!: ReservationType
  public limit!: number
  public date!: Date
  public timeSlot!: string
}


// Models for Nutritional Plans
interface RecetsCreationAttributes extends Optional<RecetsIntf, 'id'> {}
interface FoodCreationAttributes extends Optional<FoodIntf, 'id'> {}
interface NutritionalPlanCreationAttributes extends Optional<NutritionalPlanIntf, 'id'> {}

export class Recets extends Model<RecetsIntf, RecetsCreationAttributes> implements RecetsIntf {
  public id!: string
  public name!: string
  public description!: string //REVISAR
  public proteins!: number
  public kcal!: number
  public videoUrl!: string
}

export class Food extends Model<FoodIntf, FoodCreationAttributes> implements FoodIntf {
  public id!: string
  public type!: FoodType
  public nombre!: string //REVISAR
  public recets!: string[]
  public extras!: string[]
  public proteins!: number
  public kcal!: number
  public fats!: number
  public carbohydrates!: number
  public videoUrl!: string
}

export class NutritionalPlan extends Model<NutritionalPlanIntf, NutritionalPlanCreationAttributes> implements NutritionalPlanIntf {
  public id!: string
  public trainerId!: string
  public foods!: string[]
  public name!: string
}

// Modelos destinados a Planes de Entrenamiento
interface ExcersiseCreationAttributes extends Optional<ExcersiseIntf, 'id'> {}interface TrainmentCreationAttributes extends Optional<TrainerIntf, 'id'> {}interface ExercisePlanCreationAttributes extends Optional<ExercisePlanIntf, 'id'> {}

export class Excersise extends Model<ExcersiseIntf, ExcersiseCreationAttributes> implements ExcersiseIntf{
  public id!: string
  public trainerId!: string
  public name!: string
  public description!: string
  public videoUrl!: string
}

export class Trainment extends Model<TrainmentIntf, TrainmentCreationAttributes> implements TrainmentIntf{
  public id!: string
  public trainerId!: string
  public name!: string
  public description!: string
  public excersisesPlans!: string[]
}

export class ExercisePlan extends Model<ExercisePlanIntf, ExercisePlanCreationAttributes> implements ExercisePlanIntf{
  public id!: string
  public name!: string
  public exerciseId!: string
  public repetitions!: number
  public series!: number
  public weight!: number
  public break!: number
}