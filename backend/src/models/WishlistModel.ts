import mongoose from "mongoose";

interface Item extends mongoose.Document {
    name: string;
    currentprice: number;
}

interface Child extends mongoose.Document {
    firstname: string;
    lastname: string;
    age: number;
}

export interface WishlistModel extends mongoose.Document {
    year: number;
    child: Child;
    items: Item[];
}

const itemSchema = new mongoose.Schema({
    //id - auto increment?
    name: {
        required: true,
        type: String,
    },
    currentprice: {
        required: true,
        type: Number,
    },
});


const childSchema = new mongoose.Schema({
    //id - auto increment?
    firstname: {
        required: true,
        type: String,
    },
    lastname: {
        required: true,
        type: String,
    },
    age: {
        required: true,
        type: Number,
    },
});

const wishlistSchema = new mongoose.Schema({
    year: {
        required:true,
        type:Number
    },
    child: {
        required: true,
        type: childSchema
    },
    items: {
        required: true,
        type: [itemSchema]
    },
});

module.exports = mongoose.model<WishlistModel>('Wishlist', wishlistSchema);

