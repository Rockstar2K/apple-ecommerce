
const socket = io()

document.querySelector("#createNewProductBtn").addEventListener("click", (e) => {
    
    try {
        e.preventDefault()
    const title = document.querySelector("#new-product-title").value
    const price = document.querySelector("#new-product-price").value
    const stock = document.querySelector("#new-product-stock").value
    const category = document.querySelector("#new-product-category").value
    const photo = "/public/assets/products/products-image.jpg"
    const newProductData = { title, price, stock, category, photo }
    if (!title) {
        const error = new Error("title is required")
        error.statusCode = 400
        throw error
    }
    if (!category) {
        const error = new Error("category is required")
        error.statusCode = 400
        throw error
    }
    if (isNaN(price) || price <= 0) {
        const error = new Error("price must be a valid number")
        error.statusCode = 400
        throw error
    }
    if (isNaN(stock) || stock <= 0) {
        const error = new Error("stock must be a valid number")
        error.statusCode = 400
        throw error
    }
    
    socket.emit("new product", newProductData)
    
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product created",
        showConfirmButton: false,
        timer: 1500
      }); 

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
          });
        throw error
    }
})
