import {html} from '../../node_modules/lit-html/lit-html.js';

let postTemplate = (post) => html`
  <article class="post">
    <h1>${post.title}</h1>
    <h2><span>${post.category}</span></h2>
    <p>${post.content}</p>
    <a href="javascript:void(0)" id="delete-button">Delete</a>
    <a href="javascript:void(0)" id="details-button">Details</a>
    <a href="javascript:void(0)" id="edit-button">Edit</a>
  </article>`;

let editTemplate = (posts,post,onSubmit) => html`
<main id="home-logged">
<section class="first-section">
    <section class="background-container">
    <form @submit=${onSubmit} class="edit-form">
        <h1>Edit Post</h1>
        <label for="title">Title</label>
        <input type="text" name="title" .value=${post.title}>
        <label for="category">Category</label>
        <input type="text" name="category" .value=${post.category}>
        <label for="content">Content</label>
        <textarea name="content" cols="30" rows="7" .value=${post.content}></textarea>
        <button>Edit</button>
        <a href="/" id="close-btn"><img src="../../images/close.png"></a>
    </form>
    </section>
</section>
<section class="second-section">
    <h3>Posts</h3>
    <hr>
    <div class="posts-row">
        ${posts.map(postTemplate)}
    </div>
</section>
</main>`;


export async function editView(context){
    let id = context.params.id;
    let response = await fetch('http://localhost:3030/data/posts/' + id);
    let result = await response.json();

    let allPostsResponse = await fetch('http://localhost:3030/data/posts');
    let allResults = await allPostsResponse.json();
    let myPosts = allResults.filter(x=>x._ownerId == sessionStorage.getItem('userId'));
    context.render(editTemplate(myPosts,result,onSubmit));

    async function onSubmit(e){
        let formData = new FormData(e.target);
        let title = formData.get('title');
        let category = formData.get('category');
        let content = formData.get('content');
        try {
            if (title == '' || category == '' || content == '') {
                throw new Error('Fields cant be empty');
            }
            let putResponse = await fetch('http://localhost:3030/data/posts/' + id,{
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.getItem('authToken')
                },
                body: JSON.stringify({title,category,content})
            });
            if (putResponse.ok) {
                e.target.reset();
                context.page.redirect('/'); //??????bug instead of redirect to home, tries to redirect to /edit/id + queryString(most likely problem with api)
            } else {
                let error = await putResponse.json();
                throw new Error(error.message);
            }
        } catch(err){
            return alert(err.message);
        }
    }
}