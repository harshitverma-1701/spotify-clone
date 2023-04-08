console.log("Welcome to Spotify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio("song/1.mp3");
//let songItems = Array.from(document.querySelector(".songItem")); //....here, query selector not working
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));
let masterPlay = document.querySelector("#masterPlay");
let backPlay = document.querySelector("#backPlay");
let forwardPlay = document.querySelector("#forwardPlay");
let myProgressBar = document.querySelector("#myProgressBar");
let songInfo = document.querySelector(".songInfo div");
let gif = document.querySelector("#gif");

let songs = [
  {
    songName: "Ed Sheeran - Perfect",
    filePath: "song/1.mp3",
    coverPath: "cover/1.jpg",
  },
  {
    songName: "Stephen Sanchez - Until I found",
    filePath: "song/2.mp3",
    coverPath: "cover/2.jpeg",
  },
  {
    songName: "Rekha Bhadwaj - Phir Le Aya Dil | Barfi",
    filePath: "song/3.mp3",
    coverPath: "cover/3.jpg",
  },
  {
    songName: "Tsuki To Taiyou - One Piece",
    filePath: "song/4.mp3",
    coverPath: "cover/4.png",
  },
  {
    songName: "Lucky Ali - Safarnama | Tamasha",
    filePath: "song/5.mp3",
    coverPath: "cover/5.jpg",
  },
  {
    songName: "Jagjit Singh - Hoshwalon | Sarfarosh",
    filePath: "song/6.mp3",
    coverPath: "cover/6.jpg",
  },
  {
    songName: "Janelle Monáe - We Are Young",
    filePath: "song/7.mp3",
    coverPath: "cover/7.jpeg",
  },
  {
    songName: "AJR - World's Smallest Violin",
    filePath: "song/8.mp3",
    coverPath: "cover/8.jpg",
  },
  {
    songName: "Hakuna Kanata - Viz | Naruto",
    filePath: "song/9.mp3",
    coverPath: "cover/9.jpg",
  },
  {
    songName: "A.R. Rahman - Roobaroo | Rang De Basanti",
    filePath: "song/10.mp3",
    coverPath: "cover/10.jpeg",
  },
  {
    songName: "Aloe Blacc - Wake Me Up(Acoustic)",
    filePath: "song/11.mp3",
    coverPath: "cover/11.jpg",
  },
];

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds}`;
}

//iterate through song list
//& update via hard-coded song json (array of objects)
songItems.forEach((element, i) => {
  songIndex = i;
  // console.log((audioElement.currentTime / audioElement.duration) * 100);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByTagName("span")[0].textContent = songs[i].songName;
  //element.getElementsByTagName('span')[1].textContent = formatTime(audioElement.duration);
});

//Handle play/pause click
masterPlay.addEventListener("click", playFunction);

function playFunction() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
}

//Listen to Events - Time Update
audioElement.addEventListener("timeupdate", () => {
  //Update Seekbar, i.e; progressbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

//make rest(not current) song pause
const PauseRest = () => {
  songItemPlay.forEach((element) => {
    //console.log(element); //the iterated icon --> <i>....</i> 1st song, 2nd song...
    element.classList.add("fa-circle-play");
    element.classList.remove("fa-circle-pause");
  });
};

//Each song's play
songItemPlay.forEach((element, i) => {
  element.addEventListener("click", (e) => {
    //console.log(e.target); //the clicked icon --> <i>....</i>

    songIndex = i;
    PauseRest();
    //icon change
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");

    //song change to current
    audioElement.src = songs[songIndex].filePath; //audioElement.src = `song/${index+1}.mp3`;
    audioElement.play();
    gif.style.opacity = 1;
    //masterplay button change
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");

    //bottom songName change to current
    songInfo.innerHTML = songs[songIndex].songName; //console.log(songInfo)
  });
});

//Forward Button
forwardPlay.addEventListener("click", () => {
  //limit exceed case
  if (songIndex > songs.length - 2) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  //song change to next
  audioElement.src = songs[songIndex].filePath; //audioElement.src = `song/${index+1}.mp3`;
  audioElement.play();
  gif.style.opacity = 1;
  //masterplay button change
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");

  //bottom songName change to current
  songInfo.innerHTML = songs[songIndex].songName; //console.log(songInfo)
  console.log(songIndex);
});

//Backward Button
backPlay.addEventListener("click", () => {
  //limit exceed case
  if (songIndex < 1) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  //song change to previous
  audioElement.src = songs[songIndex].filePath; //audioElement.src = `song/${index+1}.mp3`;
  audioElement.play();
  gif.style.opacity = 1;
  //masterplay button change
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");

  //bottom songName change to current
  songInfo.innerHTML = songs[songIndex].songName; //console.log(songInfo)
});

//Future Scopes:
//Time duration
//Spin the playing song images
