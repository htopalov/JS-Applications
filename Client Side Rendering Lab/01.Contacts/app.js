import {contacts} from './contacts.js';
import { html, render } from './node_modules/lit-html/lit-html.js';


let container = document.getElementById('contacts');

let template = (data) => html`
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${data.name}</h2>
        <button @click=${onClick} class="detailsBtn">Details</button>
        <div class="details" id=${data.id}>
            <p>Phone number: ${data.phoneNumber}</p>
            <p>Email: ${data.email}</p>
        </div>
    </div>
</div>`;

let result = contacts.map(template);
render(result,container);

function onClick(e){
    let element = e.target.parentElement;
    let style = element.querySelector('.details').style.display;
    if (style == 'block') {
        element.querySelector('.details').style.display = 'none';
    } else {
        element.querySelector('.details').style.display = 'block';
    }
   
}