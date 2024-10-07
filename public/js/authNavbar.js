
document.addEventListener('DOMContentLoaded', () => {
  fetch('/users/getUserId', {
    method: 'GET',
    credentials: 'include',
  }).then(response => {
      if (response.status === 401) {
        document.getElementById('profileLink').style.display = 'none';
        return;
      }
      return response.json();
    })
    .then(data => {
      if (data && data.userId) {
        document.getElementById('profileLink').href = `/users/${data.userId}`;
        document.getElementById('profileLink').style.display = 'block';
      }
    })
    .catch(error => {
      console.error('Error obteniendo el userId:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const managerLink = document.getElementById('managerLink');

  fetch('/users/getUserId', {
    method: 'GET',
    credentials: 'include',
  })
    .then(response => {
      if (response.status === 401) {
        managerLink.style.display = 'none';
        return;
      }

      if (!response.ok) {
        throw new Error('Error de solicitud');
      }

      managerLink.style.display = 'block';
    })
    .catch(error => {
      console.error('Error de autenticación', error);
      managerLink.style.display = 'none';
    });
});

document.getElementById('managerLink').addEventListener('click', (event) => {
  event.preventDefault();

  fetch('/products', {
    method: 'GET',
    credentials: 'include',
  })
    .then(response => {
      if (response.status === 401) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Must login first"
          });
        window.location.href = '/users/login';
        return;
      }

      if (!response.ok) {
        throw new Error('Bad request');
      }

      window.location.href = '/products';
    })
    .catch(error => console.error('Bad request', error));
});


document.getElementById('profileLink').addEventListener('click', (event) => {
  event.preventDefault();

  fetch(`${document.getElementById('profileLink').href}`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(response => {
      if (response.status === 401) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Must login first"
          });
        window.location.href = '/users/login';
        return;
      }

      if (!response.ok) {
        throw new Error('Bad request');
      }

      return window.location.href = document.getElementById('profileLink').href
    })
});

