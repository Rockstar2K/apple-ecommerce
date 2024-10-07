const socket = io();

document.querySelector("#filterByCategory").addEventListener("change", () => {
    const selectedCategory = document.querySelector("#filterByCategory").value;
    socket.emit("search products", selectedCategory);
});

socket.on("products filtered", (products) => {
    const productList = products.map(product => `
            <div class="col-md-4 mb-4">
      <div class="card mx-auto" style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <a class="product" href="/products/${product.id}">${product.title}</a>
          </li>
        </ul>
      </div>
    </div>

    `).join("");
    document.querySelector("#grid-container").innerHTML = productList; // Actualizar el contenido de la sección de productos
});