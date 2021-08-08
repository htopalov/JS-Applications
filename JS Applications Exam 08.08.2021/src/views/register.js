import { html } from '../../node_modules/lit-html/lit-html.js';


let registerTemplate = (onSubmit) => html`
<section id="register-page" class="register">
    <form @submit=${onSubmit} id="register-form">
        <fieldset>
            <legend>Register Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>`;

export async function registerView(context) {
    context.render(registerTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');
        let confirmPassword = formData.get('confirm-pass');
        try {
            if (email == '' || password == '' || confirmPassword == '') {
                throw new Error('All fields are required!');
            }
            if (password != confirmPassword) {
                throw new Error('Passwords must match');
            }
            let response = await fetch('http://localhost:3030/users/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
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

        } catch (err) {
            return alert(err.message);
        }
    }
}