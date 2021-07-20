import { render } from './node_modules/lit-html/lit-html.js';
import rowTemplate from './template.js';

function solve() {
   async function populateEntries() {
      let response = await fetch('http://localhost:3030/jsonstore/advanced/table');
      let result = await response.json();
      let resultValues = Object.values(result);
      let resultTemplate = resultValues.map(x => rowTemplate(x));
      render(resultTemplate, document.querySelector('tbody'));
   }

   populateEntries();


   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      let searchText = document.getElementById('searchField');
      let body = document.querySelectorAll('tbody tr');
      for (let tr of body) {
         tr.classList.remove('select');
      }
      for (let tr of body) {
         if (tr.textContent.toLowerCase().includes(searchText.value.toLowerCase())) {
            tr.classList.add('select');
         }
      }
      searchText.value = '';
   }
}

solve();