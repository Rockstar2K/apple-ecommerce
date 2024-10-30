import { Schema, model } from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true, default: 1, min: 1, max: 10000 },
  stock: { type: Number, required: true, default: 1, min: 0},
  category: { type: String, default: "iPhone", index: true },
  photo: {
    type: String,
    default: "https://www.flaticon.com/free-icon/product_1311095",
  },
});

schema.plugin(mongoosePaginator)

const Product = model(collection, schema);

export default Product;