import { errorMessage } from "./domLinker.js"

const WORKS_URL = "http://localhost:5678/api/works"
const CATEGORIES_URL = "http://localhost:5678/api/categories"
const LOGIN_URL = 'http://localhost:5678/api/users/login'

const get = url => fetch(url).then(res => res.json())

export const getWorks = () => get(WORKS_URL)
export const getCategories = () => get(CATEGORIES_URL)
export const postLogin = data => fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
}).then((res) => {
    if (res.ok) {
        return res.json();
    } else {
        errorMessage.textContent = 'La combinaison email/mot de passe est incorrecte';
        throw new Error('La combinaison email/mot de passe est incorrecte');
    }
})