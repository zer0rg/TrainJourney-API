import { DataTypes } from 'sequelize'
import { Reservation, Trainer, Student, Entity } from '../src/db/models'
import { sequelize } from '../src/db/connector'

export function createDatabase()
{

Entity.init(
  {
    id: {type: DataTypes.STRING, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: {
      name: 'unique_name_constraint', msg: 'The entity name provided is already in use.'
    }}
  },
  {sequelize, tableName: 'entities'}
)

Trainer.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false, unique: {
      name: 'unique_phone_constraint', msg: 'The phone provided is already in use'
    }},
    entity: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: {
      name: 'unique_email_constraint', msg: 'The email provided is already in use'
    }, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    specializations: { type: DataTypes.JSON, allowNull: false },
    
  },
  {
    sequelize,
    tableName: 'trainers',
  }
)


Student.init(
  {
    id: { type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false, unique: {
      name: 'unique_phone_constraint', msg: 'The phone provided is already in use'
    }},
    email: { type: DataTypes.STRING, unique: {
      name: 'unique_email_constraint', msg: 'The email provided is already in use'
    }, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    course: { type: DataTypes.STRING, allowNull: false },
    enrollmentDate: { type: DataTypes.DATE, allowNull: false, defaultValue: Date },
    interests: { type: DataTypes.JSON, allowNull: false },
    gender: { type: DataTypes.ENUM('male', 'female', 'other'), allowNull: false },
    weight: { type: DataTypes.FLOAT, allowNull: false },
    height: { type: DataTypes.FLOAT, allowNull: false },
    weightGoal: { type: DataTypes.FLOAT, allowNull: false },
    trainerid: {type: DataTypes.INTEGER, allowNull: false, references: { model: Trainer, key: 'id' }}
  },
  {
    sequelize,
    tableName: 'students',
  }
)


Reservation.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    trainerId: { type: DataTypes.STRING, references: { model: Trainer, key: 'id' }, allowNull: false },
    studentId: { type: DataTypes.STRING, references: { model: Student, key: 'id' }, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    serviceId: { type: DataTypes.STRING, allowNull: false },
    timeSlot: { type: DataTypes.STRING, allowNull: false },
    limit: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: 'reservations',
  }
)

// Relaciones entre Tablas
Trainer.hasMany(Reservation, { foreignKey: 'trainerId' })
Student.hasMany(Reservation, { foreignKey: 'studentId' })
Reservation.belongsTo(Trainer, { foreignKey: 'trainerId' })
Reservation.belongsTo(Student, { foreignKey: 'studentId' })
}

// Sincronizar las tablas
export async function syncDatabase() {
  try {
    await sequelize.sync({ force: true })
    console.log('¡Tablas creadas exitosamente!')
  } catch (err) {
    console.error('Error al sincronizar la base de datos:', err)
  }
}
