import {Appointment} from "../models/appointment.model.js";
import { Hospital } from "../models/hospital.model.js";
import { Doctor } from "../models/doctor.model.js";

import { sendAppointmentNotif } from "../utils/nodemailer.util.js"; 

const bookAppointment = async (req, res) => {
  try {
    const {
      user,
      hospital,
      doctor,
      appointmentDate,
      appointmentTime,
      userContact,
    } = req.body;

    const newAppointment = new Appointment({
      user,
      hospital,
      doctor,
      appointmentDate,
      appointmentTime,
      userContact,
    });
    const hospitalName = await Hospital.findById(hospital);
    const doctorName = await Doctor.findById(doctor);

    console.log(appointmentDate, appointmentTime)
    await newAppointment.save();
    await sendAppointmentNotif(userContact.email, userContact.name, hospitalName.name,doctorName.name, appointmentDate, appointmentTime)
    return res.json({
      success: true,
      message: "Appointment booked successfully.",
      appointment: newAppointment,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error while booking appointment.",
    });
  }
};


const updateAppointmentStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // Validate status
      if (!status) {
        return res.status(400).json({ success: false, message: 'Status is required.' });
      }
  
      // Find the appointment by ID and update its status
      const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
  
      if (!appointment) {
        return res.status(404).json({ success: false, message: 'Appointment not found.' });
      }
  
      return res.json({ success: true, message: 'Appointment status updated successfully.', appointment });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Error updating appointment status.' });
    }
  };

 

export { bookAppointment, updateAppointmentStatus };
