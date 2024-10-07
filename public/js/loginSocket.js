const socket = io()

document.querySelector("#loginBtn").addEventListener("click", (e) => {
  try {
    e.preventDefault()
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginData = { email, password }
    if (!email) {
      const error = new Error("Email is required")
      error.statusCode = 400
      throw error
    }
    if (!password) {
      const error = new Error("Password is required")
      error.statusCode = 400
      throw error
    }
    socket.emit("login", loginData)
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message
    });
    throw error
  }
})

socket.on('loginResponse', (data) => {
  if (data.success) {
    const { token, userId } = data;

    // Almacenar el token y el ID del usuario en localStorage
    localStorage.setItem('token', token); // Almacena el token
    localStorage.setItem('userId', userId); // Almacena el ID del usuario
    window.location.href = '/';
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: data.message
    });
  }
});