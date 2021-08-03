import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { profileView } from './views/profile.js';
import { registerView } from './views/register.js';
import { searchView } from './views/search.js';

let main = document.getElementById('site-content');

page('/', decorator, homeView);
page('/login', decorator, loginView);
page('/register', decorator, registerView);
page('/all-listings', decorator, catalogView);
page('/create', decorator, createView);
page('/details/:id', decorator, detailsView);
page('/edit/:id', decorator, editView);
page('/my-listings', decorator, profileView);
page('/by-year', decorator, searchView);

setupNavigation();

page.start();

function decorator(context, next) {
    context.render = (content) => render(content, main);
    context.setupNavigation = setupNavigation;
    next();
}

function setupNavigation() {
    let username = sessionStorage.getItem('username');
    if (username != null) {
        document.getElementById('profile').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
        document.getElementById('welcome-msg').textContent = `Welcome ${username}`;
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    let token = sessionStorage.getItem('authToken');
    let response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: { 'X-Authorization': token }
    });
    if (response.ok) {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('authToken');
        setupNavigation();
        window.location.pathname = '/';
    }
});