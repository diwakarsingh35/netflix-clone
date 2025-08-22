const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // adjust if your path is different
require("dotenv").config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = new User({
      name: "Super Admin",
      email: "admin@gmail.com",   // 👈 same as you use to login
      password: hashedPassword,   // 👈 hashed password
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin created successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
  }
};

createAdmin();
