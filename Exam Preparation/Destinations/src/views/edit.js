import { html } from "../../node_modules/lit-html/lit-html.js";


let editTemplate = (destination,onSubmit) => html`
<section id="viewEditdestination">
    <h2>Edit existing destination</h2>
    <form @submit=${onSubmit} id="formAdddestination">
        <label for="destination">Destination name:</label>
        <input type="text" id="destination" name="destination" .value=${destination.name}>
        <label for="city">City:</label>
        <input type="text" id="city" name="city" .value=${destination.city}>
        <label for="duration">Duration:</label>
        <input type="number" id="duration" name="duration" .value=${destination.duration}>
        <label for="departureDate">Departure Date:</label>
        <input type="date" id="departureDate" name="departureDate" .value=${destination.departure}>
        <label for="imgUrl">Image:</label>
        <input type="text" id="imgUrl" name="imgUrl" .value=${destination.image}>
        <input type="submit" class="create" value="Edit">
    </form>
</section>`;

export async function editView(context){
    let id = context.params.id;
    let response = await fetch('http://localhost:3030/data/destinations');
    let result = await response.json();
    let destination = result.find(x=>x._id == id);
    context.render(editTemplate(destination,onSubmit));

    async function onSubmit(e){
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
            let response = await fetch('http://localhost:3030/data/destinations/' + id, {
                method: 'put',
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
                context.page.redirect('/details/'+ id);
            } else {
                let error = await response.json();
                throw new Error(error.message);
            }
        } catch (err) {
            return alert(err.message);
        }
    }
}