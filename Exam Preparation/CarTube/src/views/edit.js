import { html } from "../../node_modules/lit-html/lit-html.js";


let editTemplate = (car, onSubmit) => html`
<section id="edit-listing">
    <div class="container">
        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>
            <p>Car Brand</p>
            <input type="text" .value=${car.brand} name="brand">
            <p>Car Model</p>
            <input type="text" .value=${car.model} name="model">
            <p>Description</p>
            <input type="text" .value=${car.description} name="description">
            <p>Car Year</p>
            <input type="number" .value=${car.year} name="year">
            <p>Car Image</p>
            <input type="text" .value=${car.imageUrl} name="imageUrl">
            <p>Car Price</p>
            <input type="number" .value=${car.price} name="price">
            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`;

export async function editView(context) {
    let id = context.params.id;
    let response = await fetch('http://localhost:3030/data/cars/' + id);
    let result = await response.json();
    context.render(editTemplate(result, onSubmit));
    async function onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let brand = formData.get('brand');
        let model = formData.get('model');
        let description = formData.get('description');
        let year = Number(formData.get('year'));
        let imageUrl = formData.get('imageUrl');
        let price = Number(formData.get('price'));
        try {
            if (brand == '' || model == '' || description == '' || year == '' || imageUrl == '' || price == '') {
                throw new Error('All fields are required');
            }
            if (isNaN(year) || isNaN(price)) {
                throw new Error('Year and Price are number fields');
            }
            if (year < 0 || price < 0) {
                throw new Error('Year and Price must be positive numbers');
            }

            let response = await fetch('http://localhost:3030/data/cars/' + id, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    brand,
                    model,
                    description,
                    year,
                    imageUrl,
                    price
                })
            });
            if (response.ok) {
                context.page.redirect('/details/' + id);
            } else {
                let error = await response.json();
                throw new Error(error.message);
            }
        } catch (err) {
            return alert(err.message);
        }
    }
}