import {html} from '../../node_modules/lit-html/lit-html.js';


let registerTemplate = (onSubmit) => html`
<section id="register">
    <div class="container">
        <form @submit=${onSubmit} id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>
            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>
            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>
            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>
            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>`;

export async function registerView(context){
    context.render(registerTemplate(onSubmit));
    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let username = formData.get('username');
        let password = formData.get('password');
        let repeatPass = formData.get('repeatPass');
        try {
            if (username =='' || password == '' || repeatPass == '') {
                throw new Error('All fields are required');
            }
            if (password != repeatPass) {
                throw new Error('Passwords must match');
            }

            let response = await fetch('http://localhost:3030/users/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username,password})
            });
            if (response.ok) {
                let result = await response.json();
                sessionStorage.setItem('username', result.username);
                sessionStorage.setItem('userId', result._id);
                sessionStorage.setItem('authToken', result.accessToken);
                context.setupNavigation();
                context.page.redirect('/all-listings');
                
            } else {
                let error = await response.json();
                throw new Error(error.message);
            }

        } catch(err) {
            return alert(err.message);
        }
    }
}