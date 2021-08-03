import { html } from "../../node_modules/lit-html/lit-html.js";


let loginTemplate = (onSubmit) => html`
<section id="login">
    <div class="container">
        <form @submit=${onSubmit} id="login-form">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>`;

export async function loginView(context){
    context.render(loginTemplate(onSubmit));
    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let username = formData.get('username');
        let password = formData.get('password');
        try {
            if (username == '' || password == '') {
                throw new Error('Fields can\'t be empty');
            }

            let response = await fetch('http://localhost:3030/users/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
            },
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
        } catch (err){
            return alert(err.message);
        }
    }
}