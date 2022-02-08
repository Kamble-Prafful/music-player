const image = document.querySelector('img');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

//Check if music is playing
let isPlaying = false;


//Play
function playMusic(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();

}
//Pause
function pauseMusic(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play')
    music.pause();
}

// Play or Pause event listener
playBtn.addEventListener('click', ()=>(isPlaying ? pauseMusic(): playMusic())); 

//songs array

const songs = [

    {
        name: 'Swift-Supremacy',
        displayName: 'Blank Space',
        artist: 'Taylor Swift Supremacy', 
    },
    {
        name: 'Hawayein',
        displayName: 'Hawayein',
        artist: 'Arijit Singh', 
    },
    {
        name: 'Love Me Like You Do',
        displayName: 'Love me like you do',
        artist: 'Ellie Goulding',
    },
    {
        name: 'Stereo-hearts',
        displayName: 'stereo hearts',
        artist: 'Gym class heroes',
    },
    {
        name: 'The Nights',
        displayName: 'The Nights',
        artist: 'Avici',
    },
];

// Update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = `Resources/Images/${song.name}.jpg`;
    music.src = `Resources/Audio/${song.name}.mp3`;
}

//current song
let songIndex = 0;

//Previous song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playMusic();
}

//Next Song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]); 
    playMusic();
}

// onload 
loadSong(songs[songIndex]);


//*Update progress bar and time 

function updateProgressBar(e){
    if(isPlaying){

        const {duration, currentTime} = e.target;
        const progressPercent = (currentTime/ duration) * 100; 

        //update progress bar width 
        progress.style.width = `${progressPercent}%`;
        
        //Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);

        if(durationSeconds< 10){
            durationSeconds = `0${durationSeconds}`;
        }
        
        // Delay switching duration element to avoid NaN
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        //calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);

        if(currentSeconds < 10){
            currentSeconds =  `0${currentSeconds}`;
        }

        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

//User interaction with progress bar
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = clickX / width * duration;
}

//Event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);