import { html } from '../node_modules/lit-html/lit-html.js';

let registerTemplate = (onSubmit, message) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form @submit=${onSubmit} id="register-form" class="main-form pad-large">
            ${message ? html`<div class="error">${message}</div>` : ''}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
        </footer>
    </article>
</section>`;


export async function registerView(context) {
    let message = '';
    context.render(registerTemplate(onSubmit, message));
    async function onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get('email');
        let username = formData.get('username');
        let password = formData.get('password');
        let repass = formData.get('repass');
        try {
            if (email == '' || username == '' || password == '' || repass == '') {
                throw new Error('Fields cannot be empty');
            }
            if (username.length < 3) {
                throw new Error('Username must be at least 3 characters long');
            }
            if (password.length < 3) {
                throw new Error('Password must be at least 3 characters/digits long');
            }
            if (password != repass) {
                throw new Error('Passwords must match');
            }

            let response = await fetch('http://localhost:3030/users/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password })
            });

            if (response.ok) {
                e.target.reset();
                let data = await response.json();
                sessionStorage.setItem('authToken', data.accessToken);
                sessionStorage.setItem('userId', data._id);
                sessionStorage.setItem('email', data.email);
                sessionStorage.setItem('username', data.username);
                context.setupNavigation();
                context.page.redirect('/my-teams');
    
            } else {
                let error = await response.json();
                throw new Error(error.message);
            }

        } catch (err) {
            message = err.message;
            context.render(registerTemplate(onSubmit, message));
        }

    }
}