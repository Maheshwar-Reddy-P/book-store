import { createError } from "../helpers/error.js";
import { createSuccess } from "../helpers/success.js";
import Book from "../models/Book.js";
import Cart from "../models/Cart.js";

export const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        return next(createSuccess(200, "All Books Fetched", books));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
}

export const getBookDetails = async (req, res, next) => {
    try {
        const bookId = req.body.bookId;
        const userId = req.body.userId;
        let bookExistsInCart = false;
        const cartItem = await Cart.findOne(
            {userId: userId, "items.bookId": bookId},
            { projection: {"items.$": 1}}
        );

        if (cartItem) {
            bookExistsInCart = true;
        }

        const bookDetails = await Book.find({_id:bookId});
        let data = {
            bookDetails,
            bookExistsInCart
        }
        return next(createSuccess(200, "Book Details", data));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
}

export const getFilteredBooks = async (req, res, next) => {
    try {
        const searchVal = req.body.searchVal;
        const searchPattern = new RegExp(searchVal, 'i');
        const books = await Book.find({
            $or: [
                { title: { $regex: searchPattern } },
                { author: { $regex: searchPattern } }
            ]
        });
        return next(createSuccess(200, "All Books Fetched", books));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
}