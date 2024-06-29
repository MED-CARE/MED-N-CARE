import { Hospital } from "../models/hospital.model.js";

const getAllHospital = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    return res.json({
      success: true,
      message: "All Hospitals fetched successfully.",
      hospitals,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Error while fetching hospitals.",
    });
  }
};

const addHospital = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      type,
      desc,
      specialized,
      facilities,
      doctor,
      lat,
      long,
      address,
      city,
      state,
      pincode,
      gmapLink,
      website,
      review,
      rating,
    } = req.body;

    const image = req.files ? req.files.map((file) => file.path) : [];
    const location = {
      type: "Point",
      coordinates: [parseFloat(long), parseFloat(lat)], // Ensure coordinates are parsed as floats
    };
    const newHospital = new Hospital({
      name,
      email,
      phoneNumber,
      image,
      desc,
      type,
      specialized,
      facilities,
      doctor,
      lat,
      long,
      address,
      city,
      state,
      pincode,
      gmapLink,
      website,
      review,
      rating,
      location,
    });

    // Save the hospital to the database
    await newHospital.save();

    // Respond with success
    return res.json({
      success: true,
      message: "Hospital registered successfully.",
      hospital: newHospital,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Error while registering hospital.",
    });
  }
};

const hospitalById = async (req, res) => {
  try {
    const { id } = req.params;

    const hospital = await Hospital.findById(id).populate("doctor");
    if (!hospital) {
      return res.json({
        success: false,
        message: "Hospital not found.",
      });
    }
    return res.json({
      success: true,
      message: "Hospital details found successfully.",
      hospital,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Error while finding hospital.",
    });
  }
};

const searchHospitals = async (req, res) => {
  try {
    const { query } = req.query;
    const hospitals = await Hospital.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { state: { $regex: query, $options: "i" } },
      ],
    });

    return res.json({
      success: true,
      message: "Hospitals fetched successfully.",
      hospitals,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      success: false,
      message: "Error while searching hospitals.",
    });
  }
};
const nearbyHospitals = async (req, res) => {
  try {
    const { lat, long } = req.query;
    const parsedLat = parseFloat(lat);
    const parsedLong = parseFloat(long);
    const hospitals = await Hospital.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parsedLong, parsedLat],
          },
          $maxDistance: 100000,
        },
      },
    });

    return res.json({
      success: true,
      message: "Nearby hospitals fetched successfully.",
      hospitals,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      success: false,
      message: "Error while searching hospitals.",
    });
  }
};

const updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phoneNumber,
      type,
      desc,
      specialized,
      facilities,
      doctor,
      lat,
      long,
      address,
      city,
      state,
      pincode,
      gmapLink,
      website,
      rating,
    } = req.body;

    // Parse latitude and longitude as floats
    const latitude = parseFloat(lat) || 0;
    const longitude = parseFloat(long) || 0;
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        success: false,
        message: "Invalid latitude or longitude values.",
      });
    }

    // Handle image updates
    // const newImages = req.files ? req.files.map((file) => file.path) : [];

    // Find the hospital by ID
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found.",
      });
    }

    // Update the hospital fields
    hospital.name = name || hospital.name;
    hospital.email = email || hospital.email;
    hospital.phoneNumber = phoneNumber || hospital.phoneNumber;
    hospital.type = type || hospital.type;
    hospital.desc = desc || hospital.desc;
    hospital.specialized = specialized || hospital.specialized;
    hospital.facilities = facilities || hospital.facilities;
    hospital.doctor = doctor || hospital.doctor;
    hospital.lat = latitude || hospital.lat;
    hospital.long = longitude || hospital.long;
    hospital.address = address || hospital.address;
    hospital.city = city || hospital.city;
    hospital.state = state || hospital.state;
    hospital.pincode = pincode || hospital.pincode;
    hospital.gmapLink = gmapLink || hospital.gmapLink;
    hospital.website = website || hospital.website;
    hospital.rating = rating || hospital.rating;
    // hospital.image = [...hospital.image, ...newImages];
    hospital.location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    // Save the updated hospital
    await hospital.save();

    return res.json({
      success: true,
      message: "Hospital updated successfully.",
      hospital,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error while updating hospital.",
    });
  }
};

const nearbyOnlyHospitals = async (req, res) => {
  try {
    const { lat, long } = req.query;
    const parsedLat = parseFloat(lat);
    const parsedLong = parseFloat(long);
    const hospitals = await Hospital.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parsedLong, parsedLat],
          },
          $maxDistance: 100000, // Adjust the distance as per your requirement
        },
      },
      "type.0": "Hospital", // Filter based on the first element of the type array
    });

    return res.json({
      success: true,
      message: "Nearby hospitals fetched successfully.",
      hospitals,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      success: false,
      message: "Error while searching hospitals.",
    });
  }
};

const nearbyOnlyNursingHomes = async (req, res) => {
  try {
    const { lat, long } = req.query;
    const parsedLat = parseFloat(lat);
    const parsedLong = parseFloat(long);

    const nursingHomes = await Hospital.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parsedLong, parsedLat],
          },
          $maxDistance: 100000, // Adjust the distance as per your requirement
        },
      },
      "type.0": "Nursing Home", // Filter based on the first element of the type array
    });

    return res.json({
      success: true,
      message: "Nearby nursing homes fetched successfully.",
      nursingHomes,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      success: false,
      message: "Error while searching nursing homes.",
    });
  }
};

const nearbyOnlyClinics = async (req, res) => {
  try {
    const { lat, long } = req.query;
    const parsedLat = parseFloat(lat);
    const parsedLong = parseFloat(long);

    const clinics = await Hospital.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parsedLong, parsedLat],
          },
          $maxDistance: 100000, // Adjust the distance as per your requirement
        },
      },
      "type.0": "Clinic", // Filter based on the first element of the type array
    });

    return res.json({
      success: true,
      message: "Nearby clinics fetched successfully.",
      clinics,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      success: false,
      message: "Error while searching clinics.",
    });
  }
};

export {
  getAllHospital,
  addHospital,
  hospitalById,
  searchHospitals,
  nearbyHospitals,
  updateHospital,
  nearbyOnlyHospitals,
  nearbyOnlyNursingHomes,
  nearbyOnlyClinics,
};
