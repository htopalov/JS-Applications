import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { myDestinationsView } from './views/myDestinations.js';
import { registerView } from './views/register.js';

let main = document.getElementById('main-content');


page('/', decorator, homeView);
page('/index.html', decorator, homeView);
page('/register', decorator, registerView);
page('/login', decorator, loginView);
page('/create', decorator, createView);
page('/details/:id', decorator, detailsView);
page('/edit/:id', decorator, editView);
page('/destinations', decorator, myDestinationsView);

setupNavigation();

page.start();



function decorator(context,next){
    context.render = (content) => render(content,main);
    context.setupNavigation = setupNavigation;
    next();
}


function setupNavigation(){
    let token = sessionStorage.getItem('authToken');
    if (token != null) {
        document.getElementById('destinations').style.display = 'inline-block';
        document.getElementById('create').style.display = 'inline-block';
        document.getElementById('logout').style.display = 'inline-block';
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';
        document.getElementById('welcome-msg').textContent = `Welcome, ${sessionStorage.getItem('email')} |`;
    } else {
        document.getElementById('destinations').style.display = 'none';
        document.getElementById('create').style.display = 'none';
        document.getElementById('logout').style.display = 'none';
        document.getElementById('login').style.display = 'inline-block';
        document.getElementById('register').style.display = 'inline-block';
    }
}

document.getElementById('logout').addEventListener('click', async ()=>{
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