
const socket = io()

document.querySelector("#registerBtn").addEventListener("click", (e) => {
    
    try {
        e.preventDefault()
        const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const photo = "/public/assets/users/user-image.jpg"
    const role = 0
    const isOnline = false
    const userData = { name, email, password, photo, role, isOnline }
    if (!email || !password) {
        const error = new Error("email and passoword are required")
        error.statusCode = 400
        throw error
    }
    if (!photo) {
        userData.photo = "/public/assets/users/user-image.jpg"
    }
    if (!role) {
        userData.role = 0
    }
    if (!isOnline) {
        userData.isOnline = false
    }
    socket.emit("new user", userData)
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "New user registred",
        showConfirmButton: false,
        timer: 1500
      });
    
    window.location.href = '/users/login'
        

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
          });
        throw error
    }
})

// socket.on("updated users", data => {
//     data = data.map(each => `<div>${each.name} - ${each.email}</div>`).join("")
//     document.querySelector("#update").innerHTML = data
// })