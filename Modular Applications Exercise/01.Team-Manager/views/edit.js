import {html} from '../node_modules/lit-html/lit-html.js';

let editFormTemplate = (data,onSubmit,message) => html`
            <section id="edit">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Edit Team</h1>
                    </header>
                    <form @submit=${onSubmit} id="edit-form" class="main-form pad-large">
                        ${message ? html`<div class="error">${message}</div>` : ''}
                        <label>Team name: <input type="text" name="name" .value=${data.name}></label>
                        <label>Logo URL: <input type="text" name="logoUrl" .value=${data.logoUrl}></label>
                        <label>Description: <textarea name="description" .value=${data.description}></textarea></label>
                        <input class="action cta" type="submit" value="Save Changes">
                    </form>
                </article>
            </section>`;


export async function editView(context){
    let message = '';
    let id = context.params.id;
    let teamToEditResponse = await fetch('http://localhost:3030/data/teams/' + id);
    let teamToEditResult = await teamToEditResponse.json();
    context.render(editFormTemplate(teamToEditResult,onSubmit,message));

    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let name = formData.get('name');
        let logoUrl = formData.get('logoUrl');
        let description = formData.get('description');
        try {
            if (name == '' || logoUrl == '' || description == '') {
                throw new Error('Fields cannot be empty');
            }
            if (name.length < 4) {
                throw new Error('Name must be at least 4 characters long');
            }
            if (description.length < 10) {
                throw new Error('Description must be at least 10 characters long');
            }

            let response = await fetch('http://localhost:3030/data/teams/' + id, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' , 'X-Authorization': sessionStorage.getItem('authToken') },
                body: JSON.stringify({ name, logoUrl, description})
            });

            if (response.ok) {
                e.target.reset();
                let data = await response.json();
                context.page.redirect(`/details/${data._id}`);
    
            } else {
                let error = await response.json();
                throw new Error(error.message);
            }

        } catch (err) {
            message = err.message;
            context.render(editFormTemplate(teamToEditResult,onSubmit, message));
        }
    }
}