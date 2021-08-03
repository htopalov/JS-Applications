import {html} from '../../node_modules/lit-html/lit-html.js';

let carCardTemplate = (car) => html`
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
            <a href=${'/details/'+car._id} class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

let catalogTemplate = (cars) =>html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        ${cars.length > 0 ? cars.map(carCardTemplate) : html`<p class="no-cars">No cars in database.</p>`}
    </div>
</section>`;



export async function catalogView(context){
    let response = await fetch('http://localhost:3030/data/cars?sortBy=_createdOn%20desc');
    let result = await response.json();
    context.render(catalogTemplate(result));
}