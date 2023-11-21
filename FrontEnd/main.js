import { gallery, loginLink, logoutLink, filters, navLinks, loggedBanner, loggedButton } from "./scripts/domLinker.js";
import { getWorks, getCategories } from "./scripts/api.js";

const init = async () => {
  const dataCategories = await getCategories();
  createButton("Tous", 0);
  dataCategories.forEach(category => createButton(category.name, category.id))
}

init()


// Création de l'élément FIGURE
function createElement(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;
  img.crossOrigin = "anonymous";
  figure.appendChild(img);
  const figCaption = document.createElement("figcaption");
  figCaption.textContent = work.title;
  figure.appendChild(figCaption);
  return figure;
}

// Création du bouton
function createButton(name, categoryId) {
  // On créer le bouton "TOUS"
  const button = document.createElement("button");
  button.innerText = name;
  button.setAttribute("class", "btn-filtre");
  button.setAttribute("data-category-id", categoryId);

  // Affichage par défaut du bouton "TOUS"
  if (categoryId === 0) {
    button.style.backgroundColor = "#1D6154";
    button.style.color = "white";
    displayWorks(0);
  }

  // On ajoute l'évènement du click sur le bouton
  button.addEventListener("click", () => {
    const buttons = document.querySelectorAll("button");
    const categoryId = button.getAttribute("data-category-id");

    // On réinitialise le style de tous les boutons
    buttons.forEach((button) => {
      button.style.backgroundColor = "white";
      button.style.color = "#1D6154";
    });

    // On change le style du bouton cliqué
    button.style.backgroundColor = "#1D6154";
    button.style.color = "white";

    // On affiche les oeuvres de la catégorie correspondante
    displayWorks(categoryId);
  });

  // On ajoute le bouton au DOM
  filters.appendChild(button);
}

export const displayWorks = categoryId =>
  getWorks()
    .then((data) => {
      // removeAllChildNodes(gallery);
      gallery.innerHTML = ''

      // Si la catégorie est "Tous" (id = 0) => on affiche tous les travaux
      if (categoryId == 0) {
        data.forEach((work) => {
          console.log(work);
          const element = createElement(work);
          gallery.appendChild(element);
        });
      } else {
        // On filtre les travaux par catégorie
        const filteredWorks = data.filter((work) => work.category.id == categoryId);
        filteredWorks.forEach((work) => {
          const element = createElement(work);
          gallery.appendChild(element);
        });
      }
    });


// Event lien nav actifs
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
    link.classList.add("active");
  });
});


// Vérification du token


if (localStorage.getItem("token")) {
  // Si le token est présent, on affiche le lien de déconnexion et on cache le lien de connexion
  logoutLink.classList.remove("hidden");
  loginLink.classList.add("hidden");
  //
  gallery.style.marginTop = "51px";
  filters.classList.add("hidden");
  loggedBanner.classList.remove("hidden");
  loggedButton.classList.remove("hidden");
}

// Si on clique sur le lien de déconnexion, on supprime le token
logoutLink.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  window.location.href = "index.html";
});
