import { addWorkButton, modalContainer, modalGallery, modalTriggers, modalContentGallery, modalContentAddWork, categorySelector, addPhotoFile, previewPhoto, blankPhoto, addPhotoLabel, photoSize, returnButton} from "./scripts/domLinker.js";
import { getWorks, getCategories } from "./scripts/api.js";

modalTriggers.forEach(trigger => trigger.addEventListener('click', toggleModal));
addWorkButton.addEventListener('click', displayAddWorkForm);
returnButton.addEventListener('click', displayModalGallery);

function toggleModal() {
    modalContainer.classList.toggle('active');
    modalContentGallery.classList.remove('hidden');
    modalContentAddWork.classList.add('hidden');
    displayModalWorks();
}

function displayModalGallery() {
    modalContentGallery.classList.remove('hidden');
    modalContentAddWork.classList.add('hidden');
    returnButton.classList.add('hidden');
    displayModalWorks();
}

function displayAddWorkForm() {
    modalContentGallery.classList.add('hidden');
    modalContentAddWork.classList.remove('hidden');
    returnButton.classList.remove('hidden');
    displayCategories();
}

addPhotoFile.onchange = evt => {
    const [file] = addPhotoFile.files
    if (file) {
        previewPhoto.src = URL.createObjectURL(file)
        blankPhoto.classList.add('hidden');
        previewPhoto.classList.remove('hidden');
        addPhotoFile.classList.add('hidden');
        addPhotoLabel.classList.add('hidden');
        photoSize.classList.add('hidden');
    }
  }

function displayCategories() {
    getCategories()
        .then((data) => {
            data.forEach((category) => {
                const option = document.createElement("option");
                option.value = category.id;
                option.text = category.name;
                categorySelector.appendChild(option);
            });
        });
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

function deleteWork(id) {
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then(() => {
            displayModalWorks();
        });
}

function addWork() {
    const imageUrl = document.querySelector("#photo-url").value;
    const title = document.querySelector("#photo-title").value;
    const categoryId = document.querySelector("#photo-category").value;

    const work = {
        imageUrl,
        title,
        categoryId
    };

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(work),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            displayModalWorks();
        });
}