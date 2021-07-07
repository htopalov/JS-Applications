document.querySelector('form').addEventListener('submit', onLogin);

async function onLogin(e){
    e.preventDefault();
   let formData = new FormData(e.target);
   let email = formData.get('email');
   let password = formData.get('password');

   const response = await fetch('http://localhost:3030/users/login', {
       method: 'post',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({email,password})
   });

   if (!response.ok) {
       let error = await response.json();
       return alert(error.message);
   }
   let data = await response.json();
   sessionStorage.setItem('userToken', data.accessToken);
   window.location.pathname = 'index.html';
}