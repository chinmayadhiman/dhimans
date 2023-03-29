const express = require('express');
// const { addFood, getFoodById, getAllFoodsOfProvider, deleteFood } = require('../controllers/foods');
// const { isProvider } = require('../middleware/isProvider');
const { addProduct, deleteProduct } = require('../controllers/addProductCont');
const router = express.Router()
// const multer = require('multer')

router.route('/').post(addProduct);
router.route('/:id').post(deleteProduct);
// const storage = multer.diskStorage({
//     destination: "../images",
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });
// const upload = multer({ storage });

// router.post('/', isProvider, upload.single('ProductImage'), addFood)
// router.post('/', isProvider, upload.single('foodImage'), addFood)

// router.delete('/:_id', isProvider, deleteFood)
// router.delete('/:_id', isProvider, deleteFood)

// router.get('/provider/:_id', getAllFoodsOfProvider)

// router.get('/:_id', getFoodById);

module.exports = router;