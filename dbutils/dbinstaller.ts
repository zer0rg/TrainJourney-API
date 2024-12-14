import { DataTypes } from 'sequelize'
import { Reservation, Trainer, Student } from '../src/db/models'
import { sequelize } from '../src/db/connector'

export function createDatabase()
{

Trainer.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
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
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
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
    trainerId: { type: DataTypes.INTEGER, references: { model: Trainer, key: 'id' } },
    studentId: { type: DataTypes.INTEGER, references: { model: Student, key: 'id' } },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    timeSlot: { type: DataTypes.STRING, allowNull: false },
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
