import {html} from '../../node_modules/lit-html/lit-html.js';

let postTemplate = (post,onDelete) => html`
  <article class="post">
    <h1>${post.title}</h1>
    <h2><span>${post.category}</span></h2>
    <p>${post.content}</p>
    <a @click=${onDelete} data-del=${post._id} href="javascript:void(0)" id="delete-button">Delete</a>
    <a href=${'/details/' + post._id} id="details-button">Details</a>
    <a href=${'/edit/' + post._id} id="edit-button">Edit</a>
  </article>`;

let homeTemplate = (articles,onSubmit, onDelete) => html`
${sessionStorage.getItem('authToken') == null
 ? html`
   <section id="home">
    <section class="background-container">
      <h1>Welcome to MyBlog!</h1>
      <div class="auth-buttons">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </section>
  </section>` 
  : html`
   <section id="home-logged">
    <section class="first-section">
      <section class="background-container">
        <form @submit=${onSubmit}>
          <h1>Create Post</h1>
          <label for="title">Title</label>
          <input type="text" name="title">
          <label for="category">Category</label>
          <input type="text" name="category">
          <label for="content">Content</label>
          <textarea name="content" cols="30" rows="7"></textarea>
          <button>Submit</button>
        </form>
      </section>
    </section>
    <section class="second-section">
      <h3>Articles</h3>
      <hr>
      <div class="posts-row">
          ${articles.map(x=> postTemplate(x,onDelete))}
      </div>
    </section>
  </section>`}`;

  export async function homeView(context){
      let response = await fetch('http://localhost:3030/data/posts');
      let result = await response.json();
      let myPosts = result.filter(x=>x._ownerId == sessionStorage.getItem('userId'));
      context.render(homeTemplate(myPosts,onSubmit, onDelete));

      async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let title = formData.get('title');
        let category = formData.get('category');
        let content = formData.get('content');
        try {
            if (title == '' || category == '' || content == '') {
                throw new Error('Fields cant be empty');
            }
            let response = await fetch('http://localhost:3030/data/posts',{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.getItem('authToken')
                },
                body: JSON.stringify({title,category,content})
            });
            if (response.ok) {
                e.target.reset();
                context.page.redirect('/');
            } else {
                let error = await response.json();
                throw new Error(error.message);
            }
        } catch(err){
            return alert(err.message);
        }
      }

      async function onDelete(e){
          let id = e.target.dataset.del;
          let response = await fetch('http://localhost:3030/data/posts/' + id,{
              method: 'delete',
              headers: {'X-Authorization': sessionStorage.getItem('authToken')}
          });
          if (response.ok) {
              context.page.redirect('/');
          }
      }
  }