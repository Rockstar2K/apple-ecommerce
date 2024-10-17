import { Schema, model } from "mongoose";

const collection = "products";
const schema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, default: 1},
  stock: { type: Number, default: 1, min: 0},
  category: { type: String, default: "iPhone" },
  photo: {
    type: String,
    dafault: "https://www.flaticon.com/free-icon/product_1311095",
  },
});

const Product = model(collection, schema);

export default Product;