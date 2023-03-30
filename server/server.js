const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
// const fileUpload = require('express-fileupload');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const addProductModal = require('./modals/addProductModal');
const EnquiryForm = require("./modals/EnquiryFormModal");
const upload = require('./Middleware/upload');
bodyParser = require('body-parser');
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

// app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// app.use(fileupload());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.text({ type: '/' }));


// Set static folder
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static('uploads'));

const filepath = path.resolve(__dirname, "views", "index.html");
const producthtml = path.resolve(__dirname, "views", "product.html");
const faqhtml = path.resolve(__dirname, "views", "faq.html");
const termcondhtml = path.resolve(__dirname, "views", "terms_conditions.html");
const addProductHtml = path.resolve(__dirname, "views", "admin-product-update.html");

// Mount router
// Get Home page
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*",
    });
    res.sendFile(filepath);
});

// Enquiry Form
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

// get product page
app.get('/product', (req, res) => {
    res.sendFile(producthtml);
});

// get Faq Page
app.get('/faq', (req, res) => {
    res.sendFile(faqhtml);
});

// Get T&C Page
app.get('/terms-cond', (req, res) => {
    console.log(req.body);
    res.sendFile(termcondhtml);
});

// Get addproduct Page admin only
app.get('/addProduct', (req, res) => {
    res.sendFile(addProductHtml);
});

// Post addproduct Page admin only
app.post('/addProduct', upload.array('image', 10), async (req, res) => {
    // console.log(req.body);
    console.log(req.files)
    // let ProductSub = new addProductModal({
    let ProductSub = {
        title: req.body.title,
        description: req.body.description,
        price: {
            exwork: req.body.exwork,
            fob: req.body.fob
        },
        moq: req.body.moq,
        category: req.body.category,
        specifications: {
            color: req.body.color,
            dimensions: {
                length: req.body.length,
                bredth: req.body.bredth,
                height: req.body.height
            },
            features: req.body.features
        },
        offers: req.body.offers
    }
    //})
    if (req.files) {
        let path = ''
        req.files.forEach(function (files, index, arr) {
            path = path + files.path + ','
        })
        path = path.substring(0, path.lastIndexOf(","))
        ProductSub.image = path
    }
    else {
        console.log("files are not present")
    }
    // console.log(ProductSub);
    const product = await addProductModal.create(ProductSub);
    console.log(product)
    product.save()
        .then(response => {
            res.sendFile(filepath)
            // res.redirect('/')
        })
        .catch(error => {
            console.log("database me nahi gya")
            res.sendFile(filepath)
            // res.sendFile(addProductHtml)
            // res.redirect('/addProduct')
        })
})


const PORT = process.env.PORT || 5501;

app.listen(PORT, () => {
    console.log(
        `Dhiman's running in ${process.env.NODE_ENV} mode on port ${PORT}!`
    );
});
