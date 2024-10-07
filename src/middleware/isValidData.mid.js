function isValidData(req, res, next) {
    try {
        let { title, photo, category, price, stock } = req.body
        if (!title) {
            const error = new Error("title is required")
            error.statusCode = 400
            throw error
        }
        if (isNaN(price) || price <= 0) {
            const error = new Error("price must be a valid number")
            error.statusCode = 400
            throw error
        }
        if (isNaN(stock) || stock < 0) {
            const error = new Error("stock must be a valid number")
            error.statusCode = 400
            throw error
        }
        if (!photo) {
            req.body.photo = "/public/assets/products/products-image.jpg"
        }
        if (!category) {
            req.body.category = "none"
        }
        if (!price) {
            req.body.price = 1
        }
        if (!stock) {
            req.body.stock = 1
        }
        return next()

    } catch (error) {
        throw error
    }
}

export default isValidData