import { html } from '../../node_modules/lit-html/lit-html.js';

let destinationCard = (destination, onDelete) => html`
<div class="destination-ticket">
    <div class="destination-left">
        <img src=${destination.image} alt="">
    </div>
    <div class="destination-right">
        <div>
            <h3>${destination.name}</h3><span>${destination.departure}</span>
        </div>
        <div>
            to ${destination.city}
        </div>
        <p>${destination.duration} days </p>
        <a id=${destination._id} @click=${onDelete} href="javascript:void(0)" class="remove">REMOVE</a>
        <a href=${'/details/' + destination._id} class="details">Details</a>
    </div>
</div>`;

let myDestinationsTemplate = (destinations, onDelete) => html`
<section id="viewMydestinations">
    <h3>Your destinations</h3>
    ${destinations.map(x => destinationCard(x, onDelete))}
</section>`;

export async function myDestinationsView(context) {
    let response = await fetch('http://localhost:3030/data/destinations');
    let result = await response.json();
    let myDestinations = result.filter(x => x._ownerId == sessionStorage.getItem('userId'));
    context.render(myDestinationsTemplate(myDestinations, onDelete));

    async function onDelete(e) {
        let id = e.target.id;
        let response = await fetch('http://localhost:3030/data/destinations/' + id, {
            method: 'delete',
            headers: { 'X-Authorization': sessionStorage.getItem('authToken') }
        });
        if (response.ok) {
            context.page.redirect('/destinations');
        }
    }
}