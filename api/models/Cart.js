import mongoose, { Schema }  from "mongoose";

const CartSchema = mongoose.Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
            unique: true
        },
        items: [
            {
              bookId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Book"
              },
              bookName: {
                type: String,
                required: true
              },
              quantity: {
                type: Number,
                required: true
              },
              price: {
                type: Number,
                required: true
              },
              totalPrice: {
                type: Number,
                required: true
              }
            }
        ],
    },
    {
        timestamps: true
    }
);
 export default mongoose.model("Cart",CartSchema);