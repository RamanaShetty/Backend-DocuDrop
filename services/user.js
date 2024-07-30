const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/Users");

exports.register = async (req, res, next) => {
  const { rollnumber, email, password } = req.body;
  if (!rollnumber || !email || !password) {
    return res.status(400).send("Please fill in all the required fields!!");
  }
  try {
    const userObj = { rollnumber, email };
    const hashedPwd = await hash(password, 12);
    userObj.password = hashedPwd;
    userObj.fieldIds = [];
    const user = await new User(userObj).save();
    const token = sign({ rollnumber }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.login = async (req, res, next) => {
  const { rollnumber, password } = req.body;
  try {
    const user = await User.findOne({ rollnumber }).lean();
    if (!user) return res.status(404).send("Invalid Credentials");
    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(404).send("Invalid Credentials");
    const token = sign({ rollnumber }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
