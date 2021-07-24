import page from './node_modules/page/page.mjs';
import { dashboardView } from './views/dashboard.js';
import {createView} from './views/create.js';
import {detailsView} from './views/details.js';
import {editView} from './views/edit.js';
import {loginView} from './views/login.js';
import {registerView} from './views/register.js';
import {myFurnitureView} from './views/myFurniture.js';
import { render } from './node_modules/lit-html/lit-html.js';


setupNavigation();


let container = document.querySelector('.container');

page('/', middleware, dashboardView);
page('/index.html', middleware, dashboardView);
page('/create', middleware, createView);
page('/details/:id', middleware, detailsView);
page('/edit/:id', middleware, editView);
page('/login', middleware, loginView);
page('/register', middleware, registerView);
page('/my-furniture', middleware, myFurnitureView);

page.start();

function middleware(context, next){
    context.render = (content) => render(content, container);
    context.setupNavigation = setupNavigation;
    next();
}

export function setupNavigation(){
    let email = sessionStorage.getItem('email');
    if (email !== null) {
        document.getElementById('user').style.display = 'inline-block';    
        document.getElementById('guest').style.display = 'none';    
    } else {
        document.getElementById('user').style.display = 'none';    
        document.getElementById('guest').style.display = 'inline-block'; 
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
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('authToken');
        setupNavigation();
        window.location.pathname = '/';
    }
});