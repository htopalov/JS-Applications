import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

let detailsTemplate = (destination) => html`
<section id="viewdestinationDetails">
    <div class="destination-area">
        <div class="destination-area-left">
            <img src=${destination.image}
                alt="">
        </div>
        <div class="destination-area-right">
            <h3>${destination.name}</h3>
            <div>to ${destination.city}</div>
            <div class="data-and-time">
                ${destination.departure}
                ${sessionStorage.getItem('userId') == destination._ownerId 
                ? html`<a href=${'/edit/'+ destination._id} class="edit-destination-detail"></a>`
                : nothing}
            </div>
            <div>
                ${destination.duration} days
            </div>
        </div>
    </div>
</section>`;

export async function detailsView(context){
    let id = context.params.id;
    let response = await fetch('http://localhost:3030/data/destinations');
    let result = await response.json();
    let destination = result.find(x=>x._id == id);
    context.render(detailsTemplate(destination));
}