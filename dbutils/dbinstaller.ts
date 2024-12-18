import { DataTypes } from 'sequelize'
import { Reservation, Trainer, Student, Entity,Food, Exercise, ExercisePlan, Trainment, Recets, NutritionalPlan, FoodRecets, DailyPlan, ClientPlanification, Planification, DailyPlanJunction } from '../src/db/models'
import { sequelize } from '../src/db/connector'

export function createDatabase()
{

  
    Entity.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false }
    }, { sequelize })
  
    Trainer.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      specializations: { type: DataTypes.JSON, allowNull: false },
      entityId: { type: DataTypes.INTEGER, allowNull: false }
    }, { sequelize })
  
    Student.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      course: { type: DataTypes.STRING, allowNull: false },
      enrollmentDate: { type: DataTypes.DATE, allowNull: false },
      interests: { type: DataTypes.JSON, allowNull: false },
      gender: { type: DataTypes.STRING, allowNull: false },
      weight: { type: DataTypes.FLOAT, allowNull: false },
      height: { type: DataTypes.FLOAT, allowNull: false },
      weightGoal: { type: DataTypes.FLOAT, allowNull: false },
      trainerId: { type: DataTypes.INTEGER, allowNull: false }
    }, { sequelize })
  
    Reservation.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      trainerId: { type: DataTypes.INTEGER, allowNull: false },
      studentId: { type: DataTypes.INTEGER, allowNull: false },
      serviceId: { type: DataTypes.INTEGER, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      limit: { type: DataTypes.INTEGER, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      timeSlot: { type: DataTypes.STRING, allowNull: false }
    }, { sequelize })
  
    //Iniciando tablas dedicadas a comidas
    Recets.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      entityId: { type: DataTypes.INTEGER, allowNull: false },
      proteins: { type: DataTypes.FLOAT, allowNull: false },
      kcal: { type: DataTypes.FLOAT, allowNull: false },
      videoUrl: { type: DataTypes.STRING, allowNull: false }
    }, { sequelize })
  
    Food.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      type: { type: DataTypes.STRING, allowNull: false },
      nombre: { type: DataTypes.STRING, allowNull: false },
      entityId: { type: DataTypes.INTEGER, allowNull: false },
      extras: { type: DataTypes.JSON, allowNull: false },
      proteins: { type: DataTypes.FLOAT, allowNull: false },
      kcal: { type: DataTypes.FLOAT, allowNull: false },
      fats: { type: DataTypes.FLOAT, allowNull: false },
      carbohydrates: { type: DataTypes.FLOAT, allowNull: false },
      videoUrl: { type: DataTypes.STRING, allowNull: false }
    }, { sequelize })
  
    FoodRecets.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      foodId: { type: DataTypes.INTEGER, allowNull: false },
      nutritionalPlanId: { type: DataTypes.INTEGER, allowNull: false },
      recetsId: { type: DataTypes.JSON, allowNull: false }
    }, { sequelize })
  
    NutritionalPlan.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      trainerId: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false }
    }, { sequelize })
  
    Exercise.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      entityId: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      videoUrl: { type: DataTypes.STRING, allowNull: false }
    }, { sequelize })
  
    Trainment.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      entityId: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false }
    }, { sequelize })
  
    ExercisePlan.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      exerciseId: { type: DataTypes.INTEGER, allowNull: false, references: {model: Exercise, key: 'id'} },
      trainmentId: { type: DataTypes.INTEGER, allowNull: false },
      trainerId: { type: DataTypes.INTEGER, allowNull: false },
      repetitions: { type: DataTypes.INTEGER, allowNull: false },
      series: { type: DataTypes.INTEGER, allowNull: false },
      weight: { type: DataTypes.FLOAT, allowNull: false },
      break: { type: DataTypes.INTEGER, allowNull: false }
    }, { sequelize })

    DailyPlan.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      trainerId: {type: DataTypes.INTEGER, allowNull: false},
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      dayn: {type: DataTypes.INTEGER, allowNull: false},
      nutritionalPlanId: {type: DataTypes.INTEGER, references: {model: NutritionalPlan, key: 'id'}},
      planificationId: {type: DataTypes.INTEGER, allowNull: false}
    }, {sequelize})
    
    DailyPlanJunction.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      dailyPlanId: {type: DataTypes.INTEGER, allowNull: false},
      trainmentId: {type: DataTypes.INTEGER, allowNull: false}
    }, {sequelize})

    Planification.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      weeks: { type: DataTypes.INTEGER, allowNull: false },
      trainerId: { type: DataTypes.INTEGER, allowNull: false }
    }, {sequelize})

    ClientPlanification.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      clienteId: { type: DataTypes.INTEGER, allowNull: false },
      planificationId: { type: DataTypes.INTEGER, allowNull: false },
      dateStart: { type: DataTypes.STRING, allowNull: false }
    }, {sequelize})

    //Entity Relations
    Entity.hasMany(Trainer, { foreignKey: 'entityId' })
    Entity.hasMany(Student, {foreignKey: 'entityId'})
    Entity.hasMany(Exercise, {foreignKey: 'entityId'})
    Entity.hasMany(Recets, {foreignKey: 'entityId'})

    Trainer.hasMany(Student, { foreignKey: 'trainerId' })
    Trainer.hasMany(Reservation, { foreignKey: 'trainerId' })
    Trainer.hasMany(ExercisePlan, { foreignKey: 'trainerId' })
    Trainer.hasMany(NutritionalPlan, { foreignKey: 'trainerId' })
    Trainer.hasMany(DailyPlan, { foreignKey: 'trainerId' })
    Trainer.belongsTo(Entity, { foreignKey: 'entityId' })
    
    


    Student.belongsTo(Trainer, { foreignKey: 'trainerId' })
    NutritionalPlan.belongsTo(Trainer, { foreignKey: 'trainerId' })
  
    Student.hasMany(Reservation, { foreignKey: 'studentId' })
    Reservation.belongsTo(Student, { foreignKey: 'studentId' })
  
    Reservation.belongsTo(Trainer, { foreignKey: 'trainerId' })
    
    //Ejercicios, Planes de Ejercicios, Entrenamientos
    Exercise.belongsTo(Entity, {foreignKey: 'entityId'})

    ExercisePlan.belongsTo(Trainment, {foreignKey: 'trainmentId'})

    Trainment.hasMany(ExercisePlan, {foreignKey: 'trainmentId'})
    Trainment.belongsToMany(DailyPlan, {through: DailyPlanJunction, foreignKey: 'trainmentId'})
    Trainment.belongsTo(Trainer, {foreignKey: 'trainerId'})

    //RECETAS, COMIDAS, PLANES NUTRICIONALES
    Recets.belongsTo(Entity, {foreignKey: 'entityId'})
    Recets.belongsToMany(Food, {through: FoodRecets, foreignKey: 'recetsId', otherKey: 'foodId'})
    
    Food.belongsToMany(Recets, {through: FoodRecets, foreignKey: 'foodId', otherKey: 'recetsId'})
    Food.belongsTo(Entity, { foreignKey: 'entityId' })
    FoodRecets.belongsTo(NutritionalPlan, { foreignKey: 'nutritionalPlanId' })
    
    NutritionalPlan.hasMany(FoodRecets, {foreignKey: 'nutritionalPlanId'})
    //PLAN DIARIO, PLANIFICACIÓN, CLIENTE-PLANIFICACION
    DailyPlan.belongsToMany(Trainment, {through: DailyPlanJunction, foreignKey: 'dailyPlanId'})
    DailyPlan.belongsTo(Planification, {foreignKey: 'planificationId'})
    
}

