const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db')
// Route Files
// const EnquiryForm = require('./routes/EnquiryForm')
const home = require("./routes/home")
// Load env vars
dotenv.config({ path: './config/config.env' });

connectDB();
const EnquiryForm = require('./modals/EnquiryFormModal')
const app = express();

app.use(
    express.urlencoded({ extended: true })
);

app.use(express.json());
app.use(express.static('public'))
const filepath = path.resolve(__dirname, '../index.html');
console.log(filepath);
// Mount router
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    // res.redirect('index.html');
    res.sendFile(filepath);
});
app.post("/", async (req, res) => {
    // var name = req.body.name;
    // var email = req.body.email;
    // var phno = req.body.phone;
    // var country = req.body.country;
    // var message = req.body.message;

    // var data = {
    //     "name": name,
    //     "email": email,
    //     "phone": phno,
    //     "country": country,
    //     "message": message
    // }
    const { name, email, phone, country, message } = req.body;
    const enquiryform = await EnquiryForm.create({ name, email, phone, country, message });

    // EnquiryForm.insertOne(data, (err, collection) => {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log("Record Inserted Successfully");
    // });

    res.sendFile(filepath);

})

// app.use('/api/v1/home', home);
// app.use('/api/v1/EnquiryForm', EnquiryForm);

const PORT = process.env.PORT || 5501;

app.listen(PORT, () => {
    console.log(`Dhiman's running in ${process.env.NODE_ENV} mode on port ${PORT}!`);
}); 