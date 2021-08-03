import { html } from "../../node_modules/lit-html/lit-html.js";

let carTemplate = (car) =>html`
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
            <a href=${'/details/' + car._id} class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

let searchTemplate = (cars,onClick) => html`
<section id="search-cars">
    <h1>Filter by year</h1>
    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onClick} class="button-list">Search</button>
    </div>
    <h2>Results:</h2>
    <div class="listings">
        ${cars.length > 0 ? cars.map(carTemplate) : html` <p class="no-cars"> No results.</p>`}
    </div>
</section>`;

export async function searchView(context) {
    context.render(searchTemplate([],onClick));
    async function onClick() {
        let query = Number(document.getElementById('search-input').value);
        try {
            if (query == '') {
                throw new Error('Enter year in input field');
            }
            if (isNaN(query)) {
                throw new Error('Input must be number');
            }
            if (query < 0) {
                throw new Error('Year must be a positive number');
            }
            let response = await fetch(`http://localhost:3030/data/cars?where=year%3D${query}`);
            if (response.ok) {
                let result = await response.json();
                context.render(searchTemplate(result,onClick));
            } else {
                let error = await response.json();
                throw new Error(error.message);
            }

        } catch (err) {
            return alert(err.message);
        }
    }
}