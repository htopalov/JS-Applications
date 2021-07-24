import { html } from '../node_modules/lit-html/lit-html.js';


let detailsTemplate = (data, deleteHandler) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src=${data.img.substring(1)} />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${data.make}</span></p>
                <p>Model: <span>${data.model}</span></p>
                <p>Year: <span>${data.year}</span></p>
                <p>Description: <span>${data.description}</span></p>
                <p>Price: <span>${data.price}</span></p>
                <p>Material: <span>${data.material}</span></p>
                <div id="modifyBtns">
                    <a href=${`/edit/${data._id}`} class="btn btn-info">Edit</a>
                    <a @click=${deleteHandler} href="javascript:void(0)" class="btn btn-red">Delete</a>
                </div>
            </div>
        </div>`;

export async function detailsView(context){
    let id = context.params.id;
    let response = await fetch(`http://localhost:3030/data/catalog/${id}`);
    let result = await response.json();
    let ownerId = result._ownerId;
    let userId = sessionStorage.getItem('userId');
    context.render(detailsTemplate(result,deleteHandler));
    if (userId !== ownerId) {
        document.getElementById('modifyBtns').style.display = 'none';
    }

    async function deleteHandler(){
        let confirmed = confirm('Are you sure you want to delete this furniture?');
        if (confirmed) {
            await fetch(`http://localhost:3030/data/catalog/${id}`,{
                method: 'delete',
                headers: {'X-Authorization': sessionStorage.getItem('authToken')}
            });
            context.page.redirect('/');
        }
    }

}