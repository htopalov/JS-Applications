import {html} from '../../node_modules/lit-html/lit-html.js';


let detailsTemplate = (car,onDelete) =>html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>
        <p class="description-para">${car.description}</p>
        ${car._ownerId == sessionStorage.getItem('userId') 
        ? html`
        <div class="listings-buttons">
            <a href=${'/edit/'+car._id} class="button-list">Edit</a>
            <a @click=${onDelete} id="deleteBtn" href="javascript:void(0)" class="button-list">Delete</a>
        </div>`
        : ''}
    </div>
</section>`;

export async function detailsView(context){
    let id = context.params.id;
    let response = await fetch('http://localhost:3030/data/cars/' + id);
    let result = await response.json();
    context.render(detailsTemplate(result,onDelete));
    async function onDelete(){
        let confirmed = confirm('Are you sure you want to delete this car?');
        if (confirmed) {
            await fetch('http://localhost:3030/data/cars/' + id,{
                method: 'delete',
                headers: {'X-Authorization': sessionStorage.getItem('authToken')}
            });
            context.page.redirect('/all-listings');
        }
    }
}