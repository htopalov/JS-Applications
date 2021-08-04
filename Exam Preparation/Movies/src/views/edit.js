import {html} from '../../node_modules/lit-html/lit-html.js';

let editTemplate = (movie,onSubmit) => html`
<section id="edit-movie">
<form @submit=${onSubmit} class="text-center border border-light p-5">
    <h1>Edit Movie</h1>
    <div class="form-group">
        <label for="title">Movie Title</label>
        <input type="text" class="form-control" .value=${movie.title} name="title">
    </div>
    <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea class="form-control" name="description" .value=${movie.description}></textarea>
    </div>
    <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input type="text" class="form-control" .value=${movie.img} name="imageUrl">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
</section>`;

export async function editView(context){
    let id = context.params.id;
    let response = await fetch(`http://localhost:3030/data/movies/${id}`);
    let result = await response.json();
    context.render(editTemplate(result,onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let title = formData.get('title');
        let description = formData.get('description');
        let img = formData.get('imageUrl');
        try{
            if (title == '' || description == '' || img == '') {
                throw new Error('Field cannot be empty');
            }
            let response = await fetch('http://localhost:3030/data/movies/'+ id, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.getItem('authToken')
                },
                body: JSON.stringify({title,description,img})
            });
            if (!response.ok) {
                let error = await response.json();
                throw new Error(error.message); 
            } else {
                context.page.redirect('/details/'+ id);
            }
        } catch (err){
            return alert(err.message);
        }
    }
}
