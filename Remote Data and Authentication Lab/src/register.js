document.querySelector('form').addEventListener('submit', onRegister);


async function onRegister(e){
    e.preventDefault();
   let formData = new FormData(e.target);
   let email = formData.get('email');
   let password = formData.get('password');
   let rePass = formData.get('rePass');

   if (email == '' || password == '') {
       return alert('Error: You must provide email and password!');
   } else if (password !== rePass) {
       return alert('Error: Passwords must match!');
   }

   const response = await fetch('http://localhost:3030/users/register', {
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
