import { Trainer, Student } from './db/models'

// [DATA STRUCTS AND DATATYPES]
export type UserType = 'trainer' | 'student';
export type GenderType = 'male' | 'female' | 'non-binary'
export type ReservationType = 'online' | 'onsite' | 'hybrid'
export type FoodType = 'breakfast' | 'lunch' | 'dinner'



export interface EntityIntf{
  id: number;
  name: string;
  uuid: string;
  excersiseTags: string [];
}

export interface UserIntf {
  id: number;
  name: string;
  lastName: string;
  email: string;
  role?: UserType;
  password: string;
  phone: string;
  uuid: string;
}

export interface TrainerIntf extends UserIntf {
  specializations: string; // Campo específico para entrenadores
  entityId: number;
  dailyPlans?: DailyPlanIntf[];
  excersiseTags?: string [];
}

export interface StudentIntf extends UserIntf {
  enrollmentDate: Date; 
  interests: string;
  gender: GenderType;
  weight: number; 
  height: number;
  weightGoal: number;
  trainerId: number;
}
export interface ServiceIntf {
  id: number;
  name: string;
  description: string;
  trainerId: number;
  entityId: number;
  onlinePrice: number;
  onsitePrice: number;

}
export interface ServiceOptionalIntf {
  id: number;
  name?: string;
  description?: string;
  trainerId?: number;
  entityId?: number;
  onlinePrice?: number;
  onsitePrice?: number;

}
// Modelo de Reservas (Reservations)
export interface ReservationIntf{
  id: number;
  type: ReservationType
  trainerId: number;
  studentId: number;
  serviceId: number;
  date: Date;
  timeSlot: string;
  limit: number;
}

// Modelos destinados a Planes de Entrenamiento
export interface ExerciseIntf{
  id: number;
  entityId: number;
  //trainerId: number;
  name: string;
  description: string;
  videoUrl: string;
  imgUrl: string;
  muscle_principal: string;
  equipment:string;
  movement: string;
  level: string;
  speciality: string;
  mecanic: string;
  // Necesario mis etiquetas custom
}

export interface TrainmentIntf{
  id?: number;
  entityId: number;
  name: string;
  description: string;
  exercisePlans?: ExercisePlanIntf[];
}

export interface ExercisePlanIntf{
  id: number;
  name: string;
  trainerId: number;
  exerciseId: number;
  repetitions: number;
  series: number;
  weight: number;
  break: number;
  trainmentId?: number | null;
}

export interface DailyPlanJunctionIntf{
  id: number;
  dailyPlanId: number;
  trainmentId: number;
}
export interface DailyPlanIntf{
  id: number;
  trainerId: number;
  name: string;
  description: string;
  dayn: number;
  nutritionalPlanId: number | null;
  planificationId: number;
}


export interface PlanificationIntf{
  id: number;
  name: string;
  description: string;
  weeks: number;
  trainerId: number;
}

export interface ClientPlanificationIntf{
  id: number;
  studentId: number;
  planificationId: number;
  dateStart: Date;
}
// Modelos destinados a Planes Nutricionales
export interface RecetsIntf{
  id: number;
  name: string;
  entityId: number;
  trainerId: number;
  description: string;
  proteins: number;
  kcal: number;
  videoUrl: string;
}

export interface FoodRecetsIntf{
  id: number;
  foodId: number;
  type: FoodType;
  recetsId: number;
  nutritionalPlanId: number;
}

export interface FoodIntf{
  id: ObjectId;
  name: string;
  entityId: number;
  extras: string[];
  proteins_100: number;
  kcal_100: number;
  fats_100: number;
  fiber_100: number;
  carbohydrates_100: number;
  proteins_u: number;
  kcal_u: number;
  fats_u: number;
  fiber_u: number;
  carbohydrates_u: number;
  imgUrl: string;
}

export interface OpenFoodRow {

}

export interface NutritionalPlanIntf{
  id: number;
  trainerId: number;
  name: string;
  description: string;
}


//[REQUEST TYPES AND INTERFACES]

interface CreateDailyPlanParams {
  trainerId: number;
  name: string;
  description: string;
  dayn: number;
  nutritionalPlanId: number | null;
  planificationId: number;
  trainmentIds: number[];
}

interface UpdateDailyPlanParams {
  id: number;
  named: string;
  description: string;
  dayn: number;
  nutritionalPlanId: number;
  planificationId: number;
  trainerId: number;
  trainmentIds: number[];
}

interface CreateTrainmentWithPlanParams extends TrainmentIntf{
  exercisePlans: ExercisePlanIntf[];
}


export type RequestResult = 'OK' | 'KO'

export interface QueryResponse {
  done: boolean,
  msg: string,
  data: TrainerIntf | StudentIntf | ReservationIntf | TrainmentIntf  | ServiceIntf | RecetsIntf | DailyPlanIntf | FoodIntf | number | null | TrainerIntf[] | StudentIntf[] | ReservationIntf[] | ServiceIntf[] | RecetsIntf[] | FoodIntf[] | DailyPlanIntf[] | TrainmentIntf[]
}



//[SECURITY TYPES AND INTERFACES]
export interface Loginfo {
  ip: string,
  uag: string,
  auth: boolean,
  city: string,
  country: string,
  deviceId: number,
  date: Date

}

export interface GeoInfo {
  query: string,
  status: 'success' | 'fail',
  message: string,
  country?: string,
  countryCode?: number,
  region?: string,
  regionName?: string,
  city?: string,
  zip?: string,
  lat ?: string,
  lon ?: string,
  timezone?: string,
  isp?: string,
  org?: string,
  as?: string}

export interface Devices {
  id: number,
  uag: string,
  city: string,
  country: string,
  resfeshToken: string

}

export interface Blacklisted {
  msg: string,
  data: Trainer | Student
}


