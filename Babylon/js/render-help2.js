
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
var lastCalledTime;
var delta; 
var starttijd;
		
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

//vraag verstreken tijd op
function verstrekenTijd() {

  if(!lastCalledTime) {
	 lastCalledTime = Date.now();
	 return;
  }
  delta = (Date.now() - lastCalledTime)/1000;
  lastCalledTime = Date.now();
} 
		

var createScene  = function(engine, canvas) {
    "use strict";

        BABYLON.SceneLoader.Load('models/', 'help-2.babylon', engine, function (scene) {
            scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);
			//scene.debugLayer.show();
            var balNum = 1;
            var ground = scene.getMeshByName('scherm');
            var plateau = scene.getMeshByName('plateau');
            var stang = scene.getMeshByName('stang');
            var pomphuis = scene.getMeshByName('pomphuis');
            var bal = scene.getMeshByName('bal' + balNum);
            var lat = scene.getMeshByName('lat' + balNum);
            var bol = scene.getMeshByName('bol');
            var vloeistof = scene.getMeshByName('vloeistof');
			var light3 = scene.getLightByName('FDirect001');
			var light4 = scene.getLightByName('FDirect002');
			
			//var camera = scene.getCameraByName('Camera002');
			//console.log(camera.position.x,camera.position.y,camera.position.z)
       		//var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(78.685, 53.1421, -1024.8871), scene);
			//camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
			//camera.fov = 0.3
  			//camera.attachControl(canvas, true);
	        //scene.activeCamera = camera;
	   
			var light1 = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-40, -100, 100), scene); // van achteren
			var light2 = new BABYLON.DirectionalLight("light2", new BABYLON.Vector3(-40, -100, -100), scene); // van voren

			light1.intensity = 1;
			light2.intensity = 0.9;
			light3.intensity = 0;
			light4.intensity = 0;
						
			var knopGeluid = new BABYLON.Sound("water", "models/knop.mp3" , scene, function () {});
			var waterGeluid = new BABYLON.Sound("water", "models/water.mp3" , scene, function () {});

            //scene.debugLayer.show();
            var vullenMag = false;
            var verschuivenMag = false;
            var balMag = true;
            var startingPoint;
            var currentMesh;
            var latPos = [130, 154, 178, 200, 224, 246];
			var kleurDiffuse = ['#FFFF00','#00FFFF','#00FF00','#FF00FF','#FF0000','#0000FF'];
			var kleurEmissive = ['#666600','#006666','#006600','#660066','#660000','#000066'];
			var kleurSpecular = ['#888800','#008888','#008800','#880088','#880000','#000088'];
            var balWas = [];
            var kleurNum = 0;
        	var processing = false;
            var aniDown;
            var streepIn = false;
            var wisStreep;
            var lock = false;
            var knop = scene.getMeshByName('knop');
            var knoppos = knop.position.z;

            var sapKleur = new BABYLON.StandardMaterial("std", scene);
            sapKleur.diffuseColor = new BABYLON.Color3.FromHexString(kleurDiffuse[0]);
			sapKleur.emissiveColor = new BABYLON.Color3.FromHexString(kleurEmissive[0]);
			sapKleur.specularColor = new BABYLON.Color3.FromHexString(kleurSpecular[0]);
			
            vloeistof.material = sapKleur;
            var knopgroen = new BABYLON.StandardMaterial("std", scene);
            knopgroen.diffuseColor = new BABYLON.Color3(0, 1, 0);
			knopgroen.emissiveColor = new BABYLON.Color3(0, 0.5, 0);
            var knoprood = new BABYLON.StandardMaterial("std", scene);
            knoprood.diffuseColor = new BABYLON.Color3(1, 0, 0);
			knoprood.emissiveColor = new BABYLON.Color3(0.5, 0, 0);
            knop.material = knopgroen;

            var generator = new BABYLON.ShadowGenerator(256, light1);
            generator.getShadowMap().renderList.push(bol);
            generator.getShadowMap().renderList.push(ground);
            generator.getShadowMap().renderList.push(stang);
            generator.getShadowMap().renderList.push(pomphuis);
			var capKleur = new BABYLON.StandardMaterial("topkleur", scene);	

            for (var i =0; i < scene.meshes.length; i++) {
                scene.meshes[i].receiveShadows = false;
            }

            generator.useBlurVarianceShadowMap = true;
            generator.blurBoxOffset = 5.0;

            plateau.receiveShadows = true;

      		var sapTexture = new BABYLON.StandardMaterial("colours", scene);
			sapTexture.diffuseTexture = new BABYLON.Texture("models/colours.png", scene);
			sapTexture.emissiveColor = new BABYLON.Color3(0.7, 0.7, 0.7);
			sapTexture.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
			var slicje = 0.01;
			var cap;
			var sphere;
			var deler = 1; 

            var getGroundPosition = function () {
                var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) {
                    return mesh === ground;
                });
                if (pickinfo.hit) {
                    return pickinfo.pickedPoint;
                }
                return null;
            };



            var onPointerDown = function (evt) {
                if (evt.button !== 0) {
                    return;
                }
				
						
                // check if we are under a mesh
                var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) {
                    return mesh !== ground;
                });
                if (pickInfo.hit) {
                    currentMesh = pickInfo.pickedMesh;

                    if (balWas.indexOf(currentMesh.name) > -1 && !lock){
                        startingPoint = getGroundPosition(evt);
                        if (streepIn) {
                            aniDown.scaling.y = 0.01;
                            clearTimeout(wisStreep);
                            streepIn = false;
                        }
                        verschuivenMag = true;
                    } else {
                        if (currentMesh === bal && balMag) {
                            startingPoint = getGroundPosition(evt);
                            if (streepIn) {
                                aniDown.scaling.y = 0.01;
                                clearTimeout(wisStreep);
                                streepIn = false;
                            }
                            vullenMag = true;
                        }
                    }

                    if (currentMesh === knop && vullenMag) {

						knopGeluid.play(0);

                        knop.position.z = knoppos + 2;
                        knop.material = knoprood;
                        knop.diffuseColor = new BABYLON.Color3(1, 0, 0);

                        balMag = false;
 
                        vullenMag = false;

                        var kleurAniStart = 105 + kleurNum * 420;
                        var kleurAniStop = 430 + kleurNum * 420;
                        if (kleurNum < 6) {
                            kleurNum = kleurNum + 1;
                        }

                        var aniNum = 'lat' + balNum;

                        aniDown = scene.getMeshByName(aniNum);

                        var hoogte = Math.abs(((aniDown.position.y + 82) / 85) -1 );
                        var bolRonding = Math.sin(Math.acos(hoogte)) * 80;
                        var latScale = (latPos[balNum-1]  - bolRonding ) / (latPos[balNum-1] );
                        aniDown.scaling.y = latScale;
                        streepIn = true;


                        var straalNum = 'straal' + kleurNum;
                        var straalDown = scene.getMeshByName(straalNum);
                        lock = true;

                        
						waterGeluid.play(0.5);
						
                        scene.beginAnimation(straalDown, kleurAniStart, kleurAniStop, false, 1, function() {
                            scene.stopAnimation(straalDown);
                            lock = false;
							processing = false;

							knop.position.z = knoppos;
							knop.material = knopgroen;
			
							sapKleur.diffuseColor = new BABYLON.Color3.FromHexString(kleurDiffuse[kleurNum]);
							sapKleur.emissiveColor = new BABYLON.Color3.FromHexString(kleurEmissive[kleurNum]);
							sapKleur.specularColor = new BABYLON.Color3.FromHexString(kleurSpecular[kleurNum]);
							vloeistof.material = sapKleur;
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

                        scene.beginAnimation(vloeistof, 125, 419, false, 1, function() {
                            wisStreep = setInterval(function () {
                                aniDown.scaling.y = 0.01;
                                clearTimeout(wisStreep);
                                streepIn = false;
                            }, 5000);

							balMag = true;
							
							if (balNum <6) {
								balNum = balNum + 1;
							}
							balWas.push(bal.name);
							bal = scene.getMeshByName('bal' + balNum);
							lat = scene.getMeshByName('lat' + balNum);

                            if (kleurNum !== 6) {
								sapKleur.diffuseColor = new BABYLON.Color3.FromHexString(kleurDiffuse[kleurNum]);
								sapKleur.emissiveColor = new BABYLON.Color3.FromHexString(kleurEmissive[kleurNum]);
								sapKleur.specularColor = new BABYLON.Color3.FromHexString(kleurSpecular[kleurNum]);
								vloeistof.material = sapKleur;
                                scene.beginAnimation(vloeistof, 420, 466, false, 1, function() {});
                            }
                        });
                    }
                }
            };

            var onPointerUp = function () {
                startingPoint = null;
                verschuivenMag = false;
            };

            var onPointerMove = function (evt) {
                if (!startingPoint) {
                    return;
                }

                var current = getGroundPosition(evt);

                if (!current) {
                    return;
                }
                if (currentMesh === bal || verschuivenMag) {
                    var diff = current.subtract(startingPoint);
                    currentMesh.position.y = currentMesh.position.y + diff.y;
                    if (currentMesh.position.y < -82) {
                        currentMesh.position.y = -82;
                    }
                    if (currentMesh.position.y > 87) {
                        currentMesh.position.y = 87;
                    }
                    if (vullenMag) {
                        lat.position.y = bal.position.y;
                    }
                    startingPoint = current;
                }
            };

            canvas.addEventListener("pointerdown", onPointerDown, false);
            canvas.addEventListener("pointerup", onPointerUp, false);
            canvas.addEventListener("pointermove", onPointerMove, false);

            scene.onDispose = function () {
                canvas.removeEventListener("pointerdown", onPointerDown);
                canvas.removeEventListener("pointerup", onPointerUp);
                canvas.removeEventListener("pointermove", onPointerMove);
            };



		scene.registerBeforeRender(function () {
			// per x frame een gedeeltelijk bol met y hoogte
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
					cap.position.x = 28.7051;
					if(typeof sphere !== "undefined"){sphere.dispose();}
					sphere = BABYLON.MeshBuilder.CreateSphere("waterbol", {diameter: 200, diameterX: 200, slice: slicenew,  updatable: true}, scene);
					sphere.position.x = 28.7051;
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
		});


            // Wait for textures and shaders to be ready
            scene.executeWhenReady(function () {

                // Once the scene is loaded, just register a render loop to render it
                engine.runRenderLoop(function () {
                    scene.render();

                });
            });
        }, function (progress) {
            // To do: give progress feedback to user
        });

};