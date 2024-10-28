import Cart from "../models/cart.model.js";
import MongoManager from "./manager.js";

const cartsMongoManger = new MongoManager(Cart);

async function calculateTotal(id){
    try {
        const total = await Cart.aggregate([

            {$match: { user_id: new Types.ObjectId(id) }},
            {$lookup: { 
                foreignField:"_id",
                from:"products",
                localField:"product_id",
                as:"product_id"
            }},
            {$replaceRoot: {
                newRoot: {
                    $mergeObjects:[
                        {$arrayElemAt:["$product_id", 0]},
                        "$$ROOT"
                    ]
                }
            }},
            {$set:{subtotal:{$multiply:["$quantity", "$price"]}}},
            {$group: {_id: "$user_id", total: {$sum:"$subtotal"}}},
            {$project: {_id: 0,user_id:"$_id", total: "$total", date: new Date()}},
            {$lookup: { 
                foreignField:"_id",
                from:"users",
                localField:"user_id",
                as:"user_id"
            }},
            {$replaceRoot: {
                newRoot: {
                    $mergeObjects:[
                        {$arrayElemAt:["$user_id", 0]},
                        "$$ROOT"
                    ]
                }
            }},
            {$project: {_id: 0,user_id:0, password:0, role:0, __v:0, photo:0}}
        ])
        return total
    } catch (error) {
        throw error
    }
}


export default cartsMongoManger