import {html} from '../../node_modules/lit-html/lit-html.js';

let editTemplate = (book,onSubmit) => html`
<section id="edit-page" class="edit">
    <form @submit=${onSubmit} id="edit-form">
        <fieldset>
            <legend>Edit my Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" .value=${book.title}>
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description"
                        id="description" .value=${book.description}></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" .value=${book.imageUrl}>
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" .value=${book.type}>
                        <option value="Fiction">Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>`;

export async function editView(context){
    let bookId = context.params.id;
    let response = await fetch('http://localhost:3030/data/books/' + bookId);
    let result = await response.json();
    context.render(editTemplate(result,onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let title = formData.get('title');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');
        let type = formData.get('type');
        try {
            if (title == '' || description == '' || imageUrl == '' || type == '') {
                throw new Error('All fields are required!');
            }
            let response = await fetch('http://localhost:3030/data/books/' + bookId, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                    type
                })
            });
            if (response.ok) {
                context.page.redirect('/details/' + bookId);
            } else {
                let error = await response.json();
                throw new Error(error.message);
            }

        } catch (err) {
            return alert(err.message);
        }
    }
}