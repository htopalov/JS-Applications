import {html} from '../../node_modules/lit-html/lit-html.js';

let loginTemplate = (onSubmit) => html`
<h1>Login</h1>
<p class="form-info">Don't have account?
    <a href="/register">Register now</a> and fix that!
</p>
<form @submit=${onSubmit}>
    <div>
        <input type="email" name="email" placeholder="Email...">
    </div>

    <div>
        <input type="password" name="password" placeholder="Password...">
    </div>
    <div> 
        <button>Login</button>
    </div>
</form>
`;

export async function loginView(context){
    context.render(loginTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');
        try {
            if (email == '' || password == '') {
                throw new Error('Fields cant be empty');
            }
            let response = await fetch('http://localhost:3030/users/login', {
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