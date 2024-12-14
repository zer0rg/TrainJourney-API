export type UserType = 'trainer' | 'student';
export type GenderType = 'male' | 'female' | 'non-binary'
export type ReservationType = 'online' | 'onsite' | 'hybrid'
export type FoodType = 'breakfast' | 'lunch' | 'dinner'

export interface EntityIntf{
  id: string;
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
  entity: string;
}

export interface StudentIntf extends UserIntf {
  course: string; // Campo adicional para estudiantes
  enrollmentDate: Date; // Otro campo específico
  interests: string[];
  gender: GenderType;
  weight: number; 
  height: number;
  weightGoal: number;
  trainerid: number;
}

// Modelo de Reservas (Reservations)
export interface ReservationIntf{
  id: number;
  type: ReservationType
  trainerId: string;
  studentId: string;
  serviceId: string;
  date: Date;
  timeSlot: string;
  limit: number;
}

// Modelos destinados a Planes de Entrenamiento
export interface ExcersiseIntf{
  id: string;
  trainerId: string;
  name: string;
  description: string;
  videoUrl: string;
}

export interface TrainmentIntf{
  id: string;
  trainerId: string;
  name: string;
  description: string;
  excersisesPlans: string[]; //REVISAR
}

export interface ExercisePlanIntf{
  id: string;
  name: string;
  exerciseId: string;
  repetitions: number;
  series: number;
  weight: number;
  break: number;
}

export interface DailyPlan{
  id: string;
  trainerId: string;
  name: string;
  description: string;
  trainments: TrainmentIntf[]
}

export interface Planification{

}

// Modelos destinados a Planes Nutricionales
export interface RecetsIntf{
  id: string;
  name: string;
  description: string; //REVISAR
  proteins: number;
  kcal: number;
  videoUrl: string;
}

export interface FoodIntf{
  id: string;
  type: FoodTYpe;
  nombre: string; //REVISAR
  recets: string[];
  extras: string[];
  proteins: number;
  kcal: number;
  fats: number;
  carbohydrates: number;
  videoUrl: string;
}

export interface NutritionalPlanIntf{
  id: string;
  trainerId: string;
  foods: string[];
  name: string;
}