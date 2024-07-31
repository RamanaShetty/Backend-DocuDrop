const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const Client = require("../models/clientModel");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send("Please fill in the creadentials");
  }
  try {
    const clientObj = { username, email };
    const hashPass = await hash(password, 12);
    clientObj.password = hashPass;
    const client = await new Client(clientObj).save();
    const token = sign({ username }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const client = await Client.findOne({ username }).lean();
    if (!client) return res.status(404).send("Invalid Credentials");
    const isMatch = await compare(password, client.password);
    if (!isMatch) return res.status(404).send("Wrong Password");
    const token = sign({ username }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};
