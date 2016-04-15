function GUIManager() {
    var vm = this;
    
    function goFullScreen() {
        var element = document.documentElement;
        element.requestFullscreen ? element.requestFullscreen() : element.mozRequestFullScreen ? element.mozRequestFullScreen() : element.webkitRequestFullscreen ? element.webkitRequestFullscreen() : element.msRequestFullscreen && element.msRequestFullscreen();
    }

    function goWindowedScreen() {
        document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
    }

    vm.isVRCameraSelected = false;

    vm.selectVRCamera = function () {
        vm.isVRCameraSelected = true;
        cameraButton.onclick = vm.selectNormalCamera;
        cameraButton.src = 'img/oculus.png';
        window.redrawScene();
    };
    vm.selectNormalCamera = function () {
        vm.isVRCameraSelected = false;
        cameraButton.onclick = vm.selectVRCamera;
        cameraButton.src = 'img/phone.png';
        window.redrawScene();
    };

    vm.selectFullScreen = function () {
        screenButton.onclick = vm.selectWindowedScreen;
        screenButton.src = 'img/screen.png';
        goFullScreen();
    };

    vm.selectWindowedScreen = function () {
        screenButton.onclick = vm.selectFullScreen;
        screenButton.src = 'img/fullscreen.png';
        goWindowedScreen();
    };

    var cameraButton = document.getElementById('cameraButton');
    cameraButton.src = 'img/oculus.png';
    cameraButton.onclick = vm.selectVRCamera;

    var screenButton = document.getElementById('screenButton');
    screenButton.src = 'img/fullscreen.png';
    screenButton.onclick = vm.selectFullScreen;

}
