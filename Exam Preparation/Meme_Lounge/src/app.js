import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { landingView } from '../src/views/landingPage.js';
import { allMemesView } from '../src/views/allMemes.js';
import { loginView } from '../src/views/login.js';
import { registerView } from '../src/views/register.js';
import { createView } from '../src/views/create.js';
import { detailsView } from '../src/views/details.js';
import { editView } from '../src/views/edit.js';
import {profileView} from '../src/views/profile.js';

let main = document.getElementById('main-container');

page('/', decorator, landingView);
page('/login', decorator, loginView);
page('/register', decorator, registerView);
page('/create', decorator, createView);
page('/all-memes', decorator, allMemesView);
page('/details/:id', decorator, detailsView);
page('/edit/:id', decorator, editView);
page('/profile', decorator, profileView);

setupNavigation();
if (sessionStorage.getItem('email') == null) {
    page('/', decorator, landingView);
} else {
    page('/all-memes', decorator, allMemesView);
}

page.start();


function decorator(context, next) {
    context.render = (content) => render(content, main);
    context.setupNavigation = setupNavigation;
    next();
}


function setupNavigation() {
    let email = sessionStorage.getItem('email');
    if (email != null) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
        document.getElementById('welcome-msg').textContent = `Welcome, ${email}`;
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
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
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('gender');
        setupNavigation();
        window.location.pathname = '/';
    }
});