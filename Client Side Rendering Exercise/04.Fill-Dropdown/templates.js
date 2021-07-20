import{html} from './node_modules/lit-html/lit-html.js';

let optionTemplate = (text, _id) => html`
    <option value=${_id}>${text}</option>`;

let selectMenuTemplate = (options) => html`
            <select id="menu">
                ${options.map(x => optionTemplate(x.text,x._id))}
            </select>`;

export {optionTemplate,selectMenuTemplate}