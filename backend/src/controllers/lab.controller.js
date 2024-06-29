import { Lab } from "../models/lab.model.js";



const addLab = async (req, res) => {
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
    
        const labPic = req.files ? req.files.map((file) => file.path) : [];
        const location = {
            type: 'Point',
            coordinates: [parseFloat(long), parseFloat(lat)], // Ensure coordinates are parsed as floats
          };
        const newLab = new Lab({
          name,
          email,
          phoneNumber,
          labPic,
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
        await newLab.save();
    
        // Respond with success
        return res.json({
          success: true,
          message: "Labs added successfully.",
          lab: newLab,
        });
      } catch (err) {
        console.log(err);
        return res.json({
          success: false,
          message: "Error while adding labs.",
        });
      }
  };

  
const labById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const lab = await Lab.findById(id);
  
      if (!lab) {
        return res.json({
          success: false,
          message: "Lab not found.",
        });
      }
      return res.json({
        success: true,
        message: "Lablabs details found successfully.",
        lab,
      });
    } catch (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "Error while finding Pharmacy.",
      });
    }
  };

  
const searchLab = async (req, res) => {
    try {
      const { query } = req.query;
      const pharmacy = await Lab.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { city: { $regex: query, $options: "i" } },
          { state: { $regex: query, $options: "i" } },
        ],
      });
  
      return res.json({
        success: true,
        message: "Labs fetched successfully.",
        pharmacy,
      });
    } catch (err) {
      console.error(err);
      return res.json({
        success: false,
        message: "Error while searching labs.",
      });
    }
  };
  
  const nearbyLabs = async (req, res) => {
    try {
      const { lat, long } = req.query;
      const parsedLat = parseFloat(lat);
      const parsedLong = parseFloat(long);
      const lab = await Lab.find({
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
        message: "Nearby labs fetched successfully.",
        lab,
      });
    } catch (err) {
      console.error(err);
      return res.json({
        success: false,
        message: "Error while searching labs.",
      });
    }
  };


const updateLab = async (req, res) => {
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
      const labPic = req.files ? req.files.map((file) => file.path) : undefined;

      // Find the pharmacy by ID
      let lab = await Lab.findById(id);

      if (!lab) {
          return res.status(404).json({
              success: false,
              message: "Labs not found.",
          });
      }

      // Update fields if provided
      if (name) lab.name = name;
      if (email) lab.email = email;
      if (phoneNumber) lab.phoneNumber = phoneNumber;
      if (address) lab.address = address;
      if (city) lab.city = city;
      if (state) lab.state = state;
      if (pincode) lab.pincode = pincode;
      if (gmapLink) lab.gmapLink = gmapLink;
      if (website) lab.website = website;
      if (rating) lab.rating = rating;
      if (labPic) {
          lab.labPic = lab.labPic.concat(labPic);
      }

      // Save updated pharmacy to the database
      await lab.save();

      return res.json({
          success: true,
          message: "Lab updated successfully.",
          pharmacy,
      });
  } catch (err) {
      console.error(err);
      return res.status(500).json({
          success: false,
          message: "Error while updating lab.",
      });
  }
};

export { addLab,labById, searchLab, nearbyLabs, updateLab };
