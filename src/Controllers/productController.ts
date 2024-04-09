import Product from "../Models/product";
import SearchFeatures from "../Utils/searchFeatures";
// import { topDealsProducts } from "../e-commerce/products";

export class productController {
    static async getAllProducts(req, res, next) {
        try {
       
            const perPage: number = 9;
            const currentPage: number = parseInt(req.query.page) || 1;
            const searchFeatures = new SearchFeatures(Product.find(), req.query);
    
            searchFeatures
                .search()
                .filter()
                .pagination(perPage);
    
            const results = await searchFeatures.query.exec();
    
            const populateOptions = [
                { path: 'category', select: 'name description _id' },
                { path: 'seller', select: 'username email' }
            ];
    
            await Product.populate(results, populateOptions);
            const totalProducts = await Product.countDocuments(searchFeatures.query.getQuery());
            const totalPages = Math.ceil(totalProducts / perPage);
            const hasNextPage = currentPage < totalPages;

            res.json({
                product: results,
                totalPages,
                currentPage,
                hasNextPage
            }); } catch (e) {
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
                seller: "65f6ff277a771d4cca1c8acd"
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
    static async topProduct(req, res, next) {
        try {
            // const product = topDealsProducts
            res.json({ topDealsProducts: [] });
        } catch (e) {
            next(e);
        }
    }



}