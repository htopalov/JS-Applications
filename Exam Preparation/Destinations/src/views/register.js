import {html} from '../../node_modules/lit-html/lit-html.js';

let registerTemplate = (onSubmit) => html`
<section id="viewRegister">
    <h2>Create your account:</h2>
    <form @submit=${onSubmit} id="formRegister">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" placeholder="Email">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Password">
        <label for="rePassword">Repeat Password:</label>
        <input type="password" id="rePassword" name="rePassword" placeholder="Repeat Password">
        <input type="submit" class="register" value="Register">
    </form>
</section>`;

export async function registerView(context){
    context.render(registerTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');
        let rePassword = formData.get('rePassword');
        try{
            if (email == '' || password == '' || rePassword == '') {
                throw new Error('Fields cant be empty');
            }
            if (password != rePassword) {
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