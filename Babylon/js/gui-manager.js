function goFullScreen() {
    var element = document.documentElement;
    element.requestFullscreen ? element.requestFullscreen() : element.mozRequestFullScreen ? element.mozRequestFullScreen() : element.webkitRequestFullscreen ? element.webkitRequestFullscreen() : element.msRequestFullscreen && element.msRequestFullscreen();
}

function goCardboard() {
    document.location = "webvr-2.html";
}