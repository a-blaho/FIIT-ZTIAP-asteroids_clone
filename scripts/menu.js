function play() {
  document.getElementById("play").style.display = "none";
  document.getElementById("background").style.display = "none";
  document.getElementById("title").style.display = "none";
  document.getElementById("gameArea").style.display = "block";
  document.getElementById("menu").style.display = "none";
  document.getElementById("htp").style.display = "none";
  document.getElementById("go_title").style.display = "none";
  game();
}

function howToPlay() {
  document.getElementById("htp_screen").style.display = "block";
  document.getElementById("htp").style.display = "block";
  document.getElementById("play").style.display = "none";
  document.getElementById("background").style.display = "none";
  document.getElementById("title").style.display = "none";
  document.getElementById("htp").style.display = "none";
  document.getElementById("menu").style.display = "block";
}

function menu() {
  document.getElementById("play").style.display = "block";
  document.getElementById("background").style.display = "block";
  document.getElementById("title").style.display = "block";
  document.getElementById("gameArea").style.display = "none";
  document.getElementById("htp").style.display = "block";
  document.getElementById("htp_screen").style.display = "none";
  document.getElementById("menu").style.display = "none";
  document.getElementById("go_title").style.display = "none";
}

function gameOver(ctx) {
  document.getElementById("play").style.display = "block";
  document.getElementById("menu").style.display = "block";
  document.getElementById("go_title").style.display = "block";
}

function sound() {
  if(soundCheck) {
    document.getElementById("sound").src = "img/buttons/sound_off.png";
    soundCheck = false;
  }
  else {
    document.getElementById("sound").src = "img/buttons/sound_on.png";
    soundCheck = true;
  }
}
