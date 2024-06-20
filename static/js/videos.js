fetch("./poesias.json")
    .then((response) => response.json())
    .then((data) => {
        const videoPoetryList = document.querySelector(".video-poetry-list");
        data.reverse();
        data.forEach((poetry) => {
            if (poetry.video) {
                const poetryItemLink = document.createElement("a");
                poetryItemLink.href = "#";
                poetryItemLink.classList.add("poetry-item-link");
                const poetryItem = document.createElement("div");
                poetryItem.classList.add("poetry-item");
                const title = document.createElement("h3");
                title.textContent = poetry.titulo;
                poetryItem.appendChild(title);
                poetryItemLink.appendChild(poetryItem);
                poetryItemLink.addEventListener("click", function (e) {
                    e.preventDefault();
                    openPopup(poetry.titulo, poetry.video);
                });
                videoPoetryList.appendChild(poetryItemLink);
            }
        });
    })
    .catch((error) => console.error("Error loading poems:", error));

function openPopup(title, video) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    const closeButton = document.createElement("span");
    closeButton.textContent = "X";
    closeButton.classList.add("close-button");
    closeButton.addEventListener("click", function () {
        document.body.removeChild(popup);
    });
    const popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");
    const popupTitle = document.createElement("h2");
    popupTitle.textContent = title;
    const videoElement = document.createElement("video");
    videoElement.controls = true;
    videoElement.autoplay = true;
    videoElement.src = video;
    popupContent.appendChild(videoElement);
    popup.appendChild(closeButton);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);
}
