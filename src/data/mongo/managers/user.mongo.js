import User from "../models/user.model.js";

class UsersMongoManager {
    async create(data){
        try {
            const one = await User.create(data)
            return one
        } catch (error) {
            throw error
        }
    } 
    async readAll(filter){
        try {
            const all = await User.find(filter)
            return all
        } catch (error) {
            throw error
        }
    }
    async readOne(sid){
        try {
            const one = await User.findById(sid)
            return one
        } catch (error) {
            throw error
        }
    }
    async update(sid, data){
        try {
            const opts = {new: true}
            const one = await User.findByIdAndUpdate(sid, data, opts)
            return one
        } catch (error) {
            throw error
        }
    }
    async destroy(sid){
        try {
            const one = await User.findByIdAndDelete(sid)
            return one 
        } catch (error) {
            return  error
        }
    }

}

const usersMongoManager = new UsersMongoManager()
export default usersMongoManager