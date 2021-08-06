import { html } from "../../node_modules/lit-html/lit-html.js";


let registerTemplate = (onSubmit) =>html`
  <section id="register">
    <div class="color">
      <div class="register-form">
        <h1>Register</h1>
        <form @submit=${onSubmit} id="form">
          <label for="email">Email</label>
          <input type="text" name="email">
          <label for="password">Password</label>
          <input type="password" name="password">
          <label for="repeat-password">Repeat Password</label>
          <input type="password" name="repeatPassword">
          <button>Submit</button>
          <a href="/login" class="option">Already have an account?</a>
        </form>
      </div>
    </div>
  </section>`;

  export async function registerView(context){
      context.render(registerTemplate(onSubmit));

      async function onSubmit(e){
          e.preventDefault();
          let formData = new FormData(e.target);
          let email = formData.get('email');
          let password = formData.get('password');
          let repeatPassword = formData.get('repeatPassword');
          try {
              if (email == '' || password == '' || repeatPassword == '') {
                  throw new Error('Fields cant be empty');
              }
              if (password != repeatPassword) {
                  throw new Error('Passwords must match');
              }
              let response = await fetch('http://localhost:3030/users/register',{
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
                  context.page.redirect('/login');
              } else {
                  let error = await response.json();
                  throw new Error(error.message);
              }
          } catch(err){
              return alert(err.message);
          }
      }
  }