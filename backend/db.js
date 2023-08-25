const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://21je1073:140523@cluster0.mhvomtl.mongodb.net/"

const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo")
};


module.exports = connectToMongo;
