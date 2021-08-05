import {html} from '../../node_modules/lit-html/lit-html.js';

let destinationCardTemplate = (destination) => html`
<a href=${'/details/' + destination._id} class="added-destination">
    <img src=${destination.image}
        alt="" class="picture-added-destination">
    <h3>${destination.city}</h3>
    <span>to ${destination.city} </span><span>${destination.departure}</span>
</a>`;


let registeredListTemplate = (destinations) =>html`
<div class="added-destinations">
${destinations.map(destinationCardTemplate)}
</div>`;

let homeTemplate = (userId, destinations) =>html`
<section id="viewCatalog" class="background-img">
${userId ? registeredListTemplate(destinations) : html`<div class="guest">No destinations possible! Please sign in...</div>`}
</section>`;

export async function homeView(context){
    let userId = sessionStorage.getItem('userId');
    let response = await fetch('http://localhost:3030/data/destinations');
    let result = await response.json();
    context.render(homeTemplate(userId,result));
}