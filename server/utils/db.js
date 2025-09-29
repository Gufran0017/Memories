const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Database connected successflly");
    }
    catch (error) {
        console.log("Databse connecttion failed! ", error);
        process.exit(0);
    }
}

module.exports = connectDb;