const mongoose = require('mongoose');
const colors = require('colors')
mongoose.set("strictQuery", false);
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI
        , {
            useNewUrlParser: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
            useUnifiedTopology: true
        }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`.blue.bgBlack.underline);
};
module.exports = connectDB;