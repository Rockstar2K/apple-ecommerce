import { Schema, Types, model } from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2"

//every product that the user adds to the cart generates a cart document with price, user, quantity data
const collection = "carts";
const schema = new Schema({
    product_id: {type: Types.ObjectId, ref: "products",  required: true},
    user_id: {type: Types.ObjectId, ref: "users", required: true},
    quantity: {type: Number, required: true, min: 1, default: 1},
    price: {type: Number, required: true},
    state: {type: String, default: "reserved", enum: ["reserved", "paid", "delivered"]}
})

schema.pre(
    //metodo a popular
    "find",
    //callback tradicional (no flecha) con las condiciones de populación
    function () {
        this.populate("user_id", "email -_id")
        this.populate("product_id", "title photo category")
    }
)

schema.pre(
    "findOne",
    function () {
        this.populate("user_id", "email -_id")
        this.populate("product_id", "title photo category")
    }
)

schema.pre(
    "findOneAndUpdate",
    function () {
        this.populate("user_id", "email -_id")
        this.populate("product_id", "title photo category")
    }
)

schema.pre(
    "findOneAndDelete",
    function () {
        this.populate("user_id", "email -_id")
        this.populate("product_id", "title photo category")
    }
)

schema.plugin(mongoosePaginator)

const Cart = model(collection, schema)
export default Cart