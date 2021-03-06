import { html } from '../../node_modules/lit-html/lit-html.js';

let createTemplate = (onSubmit) => html`
<div class="container home wrapper  my-md-5 pl-md-5">
    <div class=" d-md-flex flex-mb-equal ">
        <div class="col-md-6">
            <img class="responsive-ideas create" src="./images/creativity_painted_face.jpg" alt="">
        </div>
        <form @submit=${onSubmit} class="form-idea col-md-5">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Share Your Idea</h1>
            </div>
            <div class="form-label-group">
                <label for="ideaTitle">Title</label>
                <input type="text" id="title" name="title" class="form-control" placeholder="What is your idea?"
                    required="" autofocus="">
            </div>
            <div class="form-label-group">
                <label for="ideaDescription">Description</label>
                <textarea type="text" name="description" class="form-control" placeholder="Description"
                    required=""></textarea>
            </div>
            <div class="form-label-group">
                <label for="inputURL">Add Image</label>
                <input type="text" id="imageURl" name="imageURL" class="form-control" placeholder="Image URL"
                    required="">

            </div>
            <button class="btn btn-lg btn-dark btn-block" type="submit">Create</button>

            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2021.</p>
        </form>
    </div>
</div>`;

export async function createView(context) {
    context.render(createTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let title = formData.get('title');
        let description = formData.get('description');
        let img = formData.get('imageURL');
        try {
            if (title.length < 6) {
                throw new Error('Title must be at least 6 characters long');
            }
            if (description.length < 10) {
                throw new Error('Description must be at least 10 characters long');
            }
            if (img.length < 5) {
                throw new Error('Image url must be at least 5 characters long');
            }
            let response = await fetch('http://localhost:3030/data/ideas', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.getItem('authToken')
                },
                body: JSON.stringify({ title, description, img })
            });

            if (response.ok) {
                context.page.redirect('/dashboard');
            } else {
                let error = await response.json();
                throw new Error(error.message);
            }

        } catch (err) {
            return alert(err.message);
        }
    }
}