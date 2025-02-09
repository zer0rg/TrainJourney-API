import { DataTypes } from 'sequelize'
import { Reservation, Trainer, Student, Entity,Food, Exercise, ExercisePlan, Trainment, Recets, NutritionalPlan, FoodRecets, DailyPlan, ClientPlanification, Planification, DailyPlanJunction, Service } from '../src/db/models'
import { sequelize } from '../src/db/connector'
import { generateUuid } from '../src/utils/security'
import { equipment, muscles } from '../src/constants'

export function createDatabase()
{

  
    Entity.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: {
        type: DataTypes.STRING, allowNull: false, unique: {
          name: 'Nombre duplicado', msg: 'Esta empresa ya está regiistrada.'
        }
      },
      uuid: {
        type: DataTypes.STRING, allowNull: false, unique: {
          name: 'Id duplicado', msg: 'Ha habido un error en la creación, reintenta el proceso o contacta con el servicio de ayuda si el error persiste.'
        }
      },
      excersiseTags: {type: DataTypes.JSON, allowNull: false,  }
    }, { sequelize })
  
    Trainer.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING, allowNull: false, unique: {
          name: 'Email duplicado', msg: 'El email introducido ya pertenece a un usuario existente.'
        }
      },
      phone: {
        type: DataTypes.STRING, allowNull: false, unique: {
          name: 'Telefono duplicado', msg: 'El teléfono introducido ya pertenece a un usuario existente.'
        }
      },
      password: { type: DataTypes.STRING, allowNull: false },
      specializations: { type: DataTypes.JSON, allowNull: false },
      entityId: { type: DataTypes.INTEGER, allowNull: false },
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, unique:{
        name:'Id duplicado', msg: 'Ha habido un error en la creación, reintenta el proceso o contacta con el servicio de ayuda si el error persiste.'
      }}
    }, { sequelize })
  
    Student.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING, allowNull: false, unique: {
          name: 'Email duplicado', msg: 'El email introducido ya pertenece a un usuario existente.'
        }
      },
      lastName: { type: DataTypes.STRING, allowNull: false },
      phone: {
        type: DataTypes.STRING, allowNull: false, unique: {
          name: 'Telefono duplicado', msg: 'El teléfono introducido ya pertenece a un usuario existente.'
        }
      },
      password: { type: DataTypes.STRING, allowNull: false },
      enrollmentDate: { type: DataTypes.DATE, allowNull: false },
      interests: { type: DataTypes.JSON, allowNull: false },
      gender: { type: DataTypes.STRING, allowNull: false },
      weight: { type: DataTypes.FLOAT, allowNull: false },
      height: { type: DataTypes.FLOAT, allowNull: false },
      weightGoal: { type: DataTypes.FLOAT, allowNull: false },
      trainerId: { type: DataTypes.INTEGER, allowNull: false },
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, unique:{
        name:'Id duplicado', msg: 'Ha habido un error en la creación, reintenta el proceso o contacta con el servicio de ayuda si el error persiste.'
      }}
    }, { sequelize })
  
    Service.init({
      id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
      name: {type: DataTypes.STRING, allowNull: false, unique: {
        name: 'Nombre duplicado',
        msg: 'El nombre del servicio ya existe.'
      } },
      entityId: {type: DataTypes.INTEGER, allowNull: false},
      trainerId: {type: DataTypes.INTEGER, allowNull: false},
      description: {type: DataTypes.STRING, allowNull: false},
      onlinePrice: {type: DataTypes.INTEGER, allowNull: false},
      onsitePrice: {type: DataTypes.INTEGER, allowNull: false}
    }, {sequelize})

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
      videoUrl: { type: DataTypes.STRING, allowNull: false },
      trainerId: { type: DataTypes.INTEGER, allowNull: false },

    }, { sequelize })
  
    Food.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      entityId: { type: DataTypes.INTEGER, allowNull: false },
      extras: { type: DataTypes.STRING, allowNull: false },
      proteins_100: { type: DataTypes.FLOAT, allowNull: false },
      kcal_100: { type: DataTypes.FLOAT, allowNull: false },
      fats_100: { type: DataTypes.FLOAT, allowNull: false },
      fiber_100: { type: DataTypes.FLOAT, allowNull: false },
      carbohydrates_100: { type: DataTypes.FLOAT, allowNull: false },
      proteins_u: { type: DataTypes.FLOAT, allowNull: false },
      kcal_u: { type: DataTypes.FLOAT, allowNull: false },
      fats_u: { type: DataTypes.FLOAT, allowNull: false },
      fiber_u: { type: DataTypes.FLOAT, allowNull: false },
      carbohydrates_u: { type: DataTypes.FLOAT, allowNull: false },
      imgUrl: { type: DataTypes.STRING, allowNull: false }
    }, { sequelize })
  
    FoodRecets.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      foodId: { type: DataTypes.INTEGER, allowNull: false },
      nutritionalPlanId: { type: DataTypes.INTEGER, allowNull: false },
      recetsId: { type: DataTypes.JSON, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
    }, { sequelize })
  
    NutritionalPlan.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      trainerId: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
    }, { sequelize })
  
    Exercise.init({
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      entityId: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      videoUrl: { type: DataTypes.STRING, allowNull: false },
      imgUrl: { type: DataTypes.STRING, allowNull: false },
      muscle_principal: { type: DataTypes.STRING, allowNull: false },
      equipment: { type: DataTypes.STRING, allowNull: false },
      movement: { type: DataTypes.STRING, allowNull: false },
      level: { type: DataTypes.STRING, allowNull: false },
      speciality: { type: DataTypes.STRING, allowNull: false },
      mecanic: { type: DataTypes.STRING, allowNull: false }
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
      nutritionalPlanId: {type: DataTypes.INTEGER, references: {model: NutritionalPlan, key: 'id'}, allowNull: true},
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
      studentId: { type: DataTypes.INTEGER, allowNull: false },
      planificationId: { type: DataTypes.INTEGER, allowNull: false },
      dateStart: { type: DataTypes.STRING, allowNull: false }
    }, {sequelize})

    //Entity Relations
    Entity.hasMany(Trainer, { foreignKey: 'entityId' })
    Entity.hasMany(Student, {foreignKey: 'entityId'})
    Entity.hasMany(Exercise, {foreignKey: 'entityId'})
    Entity.hasMany(Recets, {foreignKey: 'entityId'})

    Trainer.hasMany(Student, { foreignKey: 'trainerId', as: 'students' })
    Trainer.hasMany(Reservation, { foreignKey: 'trainerId' })
    Trainer.hasMany(ExercisePlan, { foreignKey: 'trainerId' })
    Trainer.hasMany(NutritionalPlan, { foreignKey: 'trainerId' })
    Trainer.hasMany(DailyPlan, { foreignKey: 'trainerId', as: 'dailyPlans' })
    Trainer.belongsTo(Entity, { foreignKey: 'entityId' })
    
    


    Student.belongsTo(Trainer, { foreignKey: 'trainerId', as: 'trainer' })
    NutritionalPlan.belongsTo(Trainer, { foreignKey: 'trainerId' })
  
    Student.hasMany(Reservation, { foreignKey: 'studentId' })
    Reservation.belongsTo(Student, { foreignKey: 'studentId' })
  
    Reservation.belongsTo(Trainer, { foreignKey: 'trainerId' })
    
    //Ejercicios, Planes de Ejercicios, Entrenamientos
    Exercise.belongsTo(Entity, {foreignKey: 'entityId'})

    ExercisePlan.belongsTo(Trainment, {foreignKey: 'trainmentId'})

    Trainment.hasMany(ExercisePlan, {foreignKey: 'trainmentId'})
    Trainment.belongsToMany(DailyPlan, {
      through: DailyPlanJunction,sourceKey: 'id',targetKey: 'id',foreignKey: 'trainmentId',otherKey: 'dailyPlanId'
    })
    Trainment.belongsTo(Trainer, {foreignKey: 'trainerId'})

    //RECETAS, COMIDAS, PLANES NUTRICIONALES
    Recets.belongsTo(Entity, {foreignKey: 'entityId'})
    Recets.belongsToMany(Food, {through: FoodRecets, foreignKey: 'recetsId', otherKey: 'foodId'})
    
    Food.belongsToMany(Recets, {through: FoodRecets, foreignKey: 'foodId', otherKey: 'recetsId'})
    Food.belongsTo(Entity, { foreignKey: 'entityId' })
    FoodRecets.belongsTo(NutritionalPlan, { foreignKey: 'nutritionalPlanId' })
    
    NutritionalPlan.hasMany(FoodRecets, {foreignKey: 'nutritionalPlanId'})
    //PLAN DIARIO, PLANIFICACIÓN, CLIENTE-PLANIFICACION
    DailyPlan.belongsToMany(Trainment, {
      through: DailyPlanJunction, sourceKey: 'id', targetKey: 'id', foreignKey: 'dailyPlanId', as: 'trainments'
    })
    DailyPlan.belongsTo(Planification, {foreignKey: 'planificationId'})
    DailyPlan.belongsTo(Trainer, {foreignKey: 'trainerId', as:'trainer'})
    
}

