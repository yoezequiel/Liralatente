let currentAudio = null;
let currentButton = null;
fetch("./poesias.json")
    .then((response) => response.json())
    .then((data) => {
        const musicPoetryList = document.querySelector(".music-poetry-list");
        data.reverse();
        data.forEach((poetry) => {
            if (poetry.audio) {
                const poetryItem = document.createElement("div");
                poetryItem.classList.add("poetry-item");
                const title = document.createElement("h3");
                title.textContent = poetry.titulo;
                poetryItem.appendChild(title);
                const playButton = document.createElement("button");
                const playIcon = document.createElement("img");
                playIcon.src = "static/img/music/play.png";
                playIcon.alt = "Play";
                playButton.appendChild(playIcon);
                playButton.classList.add("play-button");
                const audioElement = document.createElement("audio");
                audioElement.src = poetry.audio;
                const progressBar = document.createElement("input");
                progressBar.type = "range";
                progressBar.value = 0;
                progressBar.min = 0;
                progressBar.max = 100;
                progressBar.classList.add("progress-bar");
                audioElement.addEventListener("timeupdate", function () {
                    const progress =
                        (audioElement.currentTime / audioElement.duration) *
                        100;
                    progressBar.value = progress;
                });
                progressBar.addEventListener("input", function () {
                    const seekTime =
                        (progressBar.value / 100) * audioElement.duration;
                    audioElement.currentTime = seekTime;
                });
                playButton.addEventListener("click", function () {
                    if (currentAudio && currentAudio !== audioElement) {
                        currentAudio.pause();
                        if (currentButton) {
                            const currentIcon =
                                currentButton.querySelector("img");
                            currentIcon.src = "static/img/music/play.png";
                            currentIcon.alt = "Play";
                        }
                    }
                    if (audioElement.paused) {
                        audioElement.play();
                        playIcon.src = "static/img/music/pause.png";
                        playIcon.alt = "Pause";
                        currentAudio = audioElement;
                        currentButton = playButton;
                    } else {
                        audioElement.pause();
                        playIcon.src = "static/img/music/play.png";
                        playIcon.alt = "Play";
                        currentAudio = null;
                        currentButton = null;
                    }
                });
                document.createElement("div");
                poetryItem.appendChild(playButton);
                poetryItem.appendChild(progressBar);
                poetryItem.appendChild(audioElement);
                musicPoetryList.appendChild(poetryItem);
            }
        });
    })
    .catch((error) => console.error("Error loading poems:", error));
