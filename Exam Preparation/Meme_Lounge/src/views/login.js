import {html} from '../../node_modules/lit-html/lit-html.js';


let loginTemplate = (onSubmit) => html`
        <section id="login">
            <form @submit=${onSubmit} id="login-form">
                <div class="container">
                    <h1>Login</h1>
                    <label for="email">Email</label>
                    <input id="email" placeholder="Enter Email" name="email" type="text">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn button" value="Login">
                    <div class="container signin">
                        <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                    </div>
                </div>
            </form>
        </section>`;


export async function loginView(context){
    context.render(loginTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');
        try {
            if (email == '' || password == '') {
                throw new Error('All fields are required');
            }
            let response = await fetch('http://localhost:3030/users/login', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email,password})
            });

            if (response.ok) {
                let result = await response.json();
                sessionStorage.setItem('email', result.email);
                sessionStorage.setItem('authToken', result.accessToken);
                sessionStorage.setItem('userId', result._id);
                sessionStorage.setItem('gender', result.gender);
                sessionStorage.setItem('username', result.username);
                context.setupNavigation();
                context.page.redirect('/all-memes');
            } else {
                let error = await response.json();
                throw new Error(error.message);
            }
        } catch (err){
            return alert(err.message);
        }
    }
}