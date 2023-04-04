const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const addProductModal = require('./modals/addProductModal');
const EnquiryForm = require("./modals/EnquiryFormModal");
const upload = require('./Middleware/upload');
const addFaqModal = require("./modals/addFaqModal");
const addTandCModal = require("./modals/addTandCModal");
const bodyParser = require('body-parser');
const errorHandler = require('./Middleware/error')

dotenv.config({ path: "./config/config.env" });

const { protect, authorize } = require('./Middleware/auth');

// Router
const auth = require('./routes/auth')

connectDB();

const app = express();

app.use(express.json());

app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
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
const addFaqHtml = path.resolve(__dirname, "views", "admin-faq.html");
const addtandChtml = path.resolve(__dirname, "views", 'admin-tandc.html')

// Mount router
app.use('/auth', auth);

// Get Home page
app.get("/", async (req, res) => {
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
app.get('/product', async (req, res) => {
    res.sendFile(producthtml);
});

// get Faq Page
app.get('/faq', async (req, res) => {
    res.sendFile(faqhtml);
});

// Get T&C Page
app.get('/terms-cond', async (req, res) => {
    console.log(req.body);
    res.sendFile(termcondhtml);
});

// Get addproduct Page admin only
// app.get('/addProduct', protect, authorize('publisher'), async (req, res) => {
app.get('/addProduct', async (req, res) => {
    res.sendFile(addProductHtml);
});

// Post addproduct Page admin only
// app.post('/addProduct', protect, authorize('publisher'), upload.array('image', 10), async (req, res) => {
app.post('/addProduct', upload.array('image', 10), async (req, res) => {
    console.log(req.files)
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
    const product = await addProductModal.create(ProductSub);
    console.log(product)
    product.save()
        .then(response => {
            res.sendFile(filepath)
        })
        .catch(error => {
            console.log("database me nahi gya")
            res.sendFile(addProductHtml)
        })
})

// Add faq viw
// app.get('/addFaq', protect, authorize('publisher'), async (req, res) => {
app.get('/addFaq', async (req, res) => {
    res.sendFile(addFaqHtml);
});

// Add Faq
// app.post('/addFaq', protect, authorize('publisher'), async (req, res) => {
app.post('/addFaq', async (req, res) => {
    var faq = await addFaqModal.findOne({ category: req.body.category });
    if (faq == null || faq.category != req.body.category) {
        var category = req.body.category;
        var question = req.body.question;
        var answer = req.body.answer;
        var blog = req.body.answer;
        var youtube = req.body.youtube;
        var quesBody = [{ question, answer, blog, youtube }];
        var ans = {
            category,
            quesBody
        }
        const FaqData = await addFaqModal.create(ans);
        console.log(FaqData);
    }
    else {
        var ques_body = faq.quesBody;
        console.log(ques_body)
        var category = req.body.category;
        var question = req.body.question;
        var answer = req.body.answer;
        var blog = req.body.answer;
        var youtube = req.body.youtube;
        var quesBody1 = { question, answer, blog, youtube };
        ques_body.push(quesBody1);
        var data = await addFaqModal.deleteMany({ category: req.body.category });
        var insertData = await addFaqModal.create({ category: req.body.category, quesBody: ques_body });
        // console.log(insertData);
    }
    // res.status(200).json({ success: true });
    res.sendFile(addFaqHtml)
});

// View T and C
// app.get('/addTandC', protect, authorize('publisher'), async (req, res) => {
app.get('/addTandC', async (req, res) => {
    res.sendFile(addtandChtml);
});

// Post T and C
// app.post('/addTandC', protect, authorize('publisher'), async (req, res) => {
app.post('/addTandC', async (req, res) => {
    const data = await addTandCModal.deleteMany({});
    const insertdata = await addTandCModal.create({ payment: req.body.payment, shipment: req.body.shipment, TandC: req.body.TandC })
    console.log(insertdata);
    res.sendFile(addtandChtml);
});


app.use(errorHandler)

const PORT = process.env.PORT || 5501;

app.listen(PORT, () => {
    console.log(
        `Dhiman's running in ${process.env.NODE_ENV} mode on port ${PORT}!`
    );
});
