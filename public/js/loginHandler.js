
    document.addEventListener('DOMContentLoaded', () => {
        const loginForm = document.getElementById('login-form');
    
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 
    
            const email = event.target.email.value;
            const password = event.target.password.value;
    
            try {
                const response = await fetch('/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    window.location.href = '/';
                } else {
                   
                    
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: data.message
                      });
                }
            } catch (error) {
                console.error('Auth error:', error);
                alert('Something went wrong, please try again.');
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: 'Something went wrong, please try again.'
                  });
            }
        });
    });
    