export async function seedDatabase() {
  try {
    await sequelize.sync({ force: true })

    // Crear entidades
    const entity1 = await Entity.create({
      name: 'Gym Elite',
      uuid: generateUuid(null),
      excersiseTags: []
    })
    
    const entity2 = await Entity.create({
      name: 'Fitness Pro',
      uuid: generateUuid(null),
      excersiseTags: []

    })

    // Crear entrenadores
    const trainer1 = await Trainer.create({
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
      password: 'password123',
      specializations: JSON.stringify(['Cardio', 'Strength']),
      entityId: entity1.id,
      uuid: generateUuid(null)
    })

    const trainer2 = await Trainer.create({
      name: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '987654321',
      password: 'password456',
      specializations: JSON.stringify(['Yoga', 'Pilates']),
      entityId: entity2.id,
      uuid: generateUuid(null)
    })

    // Crear estudiantes
    const student1 = await Student.create({
      name: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      phone: '111222333',
      password: 'alicepass',
      enrollmentDate: new Date(),
      interests: JSON.stringify(['Cardio', 'Running']),
      gender: 'female',
      weight: 60.5,
      height: 165.5,
      weightGoal: 55.0,
      trainerId: trainer1.id,
      uuid: generateUuid(null)
    })

    const student2 = await Student.create({
      name: 'Bob',
      lastName: 'Brown',
      email: 'bob.brown@example.com',
      phone: '444555666',
      password: 'bobpass',
      enrollmentDate: new Date(),
      interests: JSON.stringify(['Cycling', 'Swimming']),
      gender: 'male',
      weight: 85.0,
      height: 180.0,
      weightGoal: 75.0,
      trainerId: trainer2.id,
      uuid: generateUuid(null)
    })

    // Crear servicios
    const service1 = await Service.create({
      name: 'Entrenamiento Personal',
      entityId: entity1.id,
      trainerId: trainer1.id,
      description: 'Sesiones personalizadas de fuerza',
      onlinePrice: 40,
      onsitePrice: 60
    })

    const service2 = await Service.create({
      name: 'Clases de Yoga',
      entityId: entity2.id,
      trainerId: trainer2.id,
      description: 'Sesiones grupales de yoga',
      onlinePrice: 25,
      onsitePrice: 40
    })

    // Crear reservas
    await Reservation.bulkCreate([{
      trainerId: trainer1.id,
      studentId: student1.id,
      serviceId: service1.id,
      type: 'onsite',
      limit: 1,
      date: new Date(),
      timeSlot: '09:00 - 10:00'
    }, {
      trainerId: trainer2.id,
      studentId: student2.id,
      serviceId: service2.id,
      type: 'online',
      limit: 5,
      date: new Date(),
      timeSlot: '10:00 - 11:00'
    }])

    // Crear alimentos
    const food1 = await Food.create({
      name: 'Pechuga de Pollo',
      entityId: entity1.id,
      extras: 'A la parrilla',
      proteins_100: 31.0,
      kcal_100: 165.0,
      fats_100: 3.6,
      fiber_100: 0.0,
      carbohydrates_100: 0.0,
      proteins_u: 25.0,
      kcal_u: 130.0,
      fats_u: 2.8,
      fiber_u: 0.0,
      carbohydrates_u: 0.0,
      imgUrl: 'https://example.com/chicken.jpg'
    })

    const food2 = await Food.create({
      name: 'Arroz Integral',
      entityId: entity2.id,
      extras: 'Cocido',
      proteins_100: 7.5,
      kcal_100: 370.0,
      fats_100: 2.9,
      fiber_100: 3.4,
      carbohydrates_100: 77.0,
      proteins_u: 5.0,
      kcal_u: 150.0,
      fats_u: 1.0,
      fiber_u: 1.2,
      carbohydrates_u: 32.0,
      imgUrl: 'https://example.com/rice.jpg'
    })

    // Crear recetas
    const recipe1 = await Recets.create({
      name: 'Ensalada de Pollo',
      description: 'Ensalada con pollo a la parrilla y vegetales',
      entityId: entity1.id,
      proteins: 30.0,
      kcal: 350.0,
      videoUrl: 'https://example.com/ensalada',
      trainerId: trainer1.id
    })

    const recipe2 = await Recets.create({
      name: 'Bowl de Arroz',
      description: 'Bowl con arroz integral y vegetales salteados',
      entityId: entity2.id,
      proteins: 15.0,
      kcal: 400.0,
      videoUrl: 'https://example.com/ricebowl',
      trainerId: trainer2.id
    })

    // Crear planes nutricionales
    const nutritionalPlan1 = await NutritionalPlan.create({
      trainerId: trainer1.id,
      name: 'Plan Pérdida de Peso',
      description: 'Dieta baja en calorías para pérdida de peso'
    })

    const nutritionalPlan2 = await NutritionalPlan.create({
      trainerId: trainer2.id,
      name: 'Plan Ganancia Muscular',
      description: 'Dieta alta en proteínas para ganancia muscular'
    })

    // Relacionar alimentos y recetas con planes nutricionales
    await FoodRecets.bulkCreate([{
      foodId: food1.id,
      nutritionalPlanId: nutritionalPlan1.id,
      recetsId: recipe1.id,
      type: 'breakfast'
    }, {
      foodId: food2.id,
      nutritionalPlanId: nutritionalPlan2.id,
      recetsId: recipe2.id,
      type: 'dinner'
    }])

    // Crear ejercicios
    const exercise1 = await Exercise.create({
      entityId: entity1.id,
      name: 'Flexiones',
      description: 'Ejercicio básico de fuerza',
      videoUrl: 'https://example.com/flexiones',
      imgUrl: 'https://example.com/flexiones',
      muscle_principal: muscles[3],
      equipment: equipment[4],
      movement: 'test',
      level: 'test',
      speciality: 'test',
      mecanic: 'test'
    })

    const exercise2 = await Exercise.create({
      entityId: entity2.id,
      name: 'Sentadillas',
      description: 'Ejercicio para piernas y glúteos',
      videoUrl: 'https://example.com/sentadillas',
      imgUrl: 'https://example.com/sentadillas',
      muscle_principal: muscles[1],
      equipment: equipment[7],
      movement: 'test',
      level: 'test',
      speciality: 'test',
      mecanic: 'test'
    })

    // Crear entrenamientos
    const trainment1 = await Trainment.create({
      entityId: entity1.id,
      name: 'Entrenamiento de Fuerza',
      description: 'Rutina para ganancia muscular'
    })

    const trainment2 = await Trainment.create({
      entityId: entity2.id,
      name: 'Entrenamiento Cardio',
      description: 'Rutina para mejorar resistencia'
    })

    // Crear planes de ejercicio
    await ExercisePlan.bulkCreate([{
      name: 'Rutina Push',
      exerciseId: exercise1.id,
      trainmentId: trainment1.id,
      trainerId: trainer1.id,
      repetitions: 12,
      series: 4,
      weight: 20,
      break: 60
    }, {
      name: 'Rutina Cardio',
      exerciseId: exercise2.id,
      trainmentId: trainment2.id,
      trainerId: trainer2.id,
      repetitions: 20,
      series: 3,
      weight: 0,
      break: 30
    }])

    // Crear planificaciones
    const planification1 = await Planification.create({
      name: 'Transformación 12 Semanas',
      description: 'Plan completo para recomposición corporal',
      weeks: 12,
      trainerId: trainer1.id
    })

    const planification2 = await Planification.create({
      name: 'Definición Muscular',
      description: 'Plan de 8 semanas para definición',
      weeks: 8,
      trainerId: trainer2.id
    })

    // Crear planes diarios
    const dailyPlan1 = await DailyPlan.create({
      trainerId: trainer1.id,
      name: 'Día 1: Fuerza',
      description: 'Entrenamiento de fuerza completo',
      dayn: 1,
      nutritionalPlanId: nutritionalPlan1.id,
      planificationId: planification1.id
    })

    const dailyPlan2 = await DailyPlan.create({
      trainerId: trainer2.id,
      name: 'Día 1: Cardio',
      description: 'Rutina intensiva de cardio',
      dayn: 1,
      nutritionalPlanId: nutritionalPlan2.id,
      planificationId: planification2.id
    })

    // Relacionar planes diarios con entrenamientos
    await DailyPlanJunction.bulkCreate([{
      dailyPlanId: dailyPlan1.id,
      trainmentId: trainment1.id
    }, {
      dailyPlanId: dailyPlan2.id,
      trainmentId: trainment2.id
    }])

    // Asignar planificaciones a clientes
    await ClientPlanification.bulkCreate([{
      studentId: student1.id,
      planificationId: planification1.id,
      dateStart: new Date()
    }, {
      studentId: student2.id,
      planificationId: planification2.id,
      dateStart: new Date()
    }])

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
    return
  } catch (err) {
    console.error('Error al sincronizar la base de datos:', err)
  }
}
