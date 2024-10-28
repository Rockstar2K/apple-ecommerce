import cartsMongoManger from "../data/mongo/managers/cart.manager.js";
import Controller from "./controller.js";

const cartController = new Controller(cartsMongoManger, "CART")
const { create, readAll, read,  update, destroy} = cartController;

async function calculateTotal(req, res, next){
    try {
        const { uid } = req.params;
        const response = await cartsMongoManager.calculateTotal(uid)
        return res.status(200).json({response})
    } catch (error) {
        return next(error)
    }
}

async function cartsView(req, res, next) {
    try {
        let filter = {};
        if (req.query.user_id) {
            filter.user_id = req.query.user_id;
        }
        const responseMongo = await cartsMongoManager.read(filter)
        console.log(responseMongo);
        if (responseMongo) {
            return res.render("carts", { data: responseMongo })
        } else {
            const error = new Error("CART NOT FOUND")
            error.statusCode = 404;
            throw error
        }

    } catch (error) {
        return next(error)
    }
}

export { create, readAll, read,  update, destroy}