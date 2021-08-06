import {html} from '../../node_modules/lit-html/lit-html.js';


let registerTemplate = (onSubmit) => html`
<h1>Register</h1>
<p class="form-info">Already registered?
    <a href="/login">Login now</a> and have some fun!
</p>

<form @submit=${onSubmit}>
    <div>
        <input type="email" name="email" placeholder="Email...">
    </div>
    <div>
        <input type="password" name="password" placeholder="Password">
    </div>
    <div>
        <input type="password" name="repass" placeholder="Re-password">
    </div>
    <div>
        <p class="message"></p>
        <button>Register</button>
    </div>
</form>`;

export async function registerView(context){
    context.render(registerTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');
        let repass = formData.get('repass');
        try {
            if (email == '' || password == '' || repass == '') {
                throw new Error('Fields cant be empty');
            }
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }
            if (password != repass) {
                throw new Error('Passwords must match');
            }
            let response = await fetch('http://localhost:3030/users/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });
            if (response.ok) {
                let result = await response.json();
                sessionStorage.setItem('email', result.email);
                sessionStorage.setItem('userId', result._id);
                sessionStorage.setItem('authToken', result.accessToken);
                context.setupNavigation();
                context.page.redirect('/');
            } else {
                let error = await response.json();
                throw new Error(error.message);
            }

        } catch(err){
            return alert(err.message);
        }
    }
}