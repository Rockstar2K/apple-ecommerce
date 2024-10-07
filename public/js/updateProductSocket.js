
const socket = io()

document.querySelector("#updateProductBtn").addEventListener("click", (e) => {

    try {
        e.preventDefault()
        const id = document.querySelector("#updateProductBtn").value
        const title = document.querySelector("#new-product-title").value
        const price = document.querySelector("#new-product-price").value
        const stock = document.querySelector("#new-product-stock").value
        const category = document.querySelector("#new-product-category").value
        const photo = "/public/assets/products/products-image.jpg"
        const updateProductData = { id, title, price, stock, category, photo }
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

        socket.emit("update product", updateProductData)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product updated",
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
});

socket.on("updated", (data) => {
    if (data && data.title && data.price && data.stock && data.category && data.id) {
        document.querySelector("#new-product-title").value = data.title;
        document.querySelector("#new-product-price").value = data.price;
        document.querySelector("#new-product-stock").value = data.stock;

        const categorySelect = document.querySelector("#new-product-category");
        categorySelect.value = data.category;

        document.querySelector("#updateProductBtn").value = data.id;
    } else {
        console.error("Datos insuficientes para actualizar el formulario.");
    }
});