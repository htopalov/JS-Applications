import {html} from '../../node_modules/lit-html/lit-html.js';
import { notificationView } from './notification.js';

let createTemplate = (onSubmit) =>html`
        <section id="create-meme">
            <form @submit=${onSubmit} id="create-form">
                <div class="container">
                    <h1>Create Meme</h1>
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                    <label for="imageUrl">Meme Image</label>
                    <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                    <input type="submit" class="registerbtn button" value="Create Meme">
                </div>
            </form>
        </section>`;

export async function createView(context){
    context.render(createTemplate(onSubmit));
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
            let response = await fetch('http://localhost:3030/data/memes', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.getItem('authToken')},
                body: JSON.stringify({title,description,imageUrl})
            });
            if (response.ok) {
                context.page.redirect('/all-memes');
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