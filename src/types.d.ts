export type User = Trainer | Student;
export type Gender = 'male' | 'female' | 'other' | 'NULL'

export interface BaseUser {
  id: number;
  name: string;
  email: string;
  password: string
  role: "trainer" | "student"; // Discriminante
}

export interface Trainer extends BaseUser {
  role: "trainer"; // Fija el valor a "trainer"
  specializations: string[]; // Campo específico para entrenadores
}

export interface Student extends BaseUser {
  role: "student"; // Fija el valor a "student"
  course: string; // Campo adicional para estudiantes
  enrollmentDate: Date; // Otro campo específico
  interests: string[];
  gender: Gender;
  weigth: number;
  heigth: number;
  weigth_goal: number;
}