const socket = io()

const deleteProductBtns = document.querySelectorAll("#deleteProductBtn");

    deleteProductBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.currentTarget.value;
            socket.emit("erase product", id);
            let timerInterval;
Swal.fire({
  title: "Deleting product",
  timer: 1500,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log("I was closed by the timer");
  }
});
           
        });
    });
    socket.on("product erased", (id) => {
        const productElement = document.getElementById(id);
        if (productElement) {
            productElement.remove(); // Elimina el elemento del DOM
        }
    });