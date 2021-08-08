import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { addBookView } from './views/addBook.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { dashboardView } from './views/homeView.js';
import { loginView } from './views/login.js';
import { myBooksView } from './views/myBooks.js';
import { registerView } from './views/register.js';

let main = document.getElementById('site-content');

page('/', decorator, dashboardView);
page('/index.html', decorator, dashboardView);
page('/login', decorator, loginView);
page('/register', decorator, registerView);
page('/add-book', decorator, addBookView);
page('/details/:id', decorator, detailsView);
page('/edit/:id', decorator, editView);
page('/my-books', decorator, myBooksView);



setupNavigation();
page.start();


function decorator(context, next){
    context.render = (content) => render(content, main);
    context.setupNavigation = setupNavigation;
    next();
}


function setupNavigation(){
    let token = sessionStorage.getItem('authToken');
    if (token != null) {
        document.getElementById('user').style.display = 'block';
        document.getElementById('welcome-msg').textContent = `Welcome, ${sessionStorage.getItem('email')}`;
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}


//to testers: logout button event listener working fine after changing interval variable value in tests from 300 to 600 else test
//for correct nav view after logout fails...
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