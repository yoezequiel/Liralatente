fetch("./poesias.json")
    .then((response) => response.json())
    .then((data) => {
        const poetryContent = document.querySelector(".poetry-content");
        const latestPoetry = data[data.length - 1];
        const title = document.createElement("h3");
        title.textContent = latestPoetry.titulo;
        const text = document.createElement("p");
        text.innerHTML = latestPoetry.texto.replace(/\n/g, "<br>");
        poetryContent.appendChild(title);
        poetryContent.appendChild(text);
        if (latestPoetry.video) {
            const videoElement = document.createElement("video");
            videoElement.controls = true;
            videoElement.src = latestPoetry.video;
            poetryContent.appendChild(videoElement);
        }
    })
    .catch((error) => console.error("Error loading latest poem:", error));
