import Product from "../Models/product";

export class productController {
    static async getAllProducts(req, res, next) {
        try {
            const products = await Product.find()
                .populate({
                    path: 'category',
                    select: 'name description _id'
                  })
                .populate({
                    path: 'seller',
                    select: 'username email'
                  })
                .exec()
            res.json(products);
        } catch (e) {
            next(e);
        }
    }

    static async getProductsById(req, res, next) {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (e) {
            next(e);
        }
    }

    static async createProduct(req, res, next) {
        try {
            const nProduct = {
                ...req.body,
                seller: req.user._id
            }
            const product = new Product(nProduct);
            const newProduct = await product.save();
            res.status(201).json(newProduct);
        } catch (e) {
            next(e);
        }
    }

    static async updateProduct(req, res, next) {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            Object.assign(product, req.body);
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } catch (e) {
            next(e);
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            await product.remove();
            res.json({ message: 'Product deleted' });
        } catch (e) {
            next(e);
        }
    }
}