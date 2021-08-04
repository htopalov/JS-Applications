import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';

let container = document.getElementById('main-container');

page('/', decorator,homeView);
page('/index.html', decorator,homeView);
page('/register', decorator, registerView);
page('/login', decorator, loginView);
page('/create', decorator, createView);
page('/details/:id', decorator, detailsView);
page('/edit/:id', decorator,editView);


setupNavigation();
page.start();


function decorator(context,next){
    context.render = (content) => render(content,container);
    context.setupNavigation = setupNavigation;
    next();
}

function setupNavigation(){
    let token = sessionStorage.getItem('authToken');
    if (token != null) {
        document.getElementById('welcome-msg').textContent = `Welcome, ${sessionStorage.getItem('email')}`;
        [...document.querySelectorAll('.user')].forEach(x=>x.style.display = 'block');
        [...document.querySelectorAll('.guest')].forEach(x=>x.style.display = 'none');
    } else {
        [...document.querySelectorAll('.user')].forEach(x=>x.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(x=>x.style.display = 'block');
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