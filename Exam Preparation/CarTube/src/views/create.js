import { html } from "../../node_modules/lit-html/lit-html.js";


let createFormTemplate = (onSubmit) => html`
<section id="create-listing">
    <div class="container">
        <form @submit=${onSubmit} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>
            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">
            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">
            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">
            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">
            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">
            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">
            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>`;

export async function createView(context) {
    context.render(createFormTemplate(onSubmit));

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

            let response = await fetch('http://localhost:3030/data/cars', {
                method: 'post',
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
                context.page.redirect('/all-listings');
            } else {
                let error = await response.json();
                throw new Error(error.message);
            }
        } catch (err) {
            return alert(err.message);
        }
    }
}