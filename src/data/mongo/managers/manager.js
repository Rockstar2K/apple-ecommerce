import { Types } from "mongoose";

class MongoManager {
    constructor(model){
        this.model = model;
    }

    async create(data){
        try {
            const one = await this.model.create(data)
            return one
        } catch (error) {
            throw error
        }
    } 
    async readAll(filter){
        try {
            const all = await this.model.find(filter, "-__v").lean();
            return all
        } catch (error) {
            throw error
        }
    }
    paginate = async (filter, opts) => {
        try {
            const all = await this.model.paginate(filter, opts)
        } catch (error) {
            throw error
        }
    }
    async read(id){
        try {
            const one = await this.model.findOne({ _id: id }) //_id: id
            return one
        } catch (error) {
            throw error
        }
    }
    async update(id, data){
        try {
            const opts = {new: true}
            const one = await this.model.findOneAndUpdate({_id: id}, data, opts)
            return one
        } catch (error) {
            throw error
        }
    }
    async destroy(id){
        try {
            const one = await this.model.findOneAndDelete({_id: id})
            return one 
        } catch (error) {
            return  error
        }
    }

    calculateTotal = async (id) => {
        // sólo va a funcionar para carts!!!
        try {
          const total = await this.model.aggregate([
            // el método aggregate recibe como parametro un array de pasos/stages
            // cada paso es un objeto con las propiedades/operadores correspondientes a la operacion que necesito hacer en el paso
            // 1 $match productos de un usuario en el carrito
            { $match: { user_id: new Types.ObjectId(id) }},
            // 2 $lookup para popular los productos
            { $lookup: {
              foreignField: "_id",
              from: "products",
              localField: "product_id",
              as: "product_id" 
            }},
            // 3 $replaceRoot para mergear el objeto con el objeto cero del array populado
            { $replaceRoot: {
              newRoot: {
                $mergeObjects: [
                  { $arrayElemAt: ["$product_id", 0] },
                  "$$ROOT"
                ]
              }
            }},
            // 4 $set para agregar la propiedad subtotal = price*quantity
            { $set: { subtotal: { $multiply: ["$quantity","$price"]}}},
            // 5 $group para agrupar por user_id y sumar los subtotales
            { $group: { _id: "$user_id", total: { $sum: "$subtotal" }}},
            // 6 $project para limpiar el objeto (dejar sólo user_id, total y date)
            { $project: { _id: 0, user_id: "$_id", total: "$total", date: new Date() }},
            // 7 $lookup para popular los productos
            { $lookup: {
              foreignField: "_id",
              from: "users",
              localField: "user_id",
              as: "user_id" 
            }},
            // 8 $replaceRoot para mergear el objeto con el objeto cero del array populado
            { $replaceRoot: {
              newRoot: {
                $mergeObjects: [
                  { $arrayElemAt: ["$user_id", 0] },
                  "$$ROOT"
                ]
              }
            }},
            // 9 $project para limpiar el objeto
            { $project: { _id: 0, user_id: 0, password: 0, age: 0, role: 0, __v: 0 }},
          ])
          return total
        } catch (error) {
          throw error
        }
      }

}

const mongoManager = new MongoManager()
export default MongoManager