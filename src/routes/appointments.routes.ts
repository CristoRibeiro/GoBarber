import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRoutes = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRoutes.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

appointmentsRoutes.post('/', (request, response) => {
  const { provider, date } = request.body;
  const dateAppointment = startOfHour(parseISO(date));

  const sameDateAppointments = appointmentsRepository.findByDate(
    dateAppointment,
  );

  if (sameDateAppointments) {
    return response
      .status(400)
      .json({ error: 'This Appointment is already booked!' });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: dateAppointment,
  });

  return response.json(appointment);
});

export default appointmentsRoutes;
