import { Doctor } from "../models/doctor.model.js";
import { Hospital } from "../models/hospital.model.js";



const addDoctor = async (req, res) => {
    try {
      const { name, email, specialized, hospital } = req.body;
        
      const profilePic = req.file ? req.file.path : ''
      // Create a new instance of Doctor
      const newDoctor = new Doctor({
        name,
        email,
        profilePic,
        specialized,
        hospital, // Assuming hospital is an array of ObjectId referencing Hospital model
      });
      // Save the doctor to the database
      await newDoctor.save();
      await Hospital.updateMany(
        { _id: { $in: hospital } },
        { $push: { doctor: newDoctor._id } }
      );
      return res.json({
        success: true,
        message: "Doctor added successfully.",
        doctor: newDoctor,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Error while adding doctor.",
      });
    }
  };


const updateDoctor = async (req, res) => {
  try {
      const { id } = req.params;
      const { name, email, specialized } = req.body;
      
      // Check if there's a new profile picture uploaded
      const profilePic = req.file ? req.file.path : undefined;

      // Find the doctor by ID
      let doctor = await Doctor.findById(id);

      if (!doctor) {
          return res.status(404).json({
              success: false,
              message: "Doctor not found.",
          });
      }

      // Update fields if provided
      if (name) doctor.name = name;
      if (email) doctor.email = email;
      if (specialized) doctor.specialized = specialized;
      if (profilePic) doctor.profilePic = profilePic;

      // Save updated doctor to the database
      await doctor.save();

      return res.json({
          success: true,
          message: "Doctor updated successfully.",
          doctor,
      });
  } catch (err) {
      console.error(err);
      return res.status(500).json({
          success: false,
          message: "Error while updating doctor.",
      });
  }
};

export { addDoctor, updateDoctor };
