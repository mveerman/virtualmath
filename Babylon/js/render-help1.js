
Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
};

// derdemachts vergelijking oplossing (3 waardes in oorspronklijk script, waarvan 1 gekozen, niet gebruikte if's verwijderd)
var volume;
var volumeMin;
var volumeMax ;
var a = Math.PI/3;
var b = -Math.PI;
var c = 0;
var d = volume;
var oplossing;
var root;

		
function oplossen()
{
	d = volume;
	var q = (3*a*c-b*b)/(9*a*a);
	var r = (9*a*b*c - 27*a*a*d - 2*b*b*b)/(54*a*a*a);
	var qqq_plus_rr = q*q*q + r*r;
	if (qqq_plus_rr < 0)
	{
		var j = Math.sqrt(-q);
		var i = j*j*j;
		var k = Math.acos( r/i );
		var M = Math.cos(k/3);
		var N = Math.sqrt(3) * Math.sin(k/3);
		var b_over_3a = b/(3.0*a);
		root =  j*(N - M) - b_over_3a;
		oplossing  = root.toPrecision(5);
	}
}


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

    BABYLON.SceneLoader.ImportMesh("", "models/", "help-1-04.babylon", scene, function (newMeshes) {

        //scene.debugLayer.show();


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
        knopgroen.diffuseColor = new BABYLON.Color3(0, 0.7, 0);
		knopgroen.emissiveColor = new BABYLON.Color3(0, 0.5, 0);
        var knoprood = new BABYLON.StandardMaterial("std", scene);
        knoprood.diffuseColor = new BABYLON.Color3(1, 0, 0);
		knoprood.emissiveColor = new BABYLON.Color3(0.5, 0, 0);
		
		var knopGeluid = new BABYLON.Sound("water", "models/knop.mp3" , scene, function () {});
		var waterGeluid = new BABYLON.Sound("water", "models/water.mp3" , scene, function () {});
		var starttijd;
        knop.material = knopgroen;

        var generator = new BABYLON.ShadowGenerator(512, light2);
        generator.getShadowMap().renderList.push(stang);
        generator.getShadowMap().renderList.push(bol);
        generator.getShadowMap().renderList.push(vierkant);
        generator.getShadowMap().renderList.push(nummers);
        generator.getShadowMap().renderList.push(voet);

        generator.useBlurVarianceShadowMap = true;
        generator.blurBoxOffset = 5;

		var capKleur = new BABYLON.StandardMaterial("topkleur", scene);		
		var kleurDiffuse = ['#FFFF00','#00FFFF','#00FF00','#FF00FF','#FF0000','#0000FF'];
		var kleurEmissive = ['#666600','#006666','#006600','#660066','#660000','#000066'];
		var kleurSpecular = ['#888800','#008888','#008800','#880088','#880000','#000088'];

		for (var i = 0; i < newMeshes.length; i++) {
			newMeshes[i].receiveShadows = false;
		}
		
		var kleurNum = 0;
        var processing = false;
		

        scene.onPointerDown = function (evt, pickResult) {
            var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) {
                return mesh !== ground;
            });

            if (pickInfo.hit && kleurNum < 6 && !processing) {
                var currentMesh = pickInfo.pickedMesh;

                if (currentMesh.name === 'knop') {
	       			camera.detachControl(canvas);
                   alsKnop();
                }
            }
        };

		var lastCalledTime;
		var delta; 
		
		//vraag verstreken tijd op
		function verstrekenTijd() {
		
		  if(!lastCalledTime) {
			 lastCalledTime = Date.now();
			 return;
		  }
		  delta = (Date.now() - lastCalledTime)/1000;
		  lastCalledTime = Date.now();
		} 

		function alsKnop(){
			knopGeluid.play(0);
			knop.position.z = knoppos + 3;
			knop.material = knoprood;
  
			var kleurAniStart = 105 + kleurNum * 420;
			var kleurAniStop = 430 + kleurNum * 420;
  
			kleurNum = kleurNum + 1;
			
			//animatie nummers  
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
				
				processing = false;
				scene.stopAnimation(straalDown);
				knop.position.z = knoppos;
				knop.material = knopgroen;
			});		
			
			// vertraging voor vollopen ivm dalen straal	
			window.setTimeout(function () {
		        processing = true;
				verstrekenTijd();
  				starttijd = lastCalledTime;
				waterGeluid.play();
								
				//1/6e inhoud bol = 4/3*pi*r*r
				volumeMin = ((kleurNum-1)*4/18*Math.PI);  
				volumeMax = (kleurNum*4/18*Math.PI);
				capKleur.emissiveColor = new BABYLON.Color3.FromHexString(kleurDiffuse[kleurNum-1]);
					
				}, 600);
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
			var vinger = BABYLON.Mesh.CreatePlane("vinger", 40, scene);
			var vingermat = new BABYLON.StandardMaterial("", scene);
			vingermat.emissiveTexture = new BABYLON.Texture("img/vinger.png", scene);
			vingermat.opacityTexture = vingermat.emissiveTexture;
		
			vinger.position.z = 400;
			vinger.position.x = -110;
			vinger.position.y = -75;
			vinger.material = vingermat;
			vinger.parent = camera;    
			vinger.renderingGroupId = 1;
			light1.excludedMeshes = [vinger];
			light2.excludedMeshes = [vinger];
			
			knop.isPickable = true;
		
			knop.absolutePosition.x = -171;
			knop.absolutePosition.y = -88;
			knop.absolutePosition.z = -32;
		}
		
		var sapTexture = new BABYLON.StandardMaterial("colours", scene);
		sapTexture.diffuseTexture = new BABYLON.Texture("models/colours.png", scene);
		sapTexture.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
		sapTexture.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
		var slicje = 0.01;
		var cap;
		var sphere;
		var deler = 1;
	
		scene.registerBeforeRender(function () {
				
			if (isVR) {
				var Lookout = camera.position.clone();
				var direction = vinger.absolutePosition.subtract(Lookout);
				var offset = direction.clone().scale(10);
				var rayOrigin = Lookout.add(offset);
				var ray = new BABYLON.Ray(camera.position,rayOrigin);
				var pickResult = scene.pickWithRay(ray);
					
				if (pickResult.hit && kleurNum < 6 && !processing) {
					if (pickResult.pickedMesh === knop){
						//var axisX = BABYLON.Mesh.CreateLines("axisX", [camera.position,rayOrigin], scene);
						alsKnop();
						processing = true;
					}
				}
			}
			
			if (processing){
								
				verstrekenTijd();
				var elapsed = lastCalledTime - starttijd;

				if (elapsed <= 10000){
					volume = elapsed/10000 * (volumeMax-volumeMin)	+ volumeMin;			
				}else{
					volume = volumeMax;
				}
				
				if (deler === 2){ //vul eens per 3 beelden (CPU belasting lager)
					deler = 0;
					oplossen();
					slicje = oplossing/2;
					
					//omzetting van longitudinaal naar hoogte
					var slicenew = Math.acos(1-(2*slicje))/Math.PI;
					var straalCap = Math.sqrt(1-((1-slicje*2)*(1-slicje*2)))*200;
	
					if(typeof cap !== "undefined"){cap.dispose();}
					cap = BABYLON.Mesh.CreateCylinder("kappie", 1, straalCap, straalCap, 48, scene, 1);cap.scaling.y = 0;
					cap.position.y = -100 + slicje * 200;
					cap.position.x = 124.5019;
					if(typeof sphere !== "undefined"){sphere.dispose();}
					sphere = BABYLON.MeshBuilder.CreateSphere("waterbol", {diameter: 200, diameterX: 200, slice: slicenew,  updatable: true}, scene);
					sphere.position.x = 124.5019;
					sphere.rotation.z = Math.PI;
					cap.material = capKleur;
					sphere.material = sapTexture;
					sapTexture.diffuseTexture.vScale = slicenew;
					generator.getShadowMap().renderList.push(cap);
					generator.getShadowMap().renderList.push(sphere);
				}else{
					deler++;
				}
			}
			console.log(camera.fov)
			//auto scaling windows bij browser opening of rescale
			var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
			var aspect = HEIGHT/WIDTH;
			if(aspect < 0.7) {
				camera.fov = 0.7;
				}else{
				camera.fov = aspect*1;
			}
		});
	});
    return scene;

};
