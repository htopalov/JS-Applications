//1
import { setupHome, showHome } from './home.js';
import { setupDetails } from './details.js';
import { setupLogin, showLogin } from './login.js';
import { setupRegister, showRegister } from './register.js';
import { setupCreate, showCreate } from './create.js';
import { setupEdit } from './edit.js';

//3
let main = document.querySelector('main');

//5
let links = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
    'createLink': showCreate
};

//4
setupSection('home-page', setupHome);
setupSection('add-movie', setupCreate);
setupSection('movie-details', setupDetails);
setupSection('edit-movie', setupEdit);
setupSection('form-login', setupLogin);
setupSection('form-sign-up', setupRegister);
setupNavigation();

showHome();//START APP IN HOME PAGE

//2
function setupSection(sectionId, setup) {
    let section = document.getElementById(sectionId);
    setup(main, section);
}

//6
function setupNavigation() {
    let email = sessionStorage.getItem('email');
    if (email !== null) {
        document.getElementById('welcome-msg').textContent = `Welcome, ${email}`;
        Array.from(document.querySelectorAll('nav .user')).forEach( x=>x.style.display = 'block');
        Array.from(document.querySelectorAll('nav .guest')).forEach( x=>x.style.display = 'none');    
    } else {
        Array.from(document.querySelectorAll('nav .user')).forEach( x=>x.style.display = 'none');
        Array.from(document.querySelectorAll('nav .guest')).forEach( x=>x.style.display = 'block');
    }
    
    document.querySelector('nav').addEventListener('click', (event) => {
        let view = links[event.target.id];
        if (typeof view == 'function') {
            event.preventDefault();
            view();
        }
    });
    document.getElementById('createLink').addEventListener('click', (event)=>{
        event.preventDefault();
        showCreate();
    });

    document.getElementById('logoutBtn').addEventListener('click', logout);
}

async function logout(){
    let token = sessionStorage.getItem('authToken');
    let response = await fetch('http://localhost:3030/users/logout',{
        method: 'get',
        headers: {'X-Authorization': token}
    });
    if (response.ok) {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('email');
        Array.from(document.querySelectorAll('nav .user')).forEach( x=>x.style.display = 'none');
        Array.from(document.querySelectorAll('nav .guest')).forEach( x=>x.style.display = 'block');

        showHome();
    }
}
