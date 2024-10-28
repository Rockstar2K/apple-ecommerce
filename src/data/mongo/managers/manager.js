
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
            const all = await this.model.find(filter, "-__v")
            return all
        } catch (error) {
            throw error
        }
    }
    paginate = async (filter) => {
        try {
            const all = await this.model.paginate(filter)
        } catch (error) {
            throw error
        }
    }
    async readOne(id){
        try {
            const one = await this.model.findOne({_id: id})
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
            const one = await this.model.finOneAndDelete({_id: id})
            return one 
        } catch (error) {
            return  error
        }
    }

}

const mongoManager = new MongoManager()
export default MongoManager