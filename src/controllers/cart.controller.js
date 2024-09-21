import cartManager from "../data/cart.manager.js"; // Adjust the path as needed

// Create a new cart
export const createNewCart = async (req, res) => {
    try {
        const newCart = await cartManager.create();
        res.status(201).json(newCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create a new cart" });
    }
};

// Get a cart by ID
export const getCartById = async (req, res) => {
    const { cid } = req.params; // Get the cart ID from the request parameters
    try {
        const cart = await cartManager.read(cid);
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve cart" });
    }
};

// Update a cart (e.g., add products)
export const updateCart = async (req, res) => {
    const { cid } = req.params; // Get the cart ID from the request parameters
    const { products } = req.body; // Get new products from the request body
    try {
        const updatedCart = await cartManager.update(cid, { products });
        if (!updatedCart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        res.json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update cart" });
    }
};

// Delete a cart
export const deleteCart = async (req, res) => {
    const { cid } = req.params; // Get the cart ID from the request parameters
    try {
        const result = await cartManager.delete(cid);
        if (!result) {
            return res.status(404).json({ error: "Cart not found" });
        }
        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete cart" });
    }
};

// Add product to cart
export const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params; // Get cart ID and product ID
    try {
        const cart = await cartManager.read(cid);
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        // Check if the product already exists in the cart
        const productIndex = cart.products.findIndex((item) => item.product === pid);
        if (productIndex > -1) {
            // If it exists, increment the quantity
            cart.products[productIndex].quantity += 1;
        } else {
            // If not, add a new product object
            cart.products.push({ product: pid, quantity: 1 });
        }

        // Update the cart
        await cartManager.update(cid, { products: cart.products });
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add product to cart" });
    }
};
