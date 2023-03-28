const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
// Route Files
// const EnquiryForm = require('./routes/EnquiryForm')
// const home = require("./routes/home");
// Load env vars
dotenv.config({ path: "./config/config.env" });

connectDB();
const EnquiryForm = require("./modals/EnquiryFormModal");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const filepath = path.resolve(__dirname, "views", "index.html");
const producthtml = path.resolve(__dirname, "views", "product.html");
const faqhtml = path.resolve(__dirname, "views", "faq.html");
const termcondhtml = path.resolve(__dirname, "views", "terms_conditions.html");

// Mount router
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*",
    });
    // res.redirect('index.html');
    res.sendFile(filepath);
});
app.post("/", async (req, res) => {
    const { name, email, phone, country, message } = req.body;
    const enquiryform = await EnquiryForm.create({
        name,
        email,
        phone,
        country,
        message,
    });
    console.log(req.body);
    res.sendFile(filepath);
});
app.get('/product', (req, res) => {
    res.sendFile(producthtml);
});
app.get('/faq', (req, res) => {
    res.sendFile(faqhtml);
});
app.get('/terms-cond', (req, res) => {
    res.sendFile(termcondhtml);
});

// app.use('/api/v1/home', home);
// app.use('/api/v1/EnquiryForm', EnquiryForm);

const PORT = process.env.PORT || 5501;

app.listen(PORT, () => {
    console.log(
        `Dhiman's running in ${process.env.NODE_ENV} mode on port ${PORT}!`
    );
});
