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
  password: string;
  phone: string;
}

export interface TrainerIntf extends UserIntf {
  specializations: string[]; // Campo específico para entrenadores
  entityId: number;
}

export interface StudentIntf extends UserIntf {
  course: string; // Campo adicional para estudiantes
  enrollmentDate: Date; // Otro campo específico
  interests: string[];
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
  date: Date;
  timeSlot: string;
  limit: number;
}

// Modelos destinados a Planes de Entrenamiento
export interface ExerciseIntf{
  id: number;
  entityId: number;
  name: string;
  description: string;
  videoUrl: string;
}

export interface TrainmentIntf{
  id: number;
  entityId: number;
  name: string;
  description: string;
  exccersisePlansId: number[];
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
}

export interface DailyPlanIntf{
  id: number;
  trainerId: number;
  name: string;
  description: string;
  nutritionalPlanId: number;
  trainmentsId: number;
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
  dateStart: Date;
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
  recetsId: number[];
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
  recetsFoodsId: number[];
  name: string;
}