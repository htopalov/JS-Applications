import {html, render} from './node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

let containerSection = document.getElementById('allCats');
let catTemplate = (cat) => html`
<li>

    <img src=${'images/'+cat.imageLocation +'.jpg'} width="250" height="250" alt="Card image cap">
    <div class="info">
        <button @click=${onClick} class="showBtn">Show status code</button>
            <div class="status" style="display: none" id=${cat.id}>
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
    </div>
</li>`;

let listTemplate = (cats) => html`
<ul>
    ${cats.map(c => catTemplate(c))}
</ul>`;

render(listTemplate(cats),containerSection);

function onClick(e){
    let element = e.target.parentElement;
    let style = element.querySelector('.status').style.display;
    if (style == 'none') {
        element.querySelector('.status').style.display = 'block';
    } else {
        element.querySelector('.status').style.display = 'none';
    }

}