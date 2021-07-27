import { html } from '../node_modules/lit-html/lit-html.js';

let loginTemplate = (onSubmit, message) => html`
            <section id="login">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Login</h1>
                    </header>
                    <form @submit=${onSubmit} id="login-form" class="main-form pad-large">
                    ${message ? html`<div class="error">${message}</div>` : ''}
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <input class="action cta" type="submit" value="Sign In">
                    </form>
                    <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
                    </footer>
                </article>
            </section>`;

export async function loginView(context) {
    let message = '';
    context.render(loginTemplate(onSubmit, message));
    async function onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');
        try {
            if (email == '' || password == '') {
                throw new Error('Fields cannot be empty');
            }

            let response = await fetch('http://localhost:3030/users/login', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                e.target.reset();
                let data = await response.json();
                sessionStorage.setItem('authToken', data.accessToken);
                sessionStorage.setItem('userId', data._id);
                sessionStorage.setItem('email', data.email);
                context.setupNavigation();
                context.page.redirect('/my-teams');
    
            } else {
                let error = await response.json();
                throw new Error(error.message);
            }

        } catch (err) {
            message = err.message;
            context.render(loginTemplate(onSubmit, message));
        }
    }
}