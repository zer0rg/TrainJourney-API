import { Optional,Model } from 'sequelize'
import { GenderType, ReservationIntf, StudentIntf, TrainerIntf } from '../types'


interface TrainerCreationAttributes extends Optional<TrainerIntf, 'id'> {}

export class Trainer extends Model<TrainerIntf, TrainerCreationAttributes> implements TrainerIntf {
  public id!: number
  public name!: string
  public email!: string
  public password!: string
  public specializations!: string[]
  
}

interface StudentCreationAttributes extends Optional<StudentIntf, 'id'> {}

export class Student extends Model<StudentIntf, StudentCreationAttributes> implements StudentIntf {
  public id!: number
  public name!: string
  public email!: string
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
  public trainerId!: number
  public studentId!: number
  public date!: Date
  public timeSlot!: string
}
