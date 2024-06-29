import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import sendMail, { sendWelcomeMail } from "../utils/nodemailer.util.js";
import otpGenerator from "otp-generator";
import { genToken, verifyToken } from "../utils/jwt.util.js";

const register = async (req, res) => {
  try {
    const {
      name,
      gender,
      age,
      email,
      phoneNumber,
      password,
      lat,
      long,
      height,
      weight,
      bloodGroup,
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already exists." });
    }
    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Please make a strong password.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = otpGenerator.generate(5, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const newUser = await User.create({
      name,
      gender,
      age,
      email,
      phoneNumber,
      "location.lat": lat || 22.569859,
      "location.long": long || 88.364241,
      password: hashedPassword,
      otp: otp,
    });
    if (newUser) {
      await sendMail(email, otp);
      return res.json({
        success: true,
        message: "User registered successfully.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Error while registering user.",
    });
  }
};
const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ success: false, message: "No user found." });
    }
    if (otp === existingUser.otp) {
      await User.findOneAndUpdate({ email }, { isVerified: true });
      sendWelcomeMail(email, existingUser.name);
      return res.json({
        success: true,
        message: "User verified.",
      });
    } else {
      return res.json({
        success: false,
        message: "Incorrect Otp.",
      });
    }
  } catch (error) {
    console.log(err);
    return res.json({
      success: false,
      message: "Error while veryfying email.",
    });
  }
};
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = otpGenerator.generate(5, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const user = await User.findOneAndUpdate({ email }, { otp: otp });
    await sendMail(email, otp);
    if (user) {
      return res.json({
        success: true,
        message: "Otp sent.",
      });
    }
  } catch (error) {
    console.log(err);
    return res.json({
      success: false,
      message: "Error resending otp.",
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password, lat, long } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ success: false, message: "No user found." });
    }
    if (!existingUser.isVerified) {
      return res.json({ success: false, message: "User not verified." });
    }
    const validUser = await bcrypt.compare(password, existingUser.password);
    if (validUser) {
      //   const token = jwt.sign(
      //     { id: existingUser._id },
      //     process.env.JWT_SECRET_KEY,
      //     { expiresIn: 3600 }
      //   );
      const token = genToken(existingUser._id, 8760);

      return res.json({
        success: true,
        message: "Login sucessful.",
        userid: existingUser._id,
        name: existingUser.name,
        gender: existingUser.gender,
        age: existingUser.age,
        email: existingUser.email,
        phoneNumber: existingUser.phoneNumber,
        biodata: existingUser.biodata,
        location: existingUser.location,
        address:existingUser.address,
        token: token,
      });
    } else {
      return res.json({ success: false, message: "Incorrect Password." });
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Error while logging in." });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      age,
      gender,
      height,
      weight,
      bloodGroup,
      address,
    } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        name,
        email,
        phoneNumber,
        age,
        gender,
        "biodata.height": height,
        "biodata.weight": weight,
        "biodata.bloodGroup": bloodGroup,
        address,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.json({ success: false, message: "User not found." });
    }

    return res.json({
      success: true,
      message: "User updated successfully.",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error while updating user." });
  }
};
const getUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    return res.json({
      success: true,
      message: "User found successfully.",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error while fetching user." });
  }
};
const getAllUsers = async (req, res) => {
  //   try {
  //     const token = req.header("x-auth-token");
  //     const verifiedUser = verifyToken(token);
  //     if (verifiedUser) {
  //       const users = await User.find();
  //       return res.json({
  //         success: true,
  //         message: "Data fetched!",
  //         users: users,
  //       });
  //     } else {
  //       return res.json({
  //         success: false,
  //         message: "Unauthorized access denied.",
  //       });
  //     }
  //   } catch (error) {
  //     return res.json({ success: false, message: "Unauthorized access denied." });
  //   }
};

export {
  register,
  verifyEmail,
  resendOtp,
  login,
  getAllUsers,
  updateUser,
  getUser,
};
