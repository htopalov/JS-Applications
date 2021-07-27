import {html} from '../node_modules/lit-html/lit-html.js';

let createTemplate = (onSubmit,message) => html`
            <section id="create">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>New Team</h1>
                    </header>
                    <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
                    ${message ? html`<div class="error">${message}</div>` : ''}
                        <label>Team name: <input type="text" name="name"></label>
                        <label>Logo URL: <input type="text" name="logoUrl"></label>
                        <label>Description: <textarea name="description"></textarea></label>
                        <input class="action cta" type="submit" value="Create Team">
                    </form>
                </article>
            </section>`;

export async function createView(context){
    let message = '';
    context.render(createTemplate(onSubmit, message));
    async function onSubmit(e) {
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

            let response = await fetch('http://localhost:3030/data/teams', {
                method: 'post',
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
            context.render(createTemplate(onSubmit, message));
        }
    }
}