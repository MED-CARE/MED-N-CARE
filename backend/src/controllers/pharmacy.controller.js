import { Pharmacy } from "../models/pharmacy.model.js";



const addPharmacy = async (req, res) => {
    try {
        const {
          name,
          email,
          phoneNumber,
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
    
        const storePic = req.files ? req.files.map((file) => file.path) : [];
        const location = {
            type: 'Point',
            coordinates: [parseFloat(long), parseFloat(lat)], // Ensure coordinates are parsed as floats
          };
        const newPharmacy = new Pharmacy({
          name,
          email,
          phoneNumber,
          storePic,
          lat,
          long,
          address,
          city,
          state,
          pincode,
          gmapLink,
          website,
          rating,
          location
        });
    
        // Save the hospital to the database
        await newPharmacy.save();
    
        // Respond with success
        return res.json({
          success: true,
          message: "Pharmacy added successfully.",
          pharmacy: newPharmacy,
        });
      } catch (err) {
        console.log(err);
        return res.json({
          success: false,
          message: "Error while adding Pharmacy.",
        });
      }
  };

  
const pharmacyById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const pharmacy = await Pharmacy.findById(id);
  
      if (!pharmacy) {
        return res.json({
          success: false,
          message: "Pharmacy not found.",
        });
      }
      return res.json({
        success: true,
        message: "Pharmacy details found successfully.",
        pharmacy,
      });
    } catch (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "Error while finding Pharmacy.",
      });
    }
  };

  
const searchPharmacy = async (req, res) => {
    try {
      const { query } = req.query;
      const pharmacy = await Pharmacy.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { city: { $regex: query, $options: "i" } },
          { state: { $regex: query, $options: "i" } },
        ],
      });
  
      return res.json({
        success: true,
        message: "Pharmacy fetched successfully.",
        pharmacy,
      });
    } catch (err) {
      console.error(err);
      return res.json({
        success: false,
        message: "Error while searching Pharmacies.",
      });
    }
  };
  
  const nearbyPharmacy = async (req, res) => {
    try {
      const { lat, long } = req.query;
      const parsedLat = parseFloat(lat);
      const parsedLong = parseFloat(long);
      const pharmacy = await Pharmacy.find({
          location: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [parsedLong, parsedLat],
              },
              $maxDistance: 100000,
            },
          },
        });
  
      return res.json({
        success: true,
        message: "Nearby Pharmacy fetched successfully.",
        pharmacy,
      });
    } catch (err) {
      console.error(err);
      return res.json({
        success: false,
        message: "Error while searching Pharmacies.",
      });
    }
  };


const updatePharmacy = async (req, res) => {
  try {
      const { id } = req.params;
      const {
          name,
          email,
          phoneNumber,
          address,
          city,
          state,
          pincode,
          gmapLink,
          website,
          rating,
      } = req.body;
      
      // Check if there are new store pictures uploaded
      const storePic = req.files ? req.files.map((file) => file.path) : undefined;

      // Find the pharmacy by ID
      let pharmacy = await Pharmacy.findById(id);

      if (!pharmacy) {
          return res.status(404).json({
              success: false,
              message: "Pharmacy not found.",
          });
      }

      // Update fields if provided
      if (name) pharmacy.name = name;
      if (email) pharmacy.email = email;
      if (phoneNumber) pharmacy.phoneNumber = phoneNumber;
      if (address) pharmacy.address = address;
      if (city) pharmacy.city = city;
      if (state) pharmacy.state = state;
      if (pincode) pharmacy.pincode = pincode;
      if (gmapLink) pharmacy.gmapLink = gmapLink;
      if (website) pharmacy.website = website;
      if (rating) pharmacy.rating = rating;
      if (storePic) {
          pharmacy.storePic = pharmacy.storePic.concat(storePic);
      }

      // Save updated pharmacy to the database
      await pharmacy.save();

      return res.json({
          success: true,
          message: "Pharmacy updated successfully.",
          pharmacy,
      });
  } catch (err) {
      console.error(err);
      return res.status(500).json({
          success: false,
          message: "Error while updating pharmacy.",
      });
  }
};

export { addPharmacy, pharmacyById, searchPharmacy, nearbyPharmacy, updatePharmacy };
