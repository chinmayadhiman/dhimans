const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const fileupload = require('express-fileupload')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
// Route Files
// const EnquiryForm = require('./routes/EnquiryForm')
// const home = require("./routes/home");
// Load env vars
const multer = require('multer');
const addProductModal = require('./modals/addProductModal');
const addProduct = require('./routes/addProductRoute');
dotenv.config({ path: "./config/config.env" });

connectDB();
const EnquiryForm = require("./modals/EnquiryFormModal");
const app = express();

app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));


// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const filepath = path.resolve(__dirname, "views", "index.html");
const producthtml = path.resolve(__dirname, "views", "product.html");
const faqhtml = path.resolve(__dirname, "views", "faq.html");
const termcondhtml = path.resolve(__dirname, "views", "terms_conditions.html");
const addProductHtml = path.resolve(__dirname, "views", "admin-product-update.html");

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
    // res.status(200).json({ success: true });
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
// var Storage = multer.diskStorage({
//     destination: "./public/images/",
//     filename: (req, file, cb) => {
//         cb(null, file, fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
// });

// var upload = multer({
//     storage: Storage
// }).single('file');
app.post('/addProduct', (req, res) => {
    res.sendFile(addProductHtml);
})
// app.post('/addProduct', upload, async (req, res) => {

//     // const { title, description, exwork, fob, moq, category, image, color, length, bredth, height } = req.body;
//     // var features = req.body.features;
//     // console.log(req.body.images);
//     // console.log(req.body);
//     const { title, description, price, moq, category, specifications, offers } = req.body;
//     const { image } = req.body.file;
//     const data = {
//         title, description, price, moq, category, image, specifications, offers
//     }
//     const Product = await addProductModal.create(data);
//     console.log(Product);
//     res.sendFile(addProductHtml);
//     // res.status(200).json({ success: true });
// })
app.use('/addProduct', addProduct);


// app.use('/api/v1/home', home);
// app.use('/api/v1/EnquiryForm', EnquiryForm);

const PORT = process.env.PORT || 5501;

app.listen(PORT, () => {
    console.log(
        `Dhiman's running in ${process.env.NODE_ENV} mode on port ${PORT}!`
    );
});
