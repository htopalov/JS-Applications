import {register} from '../src/api/data.js'

export function setupRegister(section,navigation){
    const form = section.querySelector('form');
    form.addEventListener('submit', onSubmit);
    return showRegister;

    async function showRegister(){
        return section;
    }

    async function onSubmit(e){
        e.preventDefault();
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');
        if (email == '' || password == '') {
            return alert('All fields are required!');
        } else if (password != repeatPassword) {
            return alert('Passwords don\'t match!');
        }

        await register(email,password);
        form.reset();
        navigation.setUserNav();
        navigation.goTo('home');
    }
}