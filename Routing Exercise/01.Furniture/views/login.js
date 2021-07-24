import { html } from "../node_modules/lit-html/lit-html.js";

let loginTemplate = (onSubmit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`;

export async function loginView(context) {
    context.render(loginTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');

        if (email == '' || password == '') {
            [...e.target.querySelectorAll('input')].filter(x => x.value == '').forEach(x => x.classList.add('is-invalid'));
            return alert('All fields are required!');
        }
        [...e.target.querySelectorAll('input')].forEach(x => x.classList.remove('is-invalid'));


        let response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            let data = await response.json();
            sessionStorage.setItem('authToken', data.accessToken);
            sessionStorage.setItem('userId', data._id);
            sessionStorage.setItem('email', data.email);
            context.setupNavigation();
            context.page.redirect('/');
        } else {
            let error = await response.json();
            alert(error.message);
        }
    }
}