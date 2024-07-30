const mongoose = require("mongoose");

module.exports = async (server) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connection success...`);

    await server.listen(process.env.PORT || 8080, () => {
      console.log(`Server is listening on port - ${process.env.PORT || 8080}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
