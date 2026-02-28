const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../lib/utils");
const { sendWelcomeEmail } = require("../emails/emailHandler");
const cloudinary = require("../lib/cloudinary");


exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    //check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, email, password: hashedPassword });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);
      try {
        await sendWelcomeEmail(newUser.email, newUser.fullName, process.env.CLIENT_URL);
      } catch (error) {
        console.error("Error sending welcome email:", error);
      } 

      return res.status(201).json(
        {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic
        }
      );

    }
    else {
      return res.status(400).json({ message: "User registration failed" });
    }
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.login = async (req, res) => {
  const {email,password} = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);
    return res.status(200).json(
      {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic
      }
    );
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "development" ? false : true,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logout successful" });
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


exports.updateProfile = async(req,res)=>{
  try {
    const { profilePic } = req.body;
    if(!profilePic){
      return res.status(400).json({ message: "Profile picture is required" });
    }
    const userId = req.user._id;

    const uploadResult = await cloudinary.uploader.upload(profilePic,{
      folder: "chatNova/profilePics",
      resource_type: "image",
    });
   
    const updatedUser = await User.findByIdAndUpdate(userId,{
      profilePic: uploadResult.secure_url
    },{
      returnDocument: "after"
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}