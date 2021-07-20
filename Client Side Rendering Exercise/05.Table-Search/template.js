import { html} from './node_modules/lit-html/lit-html.js';

let rowTemplate = (data) => html`
<tr>
   <td>${data.firstName} ${data.lastName}</td>
   <td>${data.email}</td>
   <td>${data.course}</td>
</tr>`;


export default rowTemplate;