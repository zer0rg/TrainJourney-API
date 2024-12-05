export type UserType = 'trainer' | 'student';
export type GenderType = 'male' | 'female' | 'non-binary'

export interface User {
  id: number;
  name: string;
  email: string;
  password: string
  role: 'trainer' | 'student'; // Discriminante
}

export interface TrainerObj extends User {
  specializations: string[]; // Campo específico para entrenadores
}

export interface Student extends User {
  role: 'student'; // Fija el valor a "stu dent"
  course: string; // Campo adicional para estudiantes
  enrollmentDate: Date; // Otro campo específico
  interests: string[];
  gender: GenderType;
  weigth: number; 
  heigth: number;
  weigth_goal: number;
}