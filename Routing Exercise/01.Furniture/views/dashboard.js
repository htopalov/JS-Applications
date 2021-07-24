import {html} from '../node_modules/lit-html/lit-html.js';

let furnitureCardTemplate = (data) => html`
 <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src=${data.img} />
                            <p>${data.description}</p>
                            <footer>
                                <p>Price: <span>${data.price} $</span></p>
                            </footer>
                            <div>
                                <a href=${`/details/${data._id}`} class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>`;

let dashboardTemplate = (data) => html`
 <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
           ${data.map(furnitureCardTemplate)}
        </div>`;

export async function dashboardView(context){
    let response = await fetch('http://localhost:3030/data/catalog');
    let result = await response.json();
    context.render(dashboardTemplate(result));
}