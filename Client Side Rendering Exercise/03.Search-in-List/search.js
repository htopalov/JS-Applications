import {towns} from './towns.js';
import {html, render} from './node_modules/lit-html/lit-html.js';

let liTemplate = (town) => html`
<li>${town}</li>`;

let ulTemplate = (towns) => html`
<ul>
   ${towns.map(t=>liTemplate(t))}
</ul>`;

render(ulTemplate(towns), document.getElementById('towns'));
document.querySelector('button').addEventListener('click', search);

function search() {
   let liElements = document.getElementsByTagName('li');
   let searchName = document.getElementById('searchText').value;
   let resultCount = 0;
   for (const city of liElements) {
      if (city.textContent.toLowerCase().includes(searchName.toLowerCase())) {
         resultCount++;
         city.className = 'active';
      }
   }
   document.getElementById('result').textContent = `${resultCount} matches found`;
}
