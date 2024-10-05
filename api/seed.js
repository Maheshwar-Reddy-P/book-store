import BookJson from './Bookstore.books.json' assert {type: "json"};
import Book from './models/Book.js';

export const seedBooksData = async () => {
    try {
        await Book.deleteMany({});
        await Book.insertMany(BookJson);
        console.log("Data Seeded Successfully");
    } catch (error) {
        console.log("Something Went Wrong");
    }   
}