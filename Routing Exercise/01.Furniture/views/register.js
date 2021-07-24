import { html } from "../node_modules/lit-html/lit-html.js";

let registerFormTemplate = (onSubmit) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
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
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>`;

export async function registerView(context) {
    context.render(registerFormTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');
        let rePass = formData.get('rePass');
        if (email == '' || password == '' || rePass == '') {
            [...e.target.querySelectorAll('input')].filter(x => x.value == '').forEach(x => x.classList.add('is-invalid'));
            return alert('All fields are required!');
        }
        if (password != rePass) {
            e.target.querySelector('#password').classList.add('is-invalid');
            e.target.querySelector('#rePass').classList.add('is-invalid');
            return alert('Password and repeat password must match!');
        }
        [...e.target.querySelectorAll('input')].forEach(x => x.classList.remove('is-invalid'));

        let response = await fetch('http://localhost:3030/users/register', {
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
            context.page.redirect('/');

        } else {
            let error = await response.json();
            alert(error.message);
        }
    }
}