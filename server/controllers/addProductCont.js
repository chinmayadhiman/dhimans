const addProductModal = require('../modals/addProductModal');
const uploads = require('../utils/cloudinaryUpload');
const path = require("path");
const addProductHtml = path.resolve(__dirname, "views", "admin-product-update.html");

// @desc    Upload product
// @route   POST /addProduct
// @access  private
exports.addProduct = async (req, res) => {
    try {
        const { title, description, price, moq, category, specifications, offers } = req.body;
        let image = "";
        // console.log(req.body);
        if (req.file) {
            const location = req.file.path;
            const result = await uploads(location);
            image = result.url;
            console.log(result.url);
        }
        // else {
        //     return next(error);
        // }
        const data = {
            title, description, price, moq, category, image, specifications, offers
        }
        const Product = await addProductModal.create(req.body);
        console.log(Product);
        // return res.status(200).json({ success: true });
        res.sendFile(addProductHtml);

    } catch (error) {
        // return res.status(500).json({ success: "not added" });
        res.sendFile(addProductHtml);
    }
}
exports.deleteProduct = async (req, res) => {
    try {
        const { _id } = req.params.id;
        if (!_id)
            return res.status(404).json({ message: "Invalid Request" })

        const data = await addProductModal.findByIdAndDelete(_id);

        return res.status(201).json({ data });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}