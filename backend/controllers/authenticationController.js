const UserSchema = require("../models/userModel");

const signin = async (req, res) => {
  let existingUser = "";

  const { email, password } = req.body;

  if (email === "") {
    return res.status(400).json({ message: "Please enter an Email" });
  }
  if (password === "") {
    return res.status(400).json({ message: "Please enter a Password" });
  }

  try {
    existingUser = await UserSchema.findOne({ email });
  } catch {
    return res.status(500).json({ message: "Something went wrong!" });
  }

  if (!existingUser) {
    return res.status(401).json({
      message: "Seems you don't have an account with us..please try signup",
    });
  }

  if (existingUser.password !== password) {
    return res.status(401).json({
      message: "You've entered incorrect credentials... Please try again",
    });
  }
};

const signup = async (req, res) => {
  let existingUser = "";
  const { name, email, password } = req.body;

  if (name === "" || email === "" || password === "") {
    return res.status(400).json({ message: "All fields are mandatory!" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password should be atleast 6 charecter length!" });
  }
  try {
    existingUser = await UserSchema.findOne({ email });
  } catch {
    return res.status(500).json({ message: "Something went wrong!" });
  }

  if (existingUser) {
    return res.status(400).json({
      message:
        "Email is already taken, Please try signin or use a different email!",
    });
  }

  const newUser = new UserSchema({
    name,
    email,
    password,
  });

  await newUser.save();
  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

exports.signin = signin;
exports.signup = signup;
