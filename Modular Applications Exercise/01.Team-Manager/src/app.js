import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';

import {homeView} from '../views/home.js';
import {registerView} from '../views/register.js';
import {myTeamsView} from '../views/myTeams.js';
import {loginView} from '../views/login.js';
import {browseView} from '../views/browse.js';
import {createView} from '../views/create.js';
import {detailsView} from '../views/details.js';
import {editView} from '../views/edit.js';

let container = document.getElementById('container');


page('/', decorator,homeView);
page('/index.html', decorator,homeView);
page('/home', decorator, homeView);
page('/login', decorator, loginView);
page('/register', decorator, registerView);
page('/my-teams', decorator, myTeamsView);
page('/browse', decorator, browseView);
page('/create', decorator, createView);
page('/details/:id', decorator, detailsView);
page('/edit/:id', decorator, editView);


setupNavigation();
page.start();


async function decorator(context, next){
    context.render = (content) => render(content, container);
    context.setupNavigation = setupNavigation;
    next();
}

function setupNavigation(){
    let email = sessionStorage.getItem('email');
    if (email !== null) {
        [...document.getElementsByClassName('user')].forEach(x=>x.style.display = 'inline-block');    
        [...document.getElementsByClassName('guest')].forEach(x=>x.style.display = 'none');    
    } else {
        [...document.getElementsByClassName('user')].forEach(x=>x.style.display = 'none');    
        [...document.getElementsByClassName('guest')].forEach(x=>x.style.display = 'inline-block');
    }
}

document.getElementById('logoutBtn').addEventListener('click', async ()=>{
    let token = sessionStorage.getItem('authToken');
    let response = await fetch('http://localhost:3030/users/logout',{
        method: 'get',
        headers: {'X-Authorization': token}
    });

    if (response.ok) {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        setupNavigation();
        window.location.pathname = '/';
    }
});