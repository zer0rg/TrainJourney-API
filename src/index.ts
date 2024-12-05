import express, { Request, Response } from 'express';
import { validateName, validateEmail, validatePassword, validateRole, validateSpecializations, 
  validateCourse, validateDate, validateGender, validateWeight, validateHeight, validateWeightGoal } from './validations';
import cors from 'cors';
import { BaseUser, User } from './types';

const app = express();
const PORT = 3000;

const users: User[] = [
    {
      id: 1,
      name: "Carlos González",
      email: "carlos@example.com",
      password: "securePass123",
      role: "trainer",
      specializations: ["Strength Training", "Cardio"],
    },
    // otros usuarios...
];

// Middleware para parsear JSON
app.use(cors(), express.json());

// Endpoint para registrar un usuario
app.post(
  '/signup',
  (req: Request, res: Response) => {
    const { name, email, password, role, specializations, course, enrollmentDate, gender, weight, height, weightGoal } = req.body;

    // Validaciones
    const validationErrors: string[] = [];

    const nameError = validateName(name);
    if (typeof nameError !== 'boolean') validationErrors.push(nameError);

    const emailError = validateEmail(email);
    if (typeof emailError != 'boolean') validationErrors.push(emailError);

    const passwordError = validatePassword(password);
    if (typeof passwordError != 'boolean') validationErrors.push(passwordError);

    const roleError = validateRole(role);
    if (typeof roleError != 'boolean') validationErrors.push(roleError);

    if (role === 'trainer') {
      const specializationsError = validateSpecializations(specializations);
      if (typeof specializationsError != 'boolean') validationErrors.push(specializationsError);
    }

    if (role === 'student') {
      const courseError = validateCourse(course);
      if (typeof courseError != 'boolean') validationErrors.push(courseError);

      const dateError = validateDate(enrollmentDate);
      if (typeof dateError != 'boolean') validationErrors.push(dateError);

      const genderError = validateGender(gender);
      if (typeof genderError != 'boolean') validationErrors.push(genderError);

      const weightError = validateWeight(weight);
      if (typeof weightError != 'boolean') validationErrors.push(weightError);

      const heightError = validateHeight(height);
      if (typeof heightError != 'boolean') validationErrors.push(heightError);

      const weightGoalError = validateWeightGoal(weightGoal);
      if (typeof weightGoalError != 'boolean') validationErrors.push(weightGoalError);
    }

    if (validationErrors.length > 0) {
      res.status(400).json({
        success: false,
        message: "Failed.",
        errors: validationErrors,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Signup successful!",
    });
  }
);

// Ruta de ejemplo
app.get('/login', (req: Request, res: Response) => {
  res.send('¡Hola, mundo desde Express y TypeScript! 🌟');
});

// Ruta de ejemplo
app.get('/', (req: Request, res: Response) => {
  res.send('Funciono wey');
});

// Endpoint para crear una nueva reserva
app.post("/reservations", async (req: Request, res: Response) => {
  const { trainerId, studentId, date, timeSlot } = req.body;

  try {
    if (!trainerId || !studentId || !date || !timeSlot) {
      res.status(400).json({ error: "Faltan campos obligatorios." });
      return 
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la reserva." });
  }
});

// Endpoint para obtener todas las reservas
app.get("/reservations", async (req: Request, res: Response) => {
  const reservvations = '';
  try {
    
    res.status(200).json({ success: true, reservvations});
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reservas." });
  }
});

// Endpoint para obtener una reserva específica por ID
app.get("/reservations/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  let reservation: string = '';

  try {
 

    if (!reservation) {
      res.status(404).json({ error: "Reserva no encontrada." });
      return
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la reserva." });
  }
});

// Endpoint para actualizar una reserva
app.put("/reservations/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { trainerId, studentId, date, timeSlot } = req.body;

  try {
    const reservation = '';

    if (!reservation) {
      res.status(404).json({ error: "Reserva no encontrada." });
      return 
    }
    res.status(200).json({ success: true, reservation });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la reserva." });
  }
});

// Endpoint para eliminar una reserva
app.delete("/reservations/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const reservation = '';

    if (!reservation) {
      res.status(404).json({ error: "Reserva no encontrada." });
      return 
    }

    res.status(200).json({ success: true, message: "Reserva eliminada correctamente.", id });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la reserva." });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
