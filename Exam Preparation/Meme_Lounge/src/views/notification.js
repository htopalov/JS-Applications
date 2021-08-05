import {html, render} from '../../node_modules/lit-html/lit-html.js';

let container = document.getElementById('notifications');

let notificationTemplate = (message) => html`
<div id="errorBox" class="notification">
    <span>${message}</span>
</div>`;

export function notificationView(message){
   container.style.display = 'block'; 
   render(notificationTemplate(message), container);
}