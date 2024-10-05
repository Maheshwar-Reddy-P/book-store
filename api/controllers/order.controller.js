import { createError } from "../helpers/error.js";
import { createSuccess } from "../helpers/success.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Book from "../models/Book.js";

export const placeOrder = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const cart = await Cart.findOne({userId: userId});
        const orderData = new Order({
            userId: userId,
            items: cart.items,
            orderTotal: cart.items.reduce((sum, item) => sum + item.totalPrice, 0),
            status: "Success"
        });
        await orderData.save();

        await Cart.updateOne(
            { userId: userId },
            { $set: { items: [] } }
        );

        return next(createSuccess(200, "Order Placed Successfully"));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
}

export const getOrderItems = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const orderItems = await Order.find({userId:userId}).sort({ createdAt: -1 });
        return next(createSuccess(200, "My Orders Fetched Successfully", orderItems));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
}

export const buyNow = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const bookId = req.body.bookId;
        const product = await Book.findById(bookId);

        const orderItem = new Order({
            userId: userId,
            items: [
                {
                    bookId: product._id,
                    bookName: product.title,
                    quantity: 1,
                    price: product.price,
                    totalPrice: product.price
                }
            ],
            orderTotal: product.price,
            status: "Success"
        });
        await orderItem.save();
        return next(createSuccess(200, "Order Placed Successfully"));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
}