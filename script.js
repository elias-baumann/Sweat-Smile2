const videos = [
  "video1.mp4",
  "video2.mp4",
  "video3.mp4",
  "video4.mp4",
  "video5.mp4",
];

let currentVideoIndex = 0;
const videoElement = document.getElementById("currentVideo");
const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");
const progressBar = document.querySelector(".progress-bar");

let isVideoPaused = true;

// Event Listener für Klickereignisse
document.addEventListener("click", (event) => {
  const screenWidth = window.innerWidth;
  const clickPosition = event.clientX;

  if (clickPosition <= screenWidth * 0.25) {
    // Klick auf den linken 15%-Bereich des Bildschirms
    prevVideo();
  } else if (clickPosition >= screenWidth * 0.75) {
    // Klick auf den rechten 15%-Bereich des Bildschirms
    nextVideo();
  } else {
    // Klick innerhalb des mittleren Bereichs (Video selbst)
    if (isVideoPaused) {
      videoElement.play();
      isVideoPaused = false;
    } else {
      videoElement.pause();
      isVideoPaused = true;
    }
  }
  doDebug();
});

// Funktion zum Laden des aktuellen Videos und automatischen Abspielens
function loadCurrentVideo() {
  videoElement.src = videos[currentVideoIndex];
  videoElement.load();
  videoElement.play();

  //  videoElement.playbackRate = 3;
  updateProgressBar();

  // Event Listener für das Ende des Videos
  videoElement.addEventListener("ended", playNextVideo);

  videoElement.addEventListener("timeupdate", updateProgressBar);

  doDebug();
}

// Funktion zum automatischen Abspielen des nächsten Videos
function playNextVideo() {
  if (currentVideoIndex < videos.length - 1) {
    currentVideoIndex++;
    loadCurrentVideo();
  } else {
    currentVideoIndex = 0; // Zurück zum Start von Video1
    loadCurrentVideo();
  }
  doDebug();
}

// Funktion zum Vorwärtsnavigieren
function nextVideo() {
  if (currentVideoIndex < videos.length - 1) {
    currentVideoIndex++;
    loadCurrentVideo();
  } else {
    currentVideoIndex = 0; // Zurück zum Start von Video1
    loadCurrentVideo();
  }
  doDebug();
}

// Funktion zum Rückwärtsnavigieren
function prevVideo() {
  if (currentVideoIndex > 0) {
    currentVideoIndex--;
    loadCurrentVideo();
  }
  doDebug();
}

// Funktion zur Aktualisierung des Fortschrittsbalkens
function updateProgressBar() {
  const progress = (videoElement.currentTime / videoElement.duration) * 100;

  progressBar.style.transition = "none"; // Übergangseffekt deaktivieren
  // progressBar.style.width = "0%"; // Startposition auf 0 setzen
  setTimeout(function () {
    progressBar.style.transition = "width 0.3s linear"; // Übergangseffekt aktivieren
    progressBar.style.width = `${progress}%`; // Zielposition setzen
  }, 0);

  // const duration = videoElement.duration;
  // const currentTime = videoElement.currentTime;
  // progressBar.style.width = `${progress}%`;
}

// Event Listener für die Buttons
// nextButton.addEventListener("click", nextVideo);
// prevButton.addEventListener("click", prevVideo);

// Variable zum Verfolgen des Wiedergabestatus des Videos
// let isVideoPaused = false;

// Event Listener für das Laden der Seite
window.addEventListener("load", loadCurrentVideo);

// Event Listener für die Aktualisierung des Fortschrittsbalkens
// videoElement.addEventListener("timeupdate", updateProgressBar);

// // Event Listener für Klickereignisse
// document.addEventListener("click", () => {
//   videoElement.pause();
// });

function doDebug() {
  const debugContainer = document.getElementById("debugContainer");
  debugContainer.innerHTML = `currentVideoIndex: ${currentVideoIndex} <br> video: ${videos[currentVideoIndex]} <br> isVideoPaused: ${isVideoPaused}`;
}

doDebug();
