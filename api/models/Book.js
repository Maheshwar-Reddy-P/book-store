import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
    {
        author: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        imageLink: {
            type: String,
            required: true
        },
        language : {
            type: String,
            required: true
        },
        link : {
            type: String,
            required: true
        },
        pages : {
            type: String,
            required: true
        },
        title : {
            type: String,
            required: true
        },
        year : {
            type: String,
            required: true
        },
        price : {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Book", BookSchema);