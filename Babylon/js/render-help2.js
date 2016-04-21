
Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
};

var createScene  = function(engine, canvas) {
    "use strict";

        BABYLON.SceneLoader.Load('models/', 'help-2.babylon', engine, function (scene) {
            scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);

            var balNum = 1;
            var ground = scene.getMeshByName('scherm');
            var plateau = scene.getMeshByName('plateau');
            var stang = scene.getMeshByName('stang');
            var pomphuis = scene.getMeshByName('pomphuis');
            var bal = scene.getMeshByName('bal' + balNum);
            var lat = scene.getMeshByName('lat' + balNum);
            var bol = scene.getMeshByName('bol');
            var vloeistof = scene.getMeshByName('vloeistof');
            var light = scene.getLightByName('FDirect002');

            var j,tempName, tempPlaneMesh;

            for (j = 3; j < 203; j++) {
                // getallen naar naam
                tempName = 'Plane' + (j).pad(3);
                tempPlaneMesh = scene.getMeshByName(tempName);
            }

            //scene.debugLayer.show();
            var vullenMag = false;
            var verschuivenMag = false;
            var balMag = true;
            var startingPoint;
            var currentMesh;
            var kleur = [2, 53, 79, 102, 125, 151, 202]; 	// 6 x startkleurring - stop
            var latPos = [130, 154, 178, 200, 224, 246];
            var balWas = [];
            var kleurNum = 0;
            var aniDown;
            var streepIn = false;
            var wisStreep;
            var lock = false;
            var knop = scene.getMeshByName('knop');
            var knoppos = knop.position.z;

            var sapKleur = new BABYLON.StandardMaterial("std", scene);
            sapKleur.diffuseColor = new BABYLON.Color3(1, 1, 0);
            vloeistof.material = sapKleur;
            var knopgroen = new BABYLON.StandardMaterial("std", scene);
            knopgroen.diffuseColor = new BABYLON.Color3(0, 1, 0);
            var knoprood = new BABYLON.StandardMaterial("std", scene);
            knoprood.diffuseColor = new BABYLON.Color3(1, 0, 0);
            knop.material = knopgroen;

            var generator = new BABYLON.ShadowGenerator(512, light);
            generator.getShadowMap().renderList.push(bol);
            generator.getShadowMap().renderList.push(ground);
            generator.getShadowMap().renderList.push(stang);
            generator.getShadowMap().renderList.push(pomphuis);


            for (var i =0; i < scene.length; i++) {
                scene[i].receiveShadows = false;
            }


            for (j = 3; j < 203; j++) {
                tempName = 'Plane' + (j).pad(3);
                tempPlaneMesh = scene.getMeshByName(tempName);
                generator.getShadowMap().renderList.push(tempPlaneMesh);
            }

            generator.useBlurVarianceShadowMap = true;
            generator.blurBoxOffset = 5.0;

            plateau.receiveShadows = true;
            stang.receiveShadows = false;
            bol.receiveShadows = false;
            pomphuis.receiveShadows = false;
            ground.receiveShadows = false;
            vloeistof.receiveShadows = false;

            var getGroundPosition = function () {
                var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) {
                    return mesh == ground;
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
                        if (currentMesh == bal && balMag) {
                            startingPoint = getGroundPosition(evt);
                            if (streepIn) {
                                aniDown.scaling.y = 0.01;
                                clearTimeout(wisStreep);
                                streepIn = false;
                            }
                            vullenMag = true;
                        }
                    }

                    if (currentMesh == knop && vullenMag) {

                        knop.position.z = knoppos + 2;
                        knop.material = knoprood;
                        knop.diffuseColor = new BABYLON.Color3(1, 0, 0);

                        balMag = false;
                        var start = kleur[kleurNum] + 1;
                        var einde = kleur[kleurNum + 1] + 1;

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

                        for (var k = start; k < einde; k++) {
                            var tempKleur = 'Plane' + (k).pad(3);
                            var kleurAni = scene.getMeshByName(tempKleur);
                            /*jshint -W083 */
                            scene.beginAnimation(kleurAni, kleurAniStart, kleurAniStop, false, 1, function() {
                                if (k === einde && balMag === false) {
                                    balMag = true;
                                    if (balNum <6) {
                                        balNum = balNum + 1;
                                    }
                                    balWas.push(bal.name);
                                    bal = scene.getMeshByName('bal' + balNum);
                                    lat = scene.getMeshByName('lat' + balNum);
                                }
                                scene.stopAnimation(kleurAni);
                            });
                        }
                        var straalNum = 'straal' + kleurNum;
                        var straalDown = scene.getMeshByName(straalNum);
                        lock = true;

                        var waterGeluid = new BABYLON.Sound("water", "models/water.mp3" , scene, function () {
                            waterGeluid.play(0.5);
                        });

                        scene.beginAnimation(straalDown, kleurAniStart, kleurAniStop, false, 1, function() {
                            scene.stopAnimation(straalDown);
                            lock = false;

                        });
                        scene.beginAnimation(vloeistof, 125, 403, false, 1, function() {

                            switch (kleurNum) {
                                case 1:
                                    sapKleur.diffuseColor = new BABYLON.Color3(0, 1, 1);
                                    break;
                                case 2:
                                    sapKleur.diffuseColor = new BABYLON.Color3(0, 1, 0);
                                    break;
                                case 3:
                                    sapKleur.diffuseColor = new BABYLON.Color3(1, 0, 1);
                                    break;
                                case 4:
                                    sapKleur.diffuseColor = new BABYLON.Color3(1, 0, 0);
                                    break;
                                case 5:
                                    sapKleur.diffuseColor = new BABYLON.Color3(0, 0, 1);
                                    break;
                            }
                            vloeistof.material = sapKleur;

                            knop.position.z = knoppos;
                            knop.material = knopgroen;

                            wisStreep = setInterval(function () {
                                aniDown.scaling.y = 0.01;
                                clearTimeout(wisStreep);
                                streepIn = false;
                            }, 5000);


                            if (kleurNum != 6) {
                                scene.beginAnimation(vloeistof, 404, 450, false, 1, function() {});
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
                if (currentMesh == bal || verschuivenMag) {
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