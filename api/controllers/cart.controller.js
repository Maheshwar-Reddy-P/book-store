import { createError } from "../helpers/error.js";
import { createSuccess } from "../helpers/success.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js";
import Book from "../models/Book.js";

export const addToBag = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const bookId = req.body.bookId;
        const cart = await Cart.findOne({userId:userId});
        // return next(createSuccess(200, userExists));
        const product = await Book.findById(bookId);
        // return next(createSuccess(200, userId));

        if (cart) {
            cart.items.push({
                bookId: product._id,
                bookName: product.title,
                quantity: 1,
                price: product.price,
                totalPrice: product.price
            });
            await cart.save();
        } else {
            const cartItem = new Cart({
                userId: userId,
                items: [
                    {
                        bookId: product._id,
                        bookName: product.title,
                        quantity: 1,
                        price: product.price,
                        totalPrice: product.price
                    }
                ]
            });
            await cartItem.save();
        }        
        return next(createSuccess(200, "Books Added to Bag Successfully"));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
        // return next(createError(500, error));
    }
}

export const getBagItems = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const cartItems = await Cart.findOne({userId:userId});
        return next(createSuccess(200, "Books in the Cart Fetched Successfully", cartItems));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
}

export const updateBookQuantity = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const bookId = req.body.bookId;
        const newQuantity = req.body.newQuantity;

        const cartItem = await Cart.findOne(
            { userId: userId, "items.bookId": bookId },
            { "items.$": 1, _id: 0 }
        );
        const totalPrice = newQuantity * cartItem.items[0].price;
        const result = await Cart.updateOne(
            {userId: userId, "items.bookId": bookId},
            {$set: {
                "items.$.quantity": newQuantity,
                // "items.$.totalPrice": { $multiply: [newQuantity, "$items.price"] }
                "items.$.totalPrice": totalPrice
            }}
        );
        return next(createSuccess(200, "Quantity Updated Successfully"));
    } catch (error) {
        return next(createError(500, error));
    }
}

export const removeBagItem = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const bookId = req.body.bookId;

        const result = await Cart.updateOne(
            { userId: userId },
            { $pull: { items: { bookId: bookId } } }
        );
        return next(createSuccess(200, "Book Removed From Bag Successfully"));
    } catch (error) {
        return next(createError(500, error));
    }
}