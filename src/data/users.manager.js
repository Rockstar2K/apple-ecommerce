import fs from 'fs'
import crypto from 'crypto'

class UsersManager {
    constructor(path) {
        this.path = path
        this.exists()
    }

    exists() {
        const exists = fs.existsSync(this.path)
        if (!exists) {
            fs.writeFileSync(this.path, JSON.stringify([], null, 1))
            console.log("file created");
        } else {
            console.log("file already exists");
        }
    }

    async read(role) {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const parsedData = JSON.parse(data)
            if (!role) {
                return parsedData
            } else {
                const filteredData = parsedData.filter((each) => each.role == role)
                return filteredData
            }

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async create(data) {
        try {
            data.id = crypto.randomBytes(12).toString("hex")
            const all = await this.read()
            all.push(data)
            const stringAll = JSON.stringify(all, null, 1)
            fs.promises.writeFile(this.path, stringAll)
            return data.id

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async readOne(id) {
        try {
            const all = await this.read()
            const one = all.find((each) => each.id === id)
            return one
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async readByEmail(email) {
        try {
            const all = await this.read()
            const one = all.find((each) => each.email === email)
            return one
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async update(id, newData) {
        try {
            const all = await this.read()
            const index = all.findIndex((each) => each.id === id)
            if (index === -1) {
                return null
            }
            all[index] = { ...all[index], ...newData }
            const stringAll = JSON.stringify(all, null, 1)
            await fs.promises.writeFile(this.path, stringAll);
            return all[index]
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async delete(id) {
        try {
            const all = await this.read()
            const filteredProds = all.filter((each) => each.id !== id)
            if (all.length === filteredProds.length) {
                return null
            }
            const stringAll = JSON.stringify(filteredProds, null, 1)
            await fs.promises.writeFile(this.path, stringAll);
            return `User with id ${id} deleted`
        } catch (error) {
            console.log(error);
            throw error
        }
    }
};

const usersManager = new UsersManager("./src/data/fs/users.json")

export default usersManager