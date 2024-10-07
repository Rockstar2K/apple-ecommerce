function isUserValidData(req, res, next) {
    try {
        let { email, password, photo, role, isOnline } = req.body
        if (!email || !password) {
            const error = new Error("email and passoword are required")
            error.statusCode = 400
            throw error
        }
        if (!photo) {
            req.body.photo = "/public/assets/users/user-image.jpg"
        }
        if (!role) {
            req.body.role = 0
        }
        if (!isOnline) {
            req.body.isOnline = false
        }
        return next()

    } catch (error) {
        throw error
    }
}

export default isUserValidData