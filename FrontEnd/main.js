const dataWorks = fetch("http://localhost:5678/api/works");
const dataCategories = fetch("http://localhost:5678/api/categories");
const gallery = document.querySelector(".gallery");

dataCategories
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    createButton("Tous", 0);
    data.forEach((category) => {
      createButton(category.name, category.id);
    });
  });

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

// Suppression de tous les noeuds enfants
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Création du bouton
function createButton(name, categoryId) {
  // On créer le bouton "TOUS"
  const button = document.createElement("button");
  button.innerText = name;
  button.setAttribute("data-category-id", categoryId);

  // Style du bouton
  button.style.backgroundColor = "white";
  button.style.color = "#1D6154";
  button.style.fontWeight = "600";
  button.style.fontFamily = "syne";
  button.style.borderRadius = "20px";
  button.style.border = "1px solid #1D6154";
  button.style.padding = "5px 15px";
  button.style.margin = "5px";
  button.style.cursor = "pointer";

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
  const filters = document.querySelector(".filters");
  filters.appendChild(button);
}

function displayWorks(categoryId) {
  fetch("http://localhost:5678/api/works")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      removeAllChildNodes(gallery);

      // Si la catégorie est "Tous" (id = 0) => on affiche tous les travaux
      if (categoryId == 0) {
        data.forEach((work) => {
          console.log(work);
          element = createElement(work);
          gallery.appendChild(element);
        });
      } else {
        // On filtre les travaux par catégorie
        const filteredWorks = data.filter((work) => work.category.id == categoryId);
        filteredWorks.forEach((work) => {
          element = createElement(work);
          gallery.appendChild(element);
        });
      }
    });
}
