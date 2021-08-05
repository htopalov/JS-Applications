import {html} from '../../node_modules/lit-html/lit-html.js';
import { notificationView } from './notification.js';

let editTemplate = (meme,onSubmit)=>html`
        <section id="edit-meme">
            <form @submit=${onSubmit} id="edit-form">
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" name="title" .value=${meme.title}>
                    <label for="description">Description</label>
                    <textarea id="description" name="description" .value=${meme.description}></textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" name="imageUrl" .value=${meme.imageUrl}>
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>`;

export async function editView(context){
    let id = context.params.id;
    let response = await fetch('http://localhost:3030/data/memes/' + id);
    let result = await response.json();
    context.render(editTemplate(result,onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let title = formData.get('title');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');
        try{
            if (title == '' || description == '' || imageUrl == '') {
                throw new Error('All fields are required');
            }
            let response = await fetch('http://localhost:3030/data/memes/' + id, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.getItem('authToken')},
                body: JSON.stringify({title,description,imageUrl})
            });
            if (response.ok) {
                context.page.redirect('/details/' + id);
            } else {
                let error = await response.json();
                throw new Error(error.message);
            }
        } catch (err){
            notificationView(err.message);
            setTimeout(() => {
                document.getElementById('notifications').style.display = 'none';
            },3000);
        }
    }
}