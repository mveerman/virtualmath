function GUIManager() {
    var vm = this;

    function goFullScreen() {
        var element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    function goWindowedScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
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
        vm.selectFullScreen();
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
