
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
            const all = await this.model.find(filter)
            return all
        } catch (error) {
            throw error
        }
    }
    async readOne(pid){
        try {
            const one = await this.model.findById(pid)
            return one
        } catch (error) {
            throw error
        }
    }
    async update(pid, data){
        try {
            const opts = {new: true}
            const one = await this.model.findByIdAndUpdate(pid, data, opts)
            return one
        } catch (error) {
            throw error
        }
    }
    async destroy(pid){
        try {
            const one = await this.model.findByIdAndDelete(pid)
            return one 
        } catch (error) {
            return  error
        }
    }

}

const mongoManager = new MongoManager()
export default MongoManager