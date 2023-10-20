const dataWorks = fetch("http://localhost:5678/api/works");
const gallery = document.querySelector(".gallery");

dataWorks.then((response) => {
    return response.json();
}
).then((data) => {
    for (let i = 0; i < data.length; i++) {
        const figure = document.createElement("figure");
        gallery.appendChild(figure);

        const img = document.createElement("img");
        img.src = data[i].imageUrl;
        img.alt = data[i].title;
        img.crossOrigin = "anonymous";
        figure.appendChild(img);

        const figCaption = document.createElement("figcaption");
        figCaption.textContent = data[i].title;
        figure.appendChild(figCaption);
    }
});
