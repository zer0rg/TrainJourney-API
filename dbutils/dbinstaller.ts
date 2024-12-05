import { Sequelize, DataTypes, Model, Optional } from "sequelize";

// Configuración de la base de datos
const sequelize = new Sequelize("database_name", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

// Interfaz Base para Usuarios
interface BaseUserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "trainer" | "student";
}

interface BaseUserCreationAttributes extends Optional<BaseUserAttributes, "id"> {}

// Modelo de Usuarios (Users)
class User extends Model<BaseUserAttributes, BaseUserCreationAttributes> implements BaseUserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: "trainer" | "student";
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("trainer", "student"), allowNull: false },
  },
  {
    sequelize,
    tableName: "users",
  }
);

// Interfaz y Modelo de Entrenadores (Trainers)
interface TrainerAttributes {
  id: number;
  specializations: string[];
}

interface TrainerCreationAttributes extends Optional<TrainerAttributes, "id"> {}

class Trainer extends Model<TrainerAttributes, TrainerCreationAttributes> implements TrainerAttributes {
  public id!: number;
  public specializations!: string[];
}

Trainer.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: User, key: "id" } },
    specializations: { type: DataTypes.JSON, allowNull: false },
  },
  {
    sequelize,
    tableName: "trainers",
  }
);

// Interfaz y Modelo de Estudiantes (Students)
interface StudentAttributes {
  id: number;
  course: string;
  enrollmentDate: Date;
  interests: string[];
  gender: "male" | "female" | "other";
  weight: number;
  height: number;
  weightGoal: number;
}

interface StudentCreationAttributes extends Optional<StudentAttributes, "id"> {}

class Student extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
  public id!: number;
  public course!: string;
  public enrollmentDate!: Date;
  public interests!: string[];
  public gender!: "male" | "female" | "other";
  public weight!: number;
  public height!: number;
  public weightGoal!: number;
}

Student.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: User, key: "id" } },
    course: { type: DataTypes.STRING, allowNull: false },
    enrollmentDate: { type: DataTypes.DATE, allowNull: false, defaultValue: Date },
    interests: { type: DataTypes.JSON, allowNull: false },
    gender: { type: DataTypes.ENUM("male", "female", "other"), allowNull: false },
    weight: { type: DataTypes.FLOAT, allowNull: false },
    height: { type: DataTypes.FLOAT, allowNull: false },
    weightGoal: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize,
    tableName: "students",
  }
);
// Modelo de Reservas (Reservations)
interface ReservationAttributes {
  id: number;
  trainerId: number;
  studentId: number;
  date: Date;
  timeSlot: string; // Ejemplo: "08:00-09:00"
}

interface ReservationCreationAttributes extends Optional<ReservationAttributes, "id"> {}

class Reservation extends Model<ReservationAttributes, ReservationCreationAttributes> implements ReservationAttributes {
  public id!: number;
  public trainerId!: number;
  public studentId!: number;
  public date!: Date;
  public timeSlot!: string;
}

Reservation.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    trainerId: { type: DataTypes.INTEGER, references: { model: Trainer, key: "id" } },
    studentId: { type: DataTypes.INTEGER, references: { model: Student, key: "id" } },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    timeSlot: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "reservations",
  }
);

// Relaciones
User.hasOne(Trainer, { foreignKey: "id" });
Trainer.belongsTo(User, { foreignKey: "id" });

User.hasOne(Student, { foreignKey: "id" });
Student.belongsTo(User, { foreignKey: "id" });

Trainer.hasMany(Reservation, { foreignKey: "trainerId" });
Student.hasMany(Reservation, { foreignKey: "studentId" });
Reservation.belongsTo(Trainer, { foreignKey: "trainerId" });
Reservation.belongsTo(Student, { foreignKey: "studentId" });

// Otras relaciones (reservas, productos, tareas, etc.) pueden ir aquí, como antes

// Sincronizar las tablas
export async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log("¡Tablas creadas exitosamente!");
  } catch (err) {
    console.error("Error al sincronizar la base de datos:", err);
  }
}


