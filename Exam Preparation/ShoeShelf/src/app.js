import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import { homeView } from './views/home.js';
import { registerView } from './views/register.js';
import { loginView } from './views/login.js';
import { createView } from './views/create.js';

let main = document.getElementById('main-container');


page('/', middleware, homeView);
page('/index.html', middleware, homeView);
page('/register', middleware, registerView);
page('/login', middleware,loginView);
page('/create', middleware, createView);



setupNavigation();
page.start();


function middleware(context,next){
    context.render = (content) => render(content,main);
    context.setupNavigation = setupNavigation;
    next();
}


function setupNavigation(){
    let token = sessionStorage.getItem('authToken');
    if (token != null) {
        [...document.querySelectorAll('li.user')].forEach(x=>x.style.display = 'block');
        [...document.querySelectorAll('li.guest')].forEach(x=>x.style.display = 'none');
        document.getElementById('welcome-msg').textContent = `Welcome, ${sessionStorage.getItem('email')} |`;
    } else {
        [...document.querySelectorAll('li.user')].forEach(x=>x.style.display = 'none');
        [...document.querySelectorAll('li.guest')].forEach(x=>x.style.display = 'block');
    }
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    let token = sessionStorage.getItem('authToken');
    let response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: { 'X-Authorization': token }
    });

    if (response.ok) {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('authToken');
        setupNavigation();
        window.location.pathname = '/';
    }
});