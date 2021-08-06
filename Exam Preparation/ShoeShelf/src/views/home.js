import {html} from '../../node_modules/lit-html/lit-html.js';

let shoeTemplate = (shoe) => html`
<div class="shoes">
 <div class="shoe">
    <img src=${shoe.image}>
    <h3>${shoe.brand} ${shoe.name}</h3>
    <a href="">Buy it for $${shoe.price}</a>
</div>`;

let homeTemplate = (shoes) => html`
${sessionStorage.getItem('authToken') == null 
    ? html`
     <div class="container">
         <div class="about-us">
             <div>
                 <img src="../static/shoes.jpg" alt="">
                 <img src="../static/shoes2.jpg" alt="">
             </div>
             <p>
                 <a href="/register">Register Now</a> and Try it!
             </p>
         </div>
     </div>`
     : html`<div class="shoes">
     ${shoes.length == 0 ? html`<p>No shoes to display.Be the first to create a new offer...</p>` : shoes.map(shoeTemplate)}
     </div>`}`;


export async function homeView(context){
    let response = await fetch('http://localhost:3030/data/shoes');
    let result = await response.json();
    context.render(homeTemplate(result));
}