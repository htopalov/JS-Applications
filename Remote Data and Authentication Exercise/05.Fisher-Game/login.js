document.querySelector('#register-form').addEventListener('submit', registerUser);
document.querySelector('#login-form').addEventListener('submit', loginUser);

function registerUser(e){
    e.preventDefault();
    let formData = new FormData(e.target);
    let password = formData.get('password');
    let rePass = formData.get('rePass');
    let email = formData.get('email');

    if (password !== rePass) {
        return alert('Password fields must match!');
    }

    fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email,
            password 
        })
    })
    .then(res=>res.json())
    .then(data=>{
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('id', data._id);
        window.location.pathname = './index.html';
    });
}

function loginUser(e){
    e.preventDefault();
    let formData = new FormData(e.target);
    let email = formData.get('email');
    let password = formData.get('password');

    fetch('http://localhost:3030/users/login',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email,
            password 
        })
    })
    .then(res=>res.json())
    .then(data=>{
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('id', data._id);
        window.location.pathname = './index.html';
    });
}
