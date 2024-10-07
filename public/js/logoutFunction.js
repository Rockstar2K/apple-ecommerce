function handleClick() {
    fetch('/users/logout', {
      method: 'POST',
      credentials: 'include', 
    })
    .then(response => {
      if (response.ok) {
        window.location.href = '/users/login';
      } else {
        console.error('Something went wrong');
      }
    })
    .catch(error => console.error('Error:', error));
    }