import Product from "../Models/product";
import Seller from "../Models/seller";
import SearchFeatures from "../Utils/searchFeatures";
import { Utils } from "../Utils/utils";

export class productController {
    static async getAllProducts(req, res, next) {
        try {

            const perPage: number = 12;
            const currentPage: number = parseInt(req.query.page) || 1;
            const searchFeatures = new SearchFeatures(Product.find(), req.query);

            searchFeatures
                .search()
                .filter()
                .pagination(perPage);

            const results = await searchFeatures.query.exec();

            const populateOptions = [
                { path: 'category', select: 'name description _id' },
                { path: 'seller', select: 'store' },
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
            });
        } catch (e) {
            next(e);
        }
    }
    static async getProductsById(req, res, next) {
        try {

            const product: any = await Product.findById(req.params.id)
                .populate({
                    path: 'seller',
                    select: 'store _id'
                }).populate({
                    path: 'productReviews',
                    populate: {
                        path: 'user',
                    }
                }).
                populate({
                    path: 'relatedProducts',
                });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (e) {
            next(e);
        }
    }

    static async createProduct(req, res, next) {
        const seller = req.seller
        try {

            const nProduct = {
                ...req.body,
                seller: seller?._id,
                specialOfferEndTime: Utils.calculateEndTime(req.body.specialOfferEndTime)
            }
            const product = new Product(nProduct);
            const updatedSeller = await Seller.findByIdAndUpdate(
                seller?._id,
                { $push: { products: product._id } },
                { new: true }
            );
            await Promise.all([product.save(), updatedSeller.save()]);
            res.status(201).json(product);

        } catch (e) {
            next(e);
        }
    }

    static async updateProduct(req, res, next) {
        try {
            const update={
                ...req.body,
                specialOfferEndTime:Utils.calculateEndTime(req.body.specialOfferEndTime)
            }
            const product = await Product.findByIdAndUpdate(req.params.id,update, { new: true })
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
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
            // await product.remove();
            res.json({ message: 'Product deleted' });
        } catch (e) {
            next(e);
        }
    }
    static async topProduct(req, res, next) {
        try {
            const product = await Product.find({ category: req.params.categoryId });
            res.json({ topDealsProducts: [] });
        } catch (e) {
            next(e);
        }
    }

    static async getProductsByCategoryId(req, res, next) {
        try {
            const product = await Product.find({ category: req.params.categoryId }).select('pincodes')
            res.json({
                product
            })
        } catch (e) {
            next(e);
        }
    }

    static async searchProducts(req, res, next) {


        try {
            const { query: searchTerm } = req.query;
            if (!searchTerm) {
                return res.status(400).json({ message: 'Search term is required' });
            }

            const products = await Product.find({
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                ]
            });
            res.json(products);
        } catch (e) {
            next(e);
        }
    }

    static async check_pincode(req, res, next) {
        const { pid, pincode } = req.params;
        try {
            const product: any = await Product.findById(pid);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            const isValid = product.pincodes.some(pc => pc === parseInt(pincode));
            if (!isValid) {
                return res.json({ isValid, message: 'Invalid pin code' });
            }

            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 7);

            res.json({ isValid, message: Utils.formatDate(deliveryDate) });

        } catch (e) {
            next(e);
        }
    }

}
