import {showHome} from './home.js';

async function onSubmit(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get('email');
    let password = formData.get('password');

    let response = await fetch('http://localhost:3030/users/login',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,password})        
    });

    if (response.ok) {
        event.target.reset();
        let data = await response.json();
        sessionStorage.setItem('authToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('email', data.email);
        document.getElementById('welcome-msg').textContent = `Welcome, ${email}`;
        Array.from(document.querySelectorAll('nav .user')).forEach( x=>x.style.display = 'block');
        Array.from(document.querySelectorAll('nav .guest')).forEach( x=>x.style.display = 'none');
        showHome();
    } else {
        let error = await response.json();
        alert(error.message);
    }
}

let main;
let section;

export function setupLogin(mainTarget,sectionTarget){
    main = mainTarget;
    section = sectionTarget;
    let form = section.querySelector('form');
    form.addEventListener('submit', onSubmit);
}



export async function showLogin(){
    main.innerHTML = '';
    main.appendChild(section);
}