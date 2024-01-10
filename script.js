console.log("Welcome To Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems =Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Keejo Kesari Ke Laal", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Jo-Hai-Albela-Mad-Naino-Wala", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Akdam Bakdam", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Aasman Ko Chukar Dekha", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Deva Shree Ganesha", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "O Paalanhaare", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Malhar-Wari", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Kasto Mazza hai", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tum Tak", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Ranvijay’s Entry Medley", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
]

songItems.forEach((element,i) => {
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText =songs[i].songName;
})


//
// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-regular', 'fa-circle-play');
        masterPlay.classList.add('fa-regular', 'fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-regular', 'fa-circle-pause');
        masterPlay.classList.add('fa-regular', 'fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    //Update Seekbar
    progress =parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;   
});

myProgressBar.addEventListener('change',() =>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays =()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-regular', 'fa-circle-pause')
        element.classList.add('fa-regular', 'fa-circle-play');
    })   
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        const isPaused = audioElement.paused || audioElement.currentTime <= 0;

        if (isPaused) {
            // Play the selected song
            e.target.classList.remove('fa-regular', 'fa-circle-play');
            e.target.classList.add('fa-regular', 'fa-circle-pause');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-regular', 'fa-circle-play');
            masterPlay.classList.add('fa-regular', 'fa-circle-pause');
        } else {
            // Pause the currently playing song
            e.target.classList.remove('fa-regular', 'fa-circle-pause');
            e.target.classList.add('fa-regular', 'fa-circle-play');
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-regular', 'fa-circle-pause');
            masterPlay.classList.add('fa-regular', 'fa-circle-play');
        }
    });
});


audioElement.addEventListener('ended', () => {
    // Auto-play the next song
    if (songIndex < songs.length - 1) {
        songIndex++;
    } else {
        songIndex = 0;
    }

    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-regular', 'fa-circle-play');
    masterPlay.classList.add('fa-regular', 'fa-circle-pause');
});

document.getElementById('next').addEventListener('click', () => {
    // Manually play the next song
    if (songIndex < songs.length - 1) {
        songIndex++;
    } else {
        songIndex = 0;
    }

    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-regular', 'fa-circle-play');
    masterPlay.classList.add('fa-regular', 'fa-circle-pause');
});


document.getElementById('previous').addEventListener('click', () =>{
    if(songIndex <= 0){
        songIndex=0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src=`songs/${songIndex + 1}.mp3`;
    masterSongName.innerText =songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-regular', 'fa-circle-play');
    masterPlay.classList.add('fa-regular', 'fa-circle-pause');
})
