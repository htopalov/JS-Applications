import { html, render } from "./node_modules/lit-html/lit-html.js";
import editFormTemplate from './editFormTemplate.js';
import createFormTemplate from './createFormTemplate.js';

let rowTemplate = (id, data) => html`
<tr id=${id}>
    <td>${data.title}</td>
    <td>${data.author}</td>
        <td>
            <button @click=${clickEdit}>Edit</button>
            <button @click=${onDelete}>Delete</button>
        </td>
</tr>`;

window.onload = render(createFormTemplate(), document.getElementById('formContainer'));
document.getElementById('loadBooks').addEventListener('click', loadBooks);
document.getElementById('add-form').addEventListener('submit', onCreate);

async function loadBooks(){
    let response = await fetch('http://localhost:3030/jsonstore/collections/books');
    let result = await response.json();
    let resultValues = Object.entries(result);
    let resultTemplate = resultValues.map(([id,data]) => rowTemplate(id,data));
    render(resultTemplate, document.querySelector('tbody'));
}

async function onCreate(e){
    e.preventDefault();
    let formData = new FormData(e.target);
    let title = formData.get('title');
    let author = formData.get('author');
    await fetch('http://localhost:3030/jsonstore/collections/books',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({author,title})
    });
    loadBooks();
    e.target.reset();
}

async function clickEdit(e){
    let id = e.target.closest('tr').id;
    let response = await fetch('http://localhost:3030/jsonstore/collections/books/' + id);
    let book = await response.json();
    render(editFormTemplate(book), document.getElementById('formContainer'));
    document.getElementById('edit-form').dataset.id = id;
    document.getElementById('edit-form').addEventListener('submit', onEdit);
}

async function onDelete(e){
    let id = e.target.closest('tr').id;
    await fetch('http://localhost:3030/jsonstore/collections/books/' + id,{
        method: 'delete'
    });
    loadBooks();
}

async function onEdit(e){
    e.preventDefault();
    let formData = new FormData(e.target);
    let title = formData.get('title');
    let author = formData.get('author');
    let id = e.target.dataset.id;
    await fetch('http://localhost:3030/jsonstore/collections/books/' + id,{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({author,title})
    });
    render(createFormTemplate(), document.getElementById('formContainer'));
    loadBooks();
    e.target.reset();
}
