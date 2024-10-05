import mongoose, { Schema }  from "mongoose";

const OrderSchema = mongoose.Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
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
        orderTotal: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);
export default mongoose.model("Order",OrderSchema);