import { html } from '../../node_modules/lit-html/lit-html.js';

let createDestinationTemplate = (onSubmit) => html`
<section id="viewAdddestination">
    <h2>Add new destination</h2>
    <form @submit=${onSubmit} id="formAdddestination">
        <label for="destination">Destination name:</label>
        <input type="text" id="destination" name="destination" placeholder="Destination name">
        <label for="city">City:</label>
        <input type="text" id="city" name="city" placeholder="City">
        <label for="duration">Duration:</label>
        <input type="number" id="duration" name="duration" placeholder="Duration">
        <label for="departureDate">Departure Date:</label>
        <input type="date" id="departureDate" name="departureDate">
        <label for="imgUrl">Image:</label>
        <input type="text" id="imgUrl" name="imgUrl" placeholder="https://">

        <input type="submit" class="create" value="Add">
    </form>
</section>`;

export async function createView(context) {
    context.render(createDestinationTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let name = formData.get('destination');
        let city = formData.get('city');
        let duration = formData.get('duration');
        let departure = formData.get('departureDate');
        let image = formData.get('imgUrl');
        try {
            if (name == '' || city == '' || duration == '' || departure == '' || image == '') {
                throw new Error('Fields cant be empty');
            }
            let response = await fetch('http://localhost:3030/data/destinations', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    name,
                    city,
                    duration,
                    departure,
                    image
                })
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