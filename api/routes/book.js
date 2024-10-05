import express from 'express';
import { getBookDetails, getBooks, getFilteredBooks } from '../controllers/book.controller.js';
import { addToBag, getBagItems, updateBookQuantity, removeBagItem } from '../controllers/cart.controller.js';
import { placeOrder, getOrderItems, buyNow } from '../controllers/order.controller.js';

const router = express.Router();

router.get("/", getBooks);
router.post("/book-details", getBookDetails);
router.post("/add-to-bag", addToBag);
router.post("/get-bag", getBagItems);
router.post("/update-quantity", updateBookQuantity);
router.post("/remove-bag-item", removeBagItem);
router.post("/place-order", placeOrder);
router.post("/get-orders", getOrderItems);
router.post("/buy-now", buyNow);
router.post("/search-results", getFilteredBooks);

export default router;