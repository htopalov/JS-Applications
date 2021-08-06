import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';

let root = document.getElementById('root');


page('/', middleware, homeView);
page('/index.html', middleware, homeView);
page('/register', middleware, registerView);
page('/login', middleware, loginView);
page('/details/:id', middleware, detailsView);
page('/edit/:id', middleware, editView);



setupNavigation();
page.start();

function middleware(context,next){
    context.render = (content) => render(content,root);
    context.setupNavigation = setupNavigation;
    next();
}

function setupNavigation(){
    let token = sessionStorage.getItem('authToken');
    if (token != null) {
        document.getElementById('message-name').textContent = sessionStorage.getItem('email') + '!';
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