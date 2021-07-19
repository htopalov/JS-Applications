import{html,render} from './node_modules/lit-html/lit-html.js';

let optionTemplate = (text, _id) => html`
    <option value=${_id}>${text}</option>`;

let selectMenuTemplate = (options) => html`
            <select id="menu">
                ${options.map(x => optionTemplate(x.text,x._id))}
            </select>`;

let container = document.querySelector('#container');

async function getEntries(){
    let response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    let result = await response.json();
    render(selectMenuTemplate(Object.values(result)), container);
}

await getEntries();

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    let item = document.querySelector('#itemText').value;
    await fetch('http://localhost:3030/jsonstore/advanced/dropdown',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text: item})
    });
    await getEntries();
    e.target.reset();
});