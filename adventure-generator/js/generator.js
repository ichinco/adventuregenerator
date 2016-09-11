function getRandomAdventure() {
    var randomIndex = Math.floor(Math.random()*(adventures.length-1));
    var adventure = adventures[randomIndex];
    document.getElementById("current-adventure").innerHTML= adventure["summary"];
}