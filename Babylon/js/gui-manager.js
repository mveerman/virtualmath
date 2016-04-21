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

    var images = {
        normalCamera: 'img/phone.png',
        vrCamera: 'img/oculus.png',
        fullScreen: 'img/fullscreen.png',
        windowedScreen: 'img/screen.png'
    };

    vm.selectVRCamera = function () {
        vm.isVRCameraSelected = true;
        cameraButton.onclick = vm.selectNormalCamera;
        cameraButton.src = images.normalCamera;
        window.redrawScene();
        goFullScreen();
    };
    vm.selectNormalCamera = function () {
        vm.isVRCameraSelected = false;
        cameraButton.onclick = vm.selectVRCamera;
        cameraButton.src = images.vrCamera;
        window.redrawScene();
    };

    vm.selectFullScreen = function () {
        screenButton.onclick = vm.selectWindowedScreen;
        screenButton.src = images.windowedScreen;
        goFullScreen();
    };

    vm.selectWindowedScreen = function () {
        screenButton.onclick = vm.selectFullScreen;
        screenButton.src = images.fullScreen;
        goWindowedScreen();
    };

    var cameraButton = document.getElementById('cameraButton');
    cameraButton.src = images.vrCamera;
    cameraButton.onclick = vm.selectVRCamera;

    var screenButton = document.getElementById('screenButton');
    screenButton.src = images.fullScreen;
    screenButton.onclick = vm.selectFullScreen;

}
