import {html} from '../node_modules/lit-html/lit-html.js';

let createFormTemplate = (onSubmit) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control valid" id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control" id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control" id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>`;

export async function createView(context){
    context.render(createFormTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let isValid = false;
        let formData = new FormData(e.target);
        let make = formData.get('make');
        let model = formData.get('model');
        let year = Number(formData.get('year'));
        let description = formData.get('description');
        let price = formData.get('price');
        let img = formData.get('img');
        let material = formData.get('material');

        if (make == '' || make.length < 4) {
            document.getElementById('new-make').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('new-make').classList.remove('is-invalid');
            document.getElementById('new-make').classList.add('is-valid');
            isValid = true;
        }

        if (model == '' || model.length < 4) {
            document.getElementById('new-model').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('new-model').classList.remove('is-invalid');
            document.getElementById('new-model').classList.add('is-valid');
            isValid = true;
        }

        if (year == '' || year < 1950 || year > 2050) {
            document.getElementById('new-year').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('new-year').classList.remove('is-invalid');
            document.getElementById('new-year').classList.add('is-valid');
            isValid = true;
        }

        if (description == '' || description.length <= 10) {
            document.getElementById('new-description').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('new-description').classList.remove('is-invalid');
            document.getElementById('new-description').classList.add('is-valid');
            isValid = true;
        }

        if (price == '' || price <= 0) {
            document.getElementById('new-price').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('new-price').classList.remove('is-invalid');
            document.getElementById('new-price').classList.add('is-valid');
            isValid = true;
        }

        if (img == '') {
            document.getElementById('new-image').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('new-image').classList.remove('is-invalid');
            document.getElementById('new-image').classList.add('is-valid');
            isValid = true;
        }

        if (isValid == false) {
            return;
        }


        let body = {
            make,
            model,
            year,
            description,
            price,
            img,
            material 
        }

        let response = await fetch('http://localhost:3030/data/catalog', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            context.page.redirect('/');
        } else {
            let error = await response.json();
            alert(error.message);
        }

    }
}