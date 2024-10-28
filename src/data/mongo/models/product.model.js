import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true, default: 1,  default: 1, min: 1 },
  stock: { type: Number, required: true, default: 1, min: 0},
  category: { type: String, default: "iPhone" },
  photo: {
    type: String,
    dafault: "https://www.flaticon.com/free-icon/product_1311095",
  },
});

schema.plugin(mongoosePaginate)

const Product = model(collection, schema);

export default Product;