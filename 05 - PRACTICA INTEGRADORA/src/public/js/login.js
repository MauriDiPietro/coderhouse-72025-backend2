const form = document.getElementById("form");
const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("password");

inputEmail.value = "";
inputPass.value = "";

form.onsubmit = async(e) => {
    try {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: inputEmail.value,
                password: inputPass.value
            })
        });
        console.log(response)
        if(!response.ok) throw new Error('Error en el login');
        window.location.replace('/users/current');
    } catch (error) {
        alert('Login failed')
        window.location.reload()
    }
}