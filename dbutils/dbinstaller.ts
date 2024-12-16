import { DataTypes } from 'sequelize'
import { Reservation, Trainer, Student, Entity,Food, Exercise, ExercisePlan, Trainment, Recets, NutritionalPlan, FoodRecets, DailyPlan, ClientPlanification, Planification } from '../src/db/models'
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
    entityId: { type: DataTypes.INTEGER, allowNull: false, references: {model: Entity, key:'id'} },
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
    trainerId: {type: DataTypes.INTEGER, allowNull: false, references: { model: Trainer, key: 'id' }}
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

// Initialize Nutritional Plan models
Recets.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    entityId: { type: DataTypes.STRING, allowNull: false, references: { model: Student, key: 'id' }},
    description: { type: DataTypes.TEXT },
    proteins: { type: DataTypes.FLOAT },
    kcal: { type: DataTypes.FLOAT },
    videoUrl: { type: DataTypes.STRING }
  },
  { sequelize, tableName: 'recets' }
)

Food.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    type: { type: DataTypes.ENUM('Vegetarian', 'Vegan', 'Omnivore'), allowNull: false },
    nombre: { type: DataTypes.STRING, allowNull: false },
    entityId: { type: DataTypes.STRING, allowNull: false },
    extras: { type: DataTypes.ARRAY(DataTypes.STRING) },
    proteins: { type: DataTypes.FLOAT },
    kcal: { type: DataTypes.FLOAT },
    fats: { type: DataTypes.FLOAT },
    carbohydrates: { type: DataTypes.FLOAT },
    videoUrl: { type: DataTypes.STRING }
  },
  { sequelize, tableName: 'foods' }
)

NutritionalPlan.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    trainerId: { type: DataTypes.STRING, allowNull: false },
    foods: { type: DataTypes.ARRAY(DataTypes.STRING) },
    name: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize, tableName: 'nutritional_plans' }
)

// Initialize Exercise models
Exercise.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    trainerId: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    videoUrl: { type: DataTypes.STRING }
  },
  { sequelize, tableName: 'exercises' }
)

Trainment.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    trainerId: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    ExercisesPlans: { type: DataTypes.ARRAY(DataTypes.STRING) }
  },
  { sequelize, tableName: 'trainments' }
)

ExercisePlan.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    exerciseId: { type: DataTypes.STRING, allowNull: false },
    repetitions: { type: DataTypes.INTEGER },
    series: { type: DataTypes.INTEGER },
    weight: { type: DataTypes.FLOAT },
    break: { type: DataTypes.INTEGER }
  },
  { sequelize, tableName: 'exercise_plans' }
)


// Relaciones Trainer
Trainer.hasMany(Reservation, { foreignKey: 'trainerId'})
// Relaciones Entrenador -> Ejercicio
Trainer.hasMany(Exercise, { foreignKey: 'trainerId'})
Trainer.hasMany(Trainment, { foreignKey: 'trainerId'})
//Trainer.hasMany(DailyPlan, {foreignKey: 'trainerId'})
Trainer.hasMany(NutritionalPlan, {foreignKey: 'trainerId'})

Exercise.belongsTo(Trainer, { foreignKey: 'trainerId' })
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
