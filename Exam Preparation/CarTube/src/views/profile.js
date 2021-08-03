import { html } from "../../node_modules/lit-html/lit-html.js";

let carTemplate = (car) => html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href=${'/details/'+ car._id} class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

let myCarsTemplate = (cars) =>html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">
        ${cars.length > 0 ? cars.map(carTemplate) : html`<p class="no-cars"> You haven't listed any cars yet.</p>`}
    </div>
</section>`;

export async function profileView(context){
    let userId = sessionStorage.getItem('userId');
    let response = await fetch(`http://localhost:3030/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    let result = await response.json();
    context.render(myCarsTemplate(result));
}