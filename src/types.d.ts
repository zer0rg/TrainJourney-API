// types.d.ts

export type UserType = 'trainer' | 'student';
export type GenderType = 'male' | 'female' | 'non-binary';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface Trainer extends UserIntf {
  specializations: string[]; // Campo específico para entrenadores
}

export interface Student extends UserIntf {
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
export interface Reservation {  // Agregado "export" aquí
  id: number;
  trainerId: number;
  studentId: number;
  date: Date;
  timeSlot: string; // Ejemplo: "08:00-09:00"
}