export async function seedDatabase() {
  try {
    // Sincronizar el modelo con la base de datos
    await sequelize.sync({ force: true })

    // Crear entidades
    const entity1 = await Entity.create({ name: 'Gym Elite' })
    const entity2 = await Entity.create({ name: 'Fitness Pro' })

    // Crear entrenadores
    const trainer1 = await Trainer.create({
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
      password: 'password123',
      specializations: JSON.stringify(['Cardio', 'Strength']),
      entityId: entity1.id,
    })

    const trainer2 = await Trainer.create({
      name: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '987654321',
      password: 'password456',
      specializations: JSON.stringify(['Yoga', 'Pilates']),
      entityId: entity2.id,
    })

    // Crear estudiantes
    const student1 = await Student.create({
      name: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      phone: '111222333',
      password: 'alicepass',
      course: 'Fitness Program',
      enrollmentDate: new Date(),
      interests: JSON.stringify(['Cardio', 'Running']),
      gender: 'female',
      weight: 60.5,
      height: 165.5,
      weightGoal: 55.0,
      trainerId: trainer1.id,
    })

    const student2 = await Student.create({
      name: 'Bob',
      lastName: 'Brown',
      email: 'bob.brown@example.com',
      phone: '444555666',
      password: 'bobpass',
      course: 'Weight Loss',
      enrollmentDate: new Date(),
      interests: JSON.stringify(['Cycling', 'Swimming']),
      gender: 'male',
      weight: 85.0,
      height: 180.0,
      weightGoal: 75.0,
      trainerId: trainer2.id,
    })

    // Crear reservas
    await Reservation.create({
      trainerId: trainer1.id,
      studentId: student1.id,
      serviceId: 1,
      type: 'onsite',
      limit: 1,
      date: new Date(),
      timeSlot: '09:00 - 10:00',
    })

    await Reservation.create({
      trainerId: trainer2.id,
      studentId: student2.id,
      serviceId: 2,
      type: 'online',
      limit: 5,
      date: new Date(),
      timeSlot: '10:00 - 11:00',
    })

    console.log('Datos insertados correctamente. 🚀')
  } catch (error) {
    console.error('Error al insertar datos:', error)
  }
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
