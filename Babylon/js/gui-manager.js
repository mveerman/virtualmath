function GUIManager() {
    var vm = this;

    function callOneIfExists(element, methods) {
        methods.some(function (method) {
            if (element[method]) {
                element[method]();
                return true;
            }
        })
    }

    function goFullScreen() {
        callOneIfExists(document.documentElement, ['requestFullscreen', 'webkitRequestFullscreen', 'mozRequestFullScreen', 'msRequestFullscreen']);
    }

    function goWindowedScreen() {
        callOneIfExists(document, ['exitFullscreen', 'webkitExitFullscreen', 'mozCancelFullScreen', 'msExitFullscreen']);
    }

    vm.isVRCameraSelected = false;

    var images = {
        normalCamera: 'img/phone.png',
        vrCamera: 'img/cardboard.png',
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
