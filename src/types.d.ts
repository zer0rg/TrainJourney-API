import { Trainer, Student } from './db/models'

// [DATA STRUCTS AND DATATYPES]
export type UserType = 'trainer' | 'student';
export type GenderType = 'male' | 'female' | 'non-binary'
export type ReservationType = 'online' | 'onsite' | 'hybrid'
export type FoodType = 'breakfast' | 'lunch' | 'dinner'



export interface EntityIntf{
  id: number;
  name: string;
}

export interface UserIntf {
  id: number;
  name: string;
  lastName: string;
  email: string;
  role?: UserType;
  password: string;
  phone: string;
}

export interface TrainerIntf extends UserIntf {
  specializations: string; // Campo específico para entrenadores
  entityId: number;
}

export interface StudentIntf extends UserIntf {
  enrollmentDate: string; 
  interests: string;
  gender: GenderType;
  weight: number; 
  height: number;
  weightGoal: number;
  trainerId: number;
}

// Modelo de Reservas (Reservations)
export interface ReservationIntf{
  id: number;
  type: ReservationType
  trainerId: number;
  studentId: number;
  serviceId: number;
  date: string;
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
}

export interface TrainmentIntf{
  id: number;
  entityId: number;
  name: string;
  description: string;
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
  trainmentId: number;
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
  nutritionalPlanId: number;
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
  clienteId: number;
  planificationId: number;
  dateStart: string;
}
// Modelos destinados a Planes Nutricionales
export interface RecetsIntf{
  id: number;
  name: string;
  entityId: number;
  description: string;
  proteins: number;
  kcal: number;
  videoUrl: string;
}

export interface FoodRecetsIntf{
  id: number;
  foodId: number;
  recetsId: number;
  nutritionalPlanId: number;
}

export interface FoodIntf{
  id: number;
  type: FoodType;
  nombre: string;
  entityId: number;
  extras: string[];
  proteins: number;
  kcal: number;
  fats: number;
  carbohydrates: number;
  videoUrl: string;
}

export interface NutritionalPlanIntf{
  id: number;
  trainerId: number;
  name: string;
}


//[REQUEST TYPES AND INTERFACES]

export type RequestResult = 'OK' | 'KO'
export interface LoginResponse {
  res: RequestResult
  msg: string,
  data: TrainerIntf | StudentIntf | null
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
