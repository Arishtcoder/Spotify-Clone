console.log("welcome");

// Global variables
let songindex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let masterplaysongname = document.getElementById('masterplaysongname');
let songItems = Array.from(document.getElementsByClassName('songitems'));

// Song data array
let songs = [
    { songname: "Let Me Down Slowly", filepath: "songs/1.mp3", coverpath: "icons/Let Me Down Slowly.jpg" },
    { songname: "Baba Ji", filepath: "songs/2.mp3", coverpath: "icons/Baba ji.jpg" },
    { songname: "Rao Sahab Drill", filepath: "songs/3.mp3", coverpath: "icons/Rao Sahab Drill.jpg" },
    { songname: "Kali Activa", filepath: "songs/4.mp3", coverpath: "icons/Kali Activa.jpg" },
    { songname: "Mann Mera", filepath: "songs/5.mp3", coverpath: "icons/Obito Uchiha.jpg" },
    { songname: "My Queen", filepath: "songs/6.mp3", coverpath: "icons/My Queen.jpg" },
    { songname: "Tu Hai Kahan", filepath: "songs/7.mp3", coverpath: "icons/Tu Hai Kahan.jpg" },
    { songname: "Tu Hai Kahan2", filepath: "songs/8.mp3", coverpath: "icons/Tu Hai Kahan2.jpg" },
    { songname: "Shikayat", filepath: "songs/9.mp3", coverpath: "icons/Shikayat.jpg" },
    { songname: "Sometimes", filepath: "songs/10.mp3", coverpath: "icons/Sometimes.jpg" }
];

// Set song data in UI
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
});

// Play/Pause main button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        masterplaysongname.innerText = songs[songindex].songname;

        // Highlight current song icon
        document.getElementById(songindex).classList.remove('fa-play-circle');
        document.getElementById(songindex).classList.add('fa-pause-circle');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

        // Un-highlight current song icon
        document.getElementById(songindex).classList.remove('fa-pause-circle');
        document.getElementById(songindex).classList.add('fa-play-circle');
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressbar.value = progress;
});

// Seek
myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = (myprogressbar.value * audioElement.duration) / 100;
});

// Reset all play icons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemplay")).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Song item click
Array.from(document.getElementsByClassName("songItemplay")).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songindex = parseInt(e.target.id);
        audioElement.src = songs[songindex].filepath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplaysongname.innerText = songs[songindex].songname;

        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    songindex = (songindex + 1) % songs.length;
    audioElement.src = songs[songindex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterplaysongname.innerText = songs[songindex].songname;

    makeAllPlays();
    document.getElementById(songindex).classList.remove('fa-play-circle');
    document.getElementById(songindex).classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    songindex = (songindex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songindex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterplaysongname.innerText = songs[songindex].songname;

    makeAllPlays();
    document.getElementById(songindex).classList.remove('fa-play-circle');
    document.getElementById(songindex).classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Stop playing after song ends (optional reset)
audioElement.addEventListener("ended", () => {
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
    makeAllPlays();
});
