import { errorMessage } from "./domLinker.js"

const WORKS_URL = "http://localhost:5678/api/works"
const CATEGORIES_URL = "http://localhost:5678/api/categories"
const LOGIN_URL = 'http://localhost:5678/api/users/login'

const get = url => fetch(url).then(res => res.json())

export const getWorks = () => get(WORKS_URL)
export const getCategories = () => get(CATEGORIES_URL)

// Vérification de la combinaison email/mot de passe
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

// Suppression d'une oeuvre
export const deleteWork = (id) => fetch(`${WORKS_URL}/${id}`, {
    method: 'DELETE',
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
}).then((res) => {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error('La suppression a échoué');
    }
}).then(() => {
    displayModalWorks();
});

// Ajout d'une oeuvre
export const createWork = (formData) => {
    fetch(WORKS_URL, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData
    }).then((res) => {
        if (res.ok) {
            console.log("L'oeuvre a bien été ajoutée");
            return res.json();
        } else {
            throw new Error('L\'ajout de l\'oeuvre a échoué');
        };
    })
}