import {html} from '../../node_modules/lit-html/lit-html.js';
import { notificationView } from './notification.js';

let registerTempplate = (onSubmit) => html`
        <section id="register">
            <form @submit=${onSubmit} id="register-form">
                <div class="container">
                    <h1>Register</h1>
                    <label for="username">Username</label>
                    <input id="username" type="text" placeholder="Enter Username" name="username">
                    <label for="email">Email</label>
                    <input id="email" type="text" placeholder="Enter Email" name="email">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <label for="repeatPass">Repeat Password</label>
                    <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                    <div class="gender">
                        <input type="radio" name="gender" id="female" value="female">
                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="male" value="male" checked>
                        <label for="male">Male</label>
                    </div>
                    <input type="submit" class="registerbtn button" value="Register">
                    <div class="container signin">
                        <p>Already have an account?<a href="/login">Sign in</a>.</p>
                    </div>
                </div>
            </form>
        </section>`;





export async function registerView(context){
    context.render(registerTempplate(onSubmit));
    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get('email');
        let username = formData.get('username');
        let password = formData.get('password');
        let repeatPass = formData.get('repeatPass');
        let gender;
        if (document.getElementById('female').checked) {
            gender = 'female'
        } else {
            gender = 'male';
        }
        try {
            if (email == '' || password == '' || username == '' || repeatPass == '') {
                throw new Error('All fields are required');
            }
            if (password != repeatPass) {
                throw new Error('Passwords must match');
            }
            let response = await fetch('http://localhost:3030/users/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username,email,password,gender})
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
            notificationView(err.message);
            setTimeout(() => {
                document.getElementById('notifications').style.display = 'none';
            },3000);
        }
    }
}