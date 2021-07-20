import {towns} from './towns.js';
import {render} from './node_modules/lit-html/lit-html.js';
import {ulTemplate} from './templates.js';

render(ulTemplate(towns), document.getElementById('towns'));
document.querySelector('button').addEventListener('click', search);
document.getElementById('searchText').addEventListener('click', clearClass);

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
   document.getElementById('result').style.display = 'block';
   document.getElementById('result').textContent = `${resultCount} matches found`;
   document.getElementById('searchText').value = '';
}

function clearClass(){
   Array.from(document.getElementsByTagName('li')).forEach(x=>x.className ='');
   document.getElementById('result').style.display = 'none';
}
