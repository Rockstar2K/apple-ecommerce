import usersManager from "../data/users.manager.js";
import productsManager from "../data/products.manager.js"
import jwt from 'jsonwebtoken';

const socket = async (socket)=>{
    console.log(`Socket connected with ID: ${socket.id}`);
socket.on("new user", async data =>{
    
    const id = await usersManager.create(data)
    const allUsers = await usersManager.read()
    socket.emit("updated users", allUsers)
})
const allUsers = await usersManager.read()
socket.emit("updated users", allUsers)

socket.on("new product", async data=>{
    const id = await productsManager.create(data)
})

socket.on("erase product", async data=>{
    const id = await productsManager.delete(data)
    socket.emit("product erased", data);
})

socket.on("update product", async data=>{
    const id = await productsManager.update(data.id,data)
    const productUpdated = await productsManager.readOne(id)
    socket.emit("updated",productUpdated)
})

socket.on("search products", async data=>{
    const productsFiltered = await productsManager.read(data)
    socket.emit("products filtered", productsFiltered)
})

socket.on('login', async ({ email, password }) => {
    
    const user = await usersManager.readByEmail(email);
    if (!user || password !== user.password) {
      socket.emit('loginResponse', { success: false, message: 'Email or password not found' });
      return;
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const CLAVE='clave_secreta_super_segura' //Esta clave luego la moveré a una variable de entorno
    const token = jwt.sign(payload, CLAVE, { expiresIn: '1h' });

    socket.emit('loginResponse', { success: true, token, userId: user.id });
  });

}
export default socket