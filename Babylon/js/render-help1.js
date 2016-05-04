
Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
};

var createScene = function(engine, canvas, isVR) {
    "use strict";

   // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);

    var camera;

    if (isVR) {
        camera = new BABYLON.VRDeviceOrientationArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 500, BABYLON.Vector3.Zero(), scene);
    } else {
        camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 500, BABYLON.Vector3.Zero(), scene);
    }

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    BABYLON.SceneLoader.ImportMesh("", "models/", "help-1.babylon", scene, function (newMeshes) {

        // Set the target of the camera to the first imported mesh
        //camera.setTarget = new BABYLON.Vector3(0, 500, 0);

        //scene.debugLayer.show();

        // maak meshes pickable
        newMeshes.forEach(function(element) {
            element.isPickable = true;
        });

        //OBJECTEN KUNNEN NIET MEER DAN 4 LICHTEN HANDELEN

        var light1 = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-40, -200, -200), scene); // van voren
        var light2 = new BABYLON.DirectionalLight("light2", new BABYLON.Vector3(-40, -100, 100), scene); // van achteren

        light1.intensity = 1;
        light2.intensity = 1;

        var stang = scene.getMeshByName('stang');
        var ground = scene.getMeshByName('plateau');
        var bol = scene.getMeshByName('bol');
        var vierkant = scene.getMeshByName('vierkant');
        var nummers = scene.getMeshByName('num021');
        var voet = scene.getMeshByName('voet');
        var knop = scene.getMeshByName('knop');
        var knoppos = knop.position.z;

        var knopgroen = new BABYLON.StandardMaterial("std", scene);
        knopgroen.diffuseColor = new BABYLON.Color3(0, 1, 0);
        var knoprood = new BABYLON.StandardMaterial("std", scene);
        knoprood.diffuseColor = new BABYLON.Color3(1, 0, 0);

        knop.material = knopgroen;

        var generator = new BABYLON.ShadowGenerator(1024, light2);
        generator.getShadowMap().renderList.push(stang);
        generator.getShadowMap().renderList.push(bol);
        generator.getShadowMap().renderList.push(vierkant);
        generator.getShadowMap().renderList.push(nummers);
        generator.getShadowMap().renderList.push(voet);

        generator.useBlurVarianceShadowMap = true;
        generator.blurBoxOffset = 5;

        for (var i = 0; i < newMeshes.length; i++) {
            newMeshes[i].receiveShadows = false;
        }

        for (var j = 3; j < 203; j++) {
            // getallen naar naam
            var tempName = 'Plane' + (j).pad(3);
            var tempPlaneMesh = scene.getMeshByName(tempName);
            generator.getShadowMap().renderList.push(tempPlaneMesh);
        }

        var kleur = [2, 53, 79, 102, 125, 151, 202]; 	// 6 x startkleurring - stop
        var kleurNum = 0;
        var processing = 0;

        scene.onPointerDown = function (evt, pickResult) {
            var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) {
                return mesh !== ground;
            });

            if (pickInfo.hit && kleurNum < 6 && processing === 0) {
                var currentMesh = pickInfo.pickedMesh;

                if (currentMesh.name == 'knop') {
	       			camera.detachControl(canvas);
                   alsKnop()
                }
            }
        };



		function alsKnop(){
			knop.position.z = knoppos + 3;
			knop.material = knoprood;
  
			knop.diffuseColor = new BABYLON.Color3(1, 0, 0);
  
			var start = kleur[kleurNum] + 1;
			var einde = kleur[kleurNum + 1] + 1;
  
			var kleurAniStart = 105 + kleurNum * 420;
			var kleurAniStop = 430 + kleurNum * 420;
  
			kleurNum = kleurNum + 1;
			processing = 0;
  
			for (var k = start; k < einde; k++) {
				var tempKleur = 'Plane' + (k).pad(3);
				var kleurAni = scene.getMeshByName(tempKleur);
				/*jshint -W083 */
				scene.beginAnimation(kleurAni, kleurAniStart, kleurAniStop, false, 1, function() {
					scene.stopAnimation(kleurAni);
				});
			}
  
			for (var l = 0; l < 22; l++) {
				var tempNum = 'num' + (l).pad(3);
				var nummers = scene.getMeshByName(tempNum);
				/*jshint -W083 */
				scene.beginAnimation(nummers, kleurAniStart, kleurAniStop, false, 1, function() {
					scene.stopAnimation(nummers);
				});
			}
  
			var straalNum = 'straal' + kleurNum;
			var straalDown = scene.getMeshByName(straalNum);
			scene.beginAnimation(straalDown, kleurAniStart, kleurAniStop, false, 1, function() {
				processing = 0;
				scene.stopAnimation(straalDown);
				knop.position.z = knoppos;
				knop.material = knopgroen;
			});
	    }

        scene.onPointerUp = function () {
            camera.attachControl(canvas, true);
        };

        stang.receiveShadows = false;
        bol.receiveShadows = false;
        vierkant.receiveShadows = false;
        nummers.receiveShadows = false;
        voet.receiveShadows = false;
        ground.receiveShadows = true;

		if (isVR) {	
			var circle = BABYLON.Mesh.CreatePlane("circle", 40, scene);
			var circlemat = new BABYLON.StandardMaterial("", scene);
			circlemat.emissiveTexture = new BABYLON.Texture("img/vinger.png", scene);
			circlemat.opacityTexture = circlemat.emissiveTexture;
		
			circle.position.z = 400;
			circle.position.x = -110;
			circle.position.y = -75;
			circle.material = circlemat;
			circle.parent = camera;    
			circle.renderingGroupId = 1;
			light1.excludedMeshes = [circle];
			light2.excludedMeshes = [circle];
			
			ground.isPickable = false
			bol.isPickable = false
			circle.isPickable = false
			knop.isPickable = true
		
			knop.absolutePosition.x = -171
			knop.absolutePosition.y = -88
			knop.absolutePosition.z = -32
			
		
			scene.registerBeforeRender(function () {
					
					var Lookout = camera.position.clone();
					var direction = circle.absolutePosition.subtract(Lookout);
					var offset = direction.clone().scale(10);
					var rayOrigin = Lookout.add(offset);
					var ray = new BABYLON.Ray(camera.position,rayOrigin);
					var pickResult = scene.pickWithRay(ray);
							
					if (pickResult.hit && kleurNum < 6 && processing == 0) {
						if (pickResult.pickedMesh == knop){
							//var axisX = BABYLON.Mesh.CreateLines("axisX", [camera.position,rayOrigin], scene);
							alsKnop()
							processing = 1
						}
					}
		
			});
	
		}
	});
    return scene;

};
