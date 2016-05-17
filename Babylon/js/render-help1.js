
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

        //Set the target of the camera to the first imported mesh
        //camera.setTarget = new BABYLON.Vector3(0, 500, 0);

        scene.debugLayer.show();

        //maak meshes pickable
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

		var knopGeluid = new BABYLON.Sound("water", "models/knop.mp3" , scene, function () {});
		var waterGeluid = new BABYLON.Sound("water", "models/water.mp3" , scene, function () {});
		var starttijd
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


        for (var i = 0; i < newMeshes.length; i++) {
            newMeshes[i].receiveShadows = false;
        }

        for (var j = 3; j < 203; j++) {
            // getallen naar naam
            var tempName = 'Plane' + (j).pad(3);
            var tempPlaneMesh = scene.getMeshByName(tempName);
            generator.getShadowMap().renderList.push(tempPlaneMesh);
        }
		
		 var kleurNum = 0;
        var processing = false;
		

        scene.onPointerDown = function (evt, pickResult) {
            var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) {
                return mesh !== ground;
            });

            if (pickInfo.hit && kleurNum < 6 && !processing) {
                var currentMesh = pickInfo.pickedMesh;

                if (currentMesh.name == 'knop') {
	       			camera.detachControl(canvas);
                   alsKnop();
                }
            }
        };

		var lastCalledTime;
		var fps;
		var delta; 
		
		//vraag verstreken tijd op
		function verstrekenTijd() {
		
		  if(!lastCalledTime) {
			 lastCalledTime = Date.now();
			 fps = 0;
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
				verstrekenTijd()
  				starttijd = lastCalledTime
				waterGeluid.play();
								
				switch (kleurNum) {
					case 1:
						volumeMin = 0
						volumeMax = 0.6981	// 1/6 gevuld
						capKleur.emissiveColor = new BABYLON.Color3(1, 1, 0);
						break;
					case 2:
						volumeMin = 0.6981
						volumeMax = 1.3963	// 1/3 gevuld
						capKleur.emissiveColor = new BABYLON.Color3(0, 1, 1);
						break;
					case 3:
						volumeMin = 1.3963
						volumeMax = 2.0944	// 1/2 gevuld
						capKleur.emissiveColor = new BABYLON.Color3(0, 1, 0);
						break;
					case 4:
						volumeMin = 2.0944
						volumeMax = 2.7925	// 2/3 gevuld
						capKleur.emissiveColor = new BABYLON.Color3(1, 0, 1);
					   break;
					case 5:
						volumeMin = 2.7925
						volumeMax = 3.4907	// 5/6 gevuld
						capKleur.emissiveColor = new BABYLON.Color3(1, 0, 0);
						break;
					case 6:
						volumeMin = 3.4907
						volumeMax = 4.1887	// gevuld
						capKleur.emissiveColor = new BABYLON.Color3(0, 0, 1);
						break;
					}
					
				}, 600);
	    }

		// derdemachts vergelijking oplossing (3 waardes in oorspronklijk script, waarvan 1 gekozen)
		function cube_root(x)
		{
			var cube_root
			if(x < 0)
			{
				cube_root = -Math.pow( -x,(1.0/3.0) );
			}
			else
			{
				cube_root = Math.pow( x,(1.0/3.0) );
			}
			return cube_root;
		}
					
		function oplossen()
		{
			d = volume
			var q = (3*a*c-b*b)/(9*a*a);
			var r = (9*a*b*c - 27*a*a*d - 2*b*b*b)/(54*a*a*a);
			var root_im
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
				oplossing  = root.toPrecision(8);
			}
			else
			{
				if(qqq_plus_rr > 0)
				{
					var root_qqq_plus_rr = Math.sqrt(qqq_plus_rr);
		
					var s = cube_root( r + root_qqq_plus_rr );
					var t = cube_root( r - root_qqq_plus_rr );
		
					if(root_im > 0)
					{
						oplossing  = root_re.toPrecision(8) + " + " + root_im.toPrecision(8) + " i";
					}
					if(root_im < 0)
					{
						oplossing  = root_re.toPrecision(8) + " - " + (-root_im).toPrecision(8) + " i";
					}
					if(root_im == 0)
					{
						oplossing  = root_re.toPrecision(8);
					}
				}
				else
				{
					root = -cube_root(d/a);
					oplossing  = root.toPrecision(6);
				}
			}
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
			
			ground.isPickable = false;
			bol.isPickable = false;
			vinger.isPickable = false;
			knop.isPickable = true;
		
			knop.absolutePosition.x = -171;
			knop.absolutePosition.y = -88;
			knop.absolutePosition.z = -32;
		}
		
		var sapTexture = new BABYLON.StandardMaterial("colours", scene);
		sapTexture.diffuseTexture = new BABYLON.Texture("models/colours.png", scene);
		sapTexture.emissiveColor = new BABYLON.Color3(.7, .7, .7)
		sapTexture.specularColor = new BABYLON.Color3(.5, .5, .5)
		var slicje = 0.01
		var cap
		var sphere
		var volume
		var volumeMin
		var volumeMax 
		var a = Math.PI/3
		var b = -Math.PI
		var c = 0
		var d = volume
		var oplossing
		var root
	
		scene.registerBeforeRender(function () {
				
			if (isVR) {
				var Lookout = camera.position.clone();
				var direction = vinger.absolutePosition.subtract(Lookout);
				var offset = direction.clone().scale(10);
				var rayOrigin = Lookout.add(offset);
				var ray = new BABYLON.Ray(camera.position,rayOrigin);
				var pickResult = scene.pickWithRay(ray);
						
				if (pickResult.hit && kleurNum < 6 && !processing) {
					if (pickResult.pickedMesh == knop){
						//var axisX = BABYLON.Mesh.CreateLines("axisX", [camera.position,rayOrigin], scene);
						alsKnop();
						processing = true;
					}
				}
			};
			
			if (processing){
				
				verstrekenTijd()
				var elapsed = lastCalledTime - starttijd

				if (elapsed <= 10000){
					volume = elapsed/10000 * (volumeMax-volumeMin)	+ volumeMin			
				}else{
					volume = volumeMax
				}

				oplossen()
				slicje = oplossing/2
				
				//omzetting van longitudinaal naar hoogte
				var slicenew = Math.acos(1-(2*slicje))/Math.PI
				var straalCap = Math.sqrt(1-((1-slicje*2)*(1-slicje*2)))*200

				if(typeof cap != "undefined"){cap.dispose()}
				cap = BABYLON.Mesh.CreateCylinder("kappie", 1, straalCap, straalCap, 48, scene, 1);cap.scaling.y = 0
				cap.position.y = -100 + slicje * 200
				cap.position.x = 124.5019
				if(typeof sphere != "undefined"){sphere.dispose()}
				sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 200, diameterX: 200, slice: slicenew,  updatable: true}, scene);
				sphere.position.x = 124.5019
				sphere.rotation.z = Math.PI
				cap.material = capKleur;
				sphere.material = sapTexture;
				sapTexture.diffuseTexture.vScale = slicenew;
			};
		});
	});
    return scene;

};
