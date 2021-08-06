import {html} from '../../node_modules/lit-html/lit-html.js';


let loginTemplate = (onSubmit) => html`
  <section id="login">
    <div class="color">
      <div class="login-form">
        <h1>Login</h1>
        <form @submit=${onSubmit} id="form">
          <label for="email">Email</label>
          <input type="text" name="email">
          <label for="password">Password</label>
          <input type="password" name="password">
          <button>Submit</button>
          <a href="/register" class="option">Don't have an account?</a>
        </form>
      </div>
    </div>
  </section>
`;

export async function loginView(context){
    context.render(loginTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');
        try {
            if (email == '' || password == '') {
                throw new Error('Fields cant be empty');
            }
            let response = await fetch('http://localhost:3030/users/login',{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email,password})
            });
            if (response.ok) {
                let result = await response.json();
                sessionStorage.setItem('email', result.email);
                sessionStorage.setItem('userId', result._id);
                sessionStorage.setItem('authToken', result.accessToken);
                context.setupNavigation();
                context.page.redirect('/');
            } else {
                let error = await response.json();
                throw new Error(error.message);
            }
        } catch(err){
            return alert(err.message);
        }
    }
}