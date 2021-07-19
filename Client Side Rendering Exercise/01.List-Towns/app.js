import { html, render } from "./node_modules/lit-html/lit-html.js";

let liTemplate = (town) => html`<li>${town}</li>`;
let ulTemplate = (towns) => html`
<ul>
    ${towns.map(t=> liTemplate(t))}
</ul>`;

let container = document.getElementById('root');
document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault();
    let formData = new FormData(e.target);
    let towns = formData.get('towns').split(', ');
    render(ulTemplate(towns),container);
});
