import fs from "fs";
import crypto from "crypto";

class CartManager {
  constructor(path) {
    this.path = path;
    this.exists();
  }

  exists() {
    const exist = fs.existsSync(this.path);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([]));
      console.log("Cart file created");
    } else {
      console.log("Cart file already exists");
    }
  }

  // Method to read all carts
  async readAll() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Method to create a new cart
  async create() {
    try {
      const newCart = {
        id: crypto.randomBytes(12).toString("hex"),
        products: [],
      };
      const allCarts = await this.readAll();
      allCarts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, 2));
      return newCart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Method to find a cart by ID
  async read(id) {
    try {
      const allCarts = await this.readAll();
      return allCarts.find((cart) => cart.id === id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Method to update a cart (modify products)
  async update(id, newData) {
    try {
      const allCarts = await this.readAll();
      const index = allCarts.findIndex((cart) => cart.id === id);
      if (index === -1) {
        return null;
      }
      allCarts[index] = { ...allCarts[index], ...newData };
      await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, 2));
      return allCarts[index];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Method to delete a cart
  async delete(id) {
    try {
      const allCarts = await this.readAll();
      const filteredCarts = allCarts.filter((cart) => cart.id !== id);
      if (allCarts.length === filteredCarts.length) {
        return null;
      }
      await fs.promises.writeFile(this.path, JSON.stringify(filteredCarts, null, 2));
      return `Cart with id ${id} deleted`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const cartManager = new CartManager("./src/data/files/cart.json");
export default cartManager;
