fetch("../poesias.json")
    .then((response) => response.json())
    .then((data) => {
        const poetryList = document.querySelector(".poetry-list");

        data.forEach((poetry) => {
            const poetryItemLink = document.createElement("a");
            poetryItemLink.href = "#";
            poetryItemLink.classList.add("poetry-item-link");

            const poetryItem = document.createElement("div");
            poetryItem.classList.add("poetry-item");

            const title = document.createElement("h3");
            title.textContent = poetry.titulo;

            const text = document.createElement("p");
            text.innerHTML = poetry.texto.replace(/\n/g, "<br>");

            poetryItem.appendChild(title);
            poetryItem.appendChild(text);

            poetryItemLink.appendChild(poetryItem);

            poetryItemLink.addEventListener("click", function (e) {
                e.preventDefault();

                openPopup(poetry.titulo, poetry.texto);
            });

            poetryList.appendChild(poetryItemLink);
        });
    })
    .catch((error) => console.error("Error loading poems:", error));

function openPopup(title, content) {
    var popup = document.createElement("div");
    popup.classList.add("popup");

    var closeButton = document.createElement("span");
    closeButton.textContent = "X";
    closeButton.classList.add("close-button");
    closeButton.addEventListener("click", function () {
        document.body.removeChild(popup);
    });

    var popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");

    var popupTitle = document.createElement("h2");
    popupTitle.textContent = title;

    var popupText = document.createElement("p");
    popupText.innerHTML = content.replace(/\n/g, "<br>");

    popupContent.appendChild(popupTitle);
    popupContent.appendChild(popupText);
    popup.appendChild(closeButton);
    popup.appendChild(popupContent);

    document.body.appendChild(popup);
}
