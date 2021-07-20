import { render } from "./node_modules/lit-html/lit-html.js";
import {ulTemplate} from './templates.js';

let container = document.getElementById('root');
document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault();
    let formData = new FormData(e.target);
    let towns = formData.get('towns').split(', ');
    render(ulTemplate(towns),container);
    e.target.reset();
});
