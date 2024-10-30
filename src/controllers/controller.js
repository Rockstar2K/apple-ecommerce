class Controller{

    constructor(manager, model){
        this.manager = manager;
        this.model = model
    }
        
    async create(req, res, next) {
        try {
            const data = req.body
            const response = await this.manager.create(data)
            return res.status(201).json({ message: this.model + "CREATED", response: response._id })

        } catch (error) {
            return next(error)
        }
    };

    async readAll(req, res, next) {
        try {
            const filter = req.query;
            const response = await this.manager.readAll(filter)
            if (response.lenght > 0) {
                return res.status(200).json({ message: this.model + "READ", response })
            } else {
                const error = new Error(this.model + "NOT FOUND");
                error.statusCode = 404;
                throw error;
            }
           
        } catch (error) {
            return next(error)
        }
    };

    async read(req, res, next) {
        try {
            const {id} = req.params;
            const response = await this.manager.read(id)
            if (response) {
                return res.status(200).json({ message: this.model + "READ", response })
            } else {
                const error = new Error(this.model + "NOT FOUND");
                error.statusCode = 404;
                throw error;
            }
           
        } catch (error) {
            return next(error)
        }
    };
    
    
    
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const newData = req.body;
            const responseManager = await this.manager.update(id, newData);
            if (!responseManager) {
                const error = new Error(`${this.model} with id ${id} doesnt exists`)
                error.statusCode = 404;
                throw error
            }
            return res.status(200).json({ message: this.model + "UPDATED", response: responseManager })
        } catch (error) {
            return next(error)
        }
    };
    
    async destroy(req, res, next) {
        try {
            const { id } = req.params;
            const response = await this.manager.delete(id);
            if (!response) {
                const error = new Error(`${this.model} with id ${id} not found`)
                error.statusCode = 404;
                throw error
            };
            return res.status(200).json({ message: this.model + "DELETED", response: response })
    
        } catch (error) {
            return next(error)
        }
    }

    //###########
    async paginate(req, res, next) {
        try {
            let filter = {};
            if (req.query.category) {
                filter.category = req.query.category;
            }
            const { page, limit } = req.query
            const response = await this.manager.paginate(filter, { page, limit })
            if (response.docs.length > 0) {
                return res.status(200).json({ response })
            } else {
                const error = new Error("NOT FOUND")
                error.statusCode = 404;
                throw error
            }
        } catch (error) {
            return next(error)
        }
    };
    
  

}

export default Controller;