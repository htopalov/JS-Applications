import {html} from '../../node_modules/lit-html/lit-html.js';

let loginTemplate = (onSubmit) => html`
<section id="viewLogin">
    <h2>Login to your account:</h2>
    <form @submit=${onSubmit} id="formLogin">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" placeholder="Enter your Email">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter your Password">
        <input type="submit" class="login" value="Login">
    </form>
</section>`;

export async function loginView(context){
    context.render(loginTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');
        try{
            if (email == '' || password == '') {
                throw new Error('Fields cant be empty');
            }
            let response = await fetch('http://localhost:3030/users/login', {
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