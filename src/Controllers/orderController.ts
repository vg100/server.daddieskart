
import Order from '../Models/order';


export class orderController {
   static async createOrder(req, res, next) {
      try {
         const order = new Order(req.body);
         const newOrder = await order.save();
         res.status(201).json(newOrder);
      } catch (e) {
         next(e);
      }


   }

   static async getAllOrders(req, res, next) {
      try {
         const orders = await Order.find();
         res.json(orders);
      } catch (e) {
         next(e);
      }


   }

   static async getOrdersByUserId(req, res, next) {
      try {
         const orders = await Order.find({ user: req.params.userId });
         res.json(orders);
      } catch (e) {
         next(e);
      }


   }

   static async getOrdersByStatus(req, res, next) {
      try {
         const orders = await Order.find({ status: req.params.status });
         res.json(orders);
      } catch (e) {
         next(e);
      }


   }

   static async getOrdersById(req, res, next) {
      try {
         const order = await Order.findById(req.params.id);
         if (!order) {
            return res.status(404).json({ message: 'Order not found' });
         }
         res.json(order);
      } catch (e) {
         next(e);
      }


   }

   static async updateOrder(req, res, next) {
      try {
         const order = await Order.findById(req.params.id);
         if (!order) {
            return res.status(404).json({ message: 'Order not found' });
         }
         Object.assign(order, req.body);
         const updatedOrder = await order.save();
         res.json(updatedOrder);
      } catch (e) {
         next(e);
      }


   }

   static async deleteOrder(req, res, next) {
      try {
         const order = await Order.findById(req.params.id);
         if (!order) {
            return res.status(404).json({ message: 'Order not found' });
         }
         await order.remove();
         res.json({ message: 'Order deleted' });
      } catch (e) {
         next(e);
      }


   }

}