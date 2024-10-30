import productsMongoManager from "../data/mongo/managers/product.manager.js";
import Controller from "./controller.js";

const productsController = new Controller(productsMongoManager, "PRODUCT")
const { create, readAll, read,  update, destroy, paginate } = productsController;


async function showpaginated(req, res, next) {
    try {
        let filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }
        const options = {
            page: req.query.page || 1,
            limit: 6,
          };
        const responseMongo = await productsMongoManager.paginate(filter, options)
        if (responseMongo.docs.length > 0) {
            return res.render("index", { data: responseMongo })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404;
            throw error
        }
    } catch (error) {
        return next(error)
    }
};

async function showProductsInIndex(req, res, next) {
    try {

        let filter = {};
        let all
        if (req.query.category) {
            filter.category = req.query.category;
        }
        all = await productsMongoManager.read(filter)
        if (all.length > 0) {
            return res.render("index", { data: all })
        } else {
            const error = new Error("PRODUCTS NOT FOUND")
            error.statusCode = 404;
            throw error
        }

    } catch (error) {
        return next(error)
    }
}


async function updateProductView(req, res, next) {
    try {
        const { pid } = req.params;
        const response = await productsMongoManager.readOne(pid)
        if (response) {
            return res.render("updateProduct", { data: response })
        } else {
            const error = new Error("PRODUCT NOT FOUND")
            error.statusCode = 404;
            throw error
        }

    } catch (error) {
        return next(error)
    }
}


const createProductView = (req, res, next) => {
    try {
        return res.render("createProduct")
    } catch (error) {
        return next(error)
    }
}

export { create, readAll, read,  update, destroy, paginate, showpaginated, showProductsInIndex, createProductView, updateProductView}