import { html } from '../../node_modules/lit-html/lit-html.js';

let createTemplate = (onSubmit) => html`
<h1>Create New Offer</h1>
<p class="message"></p>
<form @submit=${onSubmit}>
    <div>
        <input type="text" name="name" placeholder="Name...">
    </div>
    <div>
        <input type="text" name="price" placeholder="Price...">
    </div>
    <div>
        <input type="text" name="image" placeholder="Image url...">
    </div>
    <div>
        <textarea name="description" placeholder="Give us some description about this offer..."></textarea>
    </div>
    <div>
        <input type="text" name="brand" placeholder="Brand...">
    </div>
    <div>
        <button>Create</button>
    </div>
</form>`;

export async function createView(context) {
    context.render(createTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let name = formData.get('name');
        let image = formData.get('image');
        let description = formData.get('description');
        let brand = formData.get('brand');
        let price = Number(formData.get('price'));
        let creator = sessionStorage.getItem('email');
        let bought = 0;
        try {
            if (name == '' || image == '' || description == '' || brand == '' || price == '') {
                throw new Error('Fields cant be empty');
            }
            let response = await fetch('http://localhost:3030/data/shoes', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.getItem('authToken')
                },
                body: JSON.stringify({ name, image, description, brand, price, creator, bought })
            });
            if (response.ok) {
                context.page.redirect('/');
            } else {
                let error = await response.json();
                throw new Error(error.message);
            }

        } catch (err) {
            return alert(err.message);
        }
    }
}