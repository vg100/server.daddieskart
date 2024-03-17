
import Cart from '../Models/cart';



export class cartController {
    static async getCart(req, res, next) {
        try {
            const cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name price');
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            res.json(cart);
        } catch (e) {
            console.log(e)
            next(e);
        }
    }

    static async addItem(req, res, next) {
        try {
            const { productId, quantity } = req.body;
            const cart = await Cart.findOne({ user: req.user._id });

            // Check if cart exists for the user
            if (!cart) {
                const newCart = new Cart({ user: req.user._id, items: [{ product: productId, quantity }] });
                await newCart.save();
                return res.status(201).json(newCart);
            }

            // Check if the product already exists in the cart
            const existingItem = cart.items.find(item => item.product.toString() === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }

            await cart.save();
            res.json(cart);
        } catch (e) {
            console.log(e)
            next(e);
        }


    }

    static async updateItemQuantityInCart(req, res, next) {
        try {
            const { productId } = req.params;
            const { quantity } = req.body;
            const cart = await Cart.findOne({ user: req.user._id });

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            const itemToUpdate = cart.items.find(item => item.product.toString() === productId);
            if (!itemToUpdate) {
                return res.status(404).json({ message: 'Item not found in cart' });
            }

            itemToUpdate.quantity = quantity;
            await cart.save();
            res.json(cart);
        } catch (e) {
            console.log(e)
            next(e);
        }


    }

    static async removeItem(req, res, next) {
        try {
            const { productId } = req.params;
            const cart = await Cart.findOne({ user: req.user._id });

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            cart.items = cart.items.filter(item => item.product.toString() !== productId);
            await cart.save();
            res.json(cart);
        } catch (e) {
            console.log(e)
            next(e);
        }


    }

}