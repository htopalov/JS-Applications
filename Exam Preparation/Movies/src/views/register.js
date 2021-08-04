import {html} from '../../node_modules/lit-html/lit-html.js';

let registerTemplate = (onSubmit) =>html`
<section id="form-sign-up">
<form @submit=${onSubmit} class="text-center border border-light p-5">
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" placeholder="Email" name="email" value="">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" placeholder="Password" name="password" value="">
    </div>

    <div class="form-group">
        <label for="repeatPassword">Repeat Password</label>
        <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
    </div>

    <button type="submit" class="btn btn-primary">Register</button>
</form>
</section>`;




export async function registerView(context){
    context.render(registerTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeatPassword');
        try{
            if (email == '' || password == '' || repeatPassword == '') {
                throw new Error('Fields cannot be empty');
            }
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }
            if (password != repeatPassword) {
                throw new Error('Passwords must match');
            }
            let response = await fetch('http://localhost:3030/users/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email,password})
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
        } catch (err){
            return alert(err.message);
        }

    }
}