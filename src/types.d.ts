export type UserType = 'trainer' | 'student';
export type GenderType = 'male' | 'female' | 'non-binary'

export interface UserIntf {
  id: number;
  name: string;
  email: string;
  password: string
}

export interface TrainerIntf extends UserIntf {
  specializations: string[]; // Campo específico para entrenadores
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
interface ReservationIntf {
  id: number;
  trainerId: number;
  studentId: number;
  date: Date;
  timeSlot: string; // Ejemplo: "08:00-09:00"
}