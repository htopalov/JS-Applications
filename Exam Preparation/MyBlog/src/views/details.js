import {html} from '../../node_modules/lit-html/lit-html.js';

let detailsTemplate = (post) => html`
  <section class="details">
    <div class="detail">
      <h1>Title: ${post.title}</h1>
      <h2>Category: ${post.category}</h2>
      <h3>Content: ${post.content}</h3>
      <a href="/">Back to Home</a>
    </div>
  </section>`;

export async function detailsView(context){
    let id = context.params.id;
    let response = await fetch('http://localhost:3030/data/posts/' + id);
    let result = await response.json();
    context.render(detailsTemplate(result));
}