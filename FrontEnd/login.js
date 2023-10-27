import { loginForm } from "./scripts/domLinker.js";
import { postLogin } from "./scripts/api.js";


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    postLogin({ email, password }).then((data) => {
        localStorage.token = data.token;
        console.log(localStorage.getItem('token'));
        window.location.href = "index.html";
    })
});