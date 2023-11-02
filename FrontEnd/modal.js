import { addWorkButton, modalContainer, modalGallery, modalTriggers, modalContentGallery, modalContentAddWork} from "./scripts/domLinker.js";
import { getWorks, getCategories } from "./scripts/api.js";

modalTriggers.forEach(trigger => trigger.addEventListener('click', toggleModal));
addWorkButton.addEventListener('click', displayWorkForm);

function toggleModal() {
    modalContainer.classList.toggle('active');
    displayModalWorks();
}

function displayWorkForm() {
    modalContentGallery.classList.add('hidden');
    modalContentAddWork.classList.remove('hidden');
}

function createElement(modalWork) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = modalWork.imageUrl;
    img.alt = modalWork.title;
    img.crossOrigin = "anonymous";
    figure.appendChild(img);
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fa-solid fa-trash-can'></i>";
    deleteButton.classList.add("delete-button");
    figure.appendChild(deleteButton);
    // deleteButton.addEventListener("click", () => {
    //     const id = modalWork.id;
    //     deleteWork(id);
    // });
    return figure;
}

const displayModalWorks = () =>
    getWorks()
        .then((data) => {
                modalGallery.innerHTML = ''
                data.forEach((work) => {
                        console.log(work);
                        const element = createElement(work);
                        modalGallery.appendChild(element);
                });
            });

