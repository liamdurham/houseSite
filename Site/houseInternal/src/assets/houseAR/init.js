
var camera, scene, renderer, controls, holderDiv, globalAspect, worldCanvas;
window.onerror = function (message, file, line) {
    console.log('An error occured at line ' + line + ' of ' + file + ': ' + message);
};

/*
window.onload = function(){
    window.hookIn();
}
*/

// wait for window load, then make the user camera div
window.onload = function () 
{
    globalAspect = window.screen.width/window.screen.height.toFixed(5);
    if(window.devicePixelRatio > 1)
    {
        globalAspect = 1;
    }
    holderDiv = document.getElementById("houseModel");
    worldCanvas = document.getElementById("houseCanvas");   
    initializeRender();
};

window._gotSomething = function (infolol) 
{
    if(globalAspect)
    {
        infolol.forEach(function(unit){
            if(unit.data == '0') 
            {  
                createWarningSphere(houseLocs[unit.message],unit.message);  
            }
            if(unit.data == '1')
            {
                hideWarningSphere(unit.message);   
            }
        });
    }
}

var houseLocs = 
    {
        master: new THREE.Vector3(-100,25,-75),
        garage: new THREE.Vector3(-100,25,50),
        kitchenDing: new THREE.Vector3(0,25,40),
        livingRm: new THREE.Vector3(0,25,-25),
        topPorch: new THREE.Vector3(-25,25,-75),
        office: new THREE.Vector3(125,25,25),
        frontDoor: new THREE.Vector3(75,25,15),
        bedrm: new THREE.Vector3(125,25,-75),
        stairs: new THREE.Vector3(75,0,-75),
        bsmtOffice: new THREE.Vector3(125,-30,-75),
        bsmtMain: new THREE.Vector3(10,-30,-50),
        bsmtMud: new THREE.Vector3(-100,-30,-25),
        bsmtPorch: new THREE.Vector3(-100,-30,-75)
    };


function initializeRender() 
{
    console.log("initializing HouseARjs v.02a -- cool house model kidd");
    initWorld();
}

function initWorld() 
{
        camera = new THREE.PerspectiveCamera(45, globalAspect, .001, 10000);
        //camera.position.set( 0, originCoords.altitude? originCoords.altitude : 1.6, 0 );
        camera.position.set(0, 0, 300);
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x444488 );
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: worldCanvas });
        renderer.domElement.style.zIndex = "1";
        renderer.setPixelRatio(globalAspect);
        renderer.frustumCulled = false;
    console.log(globalAspect);
        console.log(renderer.domElement);
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        window.addEventListener('resize', onWindowResize, false);
        createUIElements();
        animate();
    
        var light = new THREE.PointLight( '#000000', 20, 200 );
        light.position.set( 100, 100, -20 );
            light.castShadow = true;
            light.shadow.mapSize.width = 1024;
			light.shadow.mapSize.height = 1024;
			var d = 10;
			light.shadow.camera.left = - d;
			light.shadow.camera.right = d;
			light.shadow.camera.top = d;
			light.shadow.camera.bottom = - d;
			light.shadow.camera.far = 1000;
        scene.add( light );

        var light2 = new THREE.AmbientLight( 0x20202A, 20, 100 );
        light2.position.set( 30, -10, 30 );
        scene.add( light2 );
}

function animate() 
{
    renderer.render(scene, camera);
    controls.update();
    setTimeout(animate, 15);
}

function createUIElements()
{
    console.log('ui generating... not');
    var newMesh = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 100, 100), new THREE.MeshBasicMaterial({ color: '#00FF00' }));
    var outline = new THREE.BoxBufferGeometry( 100, 100, 100 );
    var edges = new THREE.EdgesGeometry( outline );
    var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: '#FF00FF' } ) );
   // scene.add(line);
    createMainFloor();
    createBasementFloor();
   
    //createRuler(200);
    /*
    for (let [key, value] of Object.entries(houseLocs)) {
        createWarningSphere(value, key);
    }
    */
}

function createFloor()
{
    var floorMaterial = new THREE.MeshLambertMaterial( { color: 0x444488, side: THREE.DoubleSide, transparent: true, opacity: 0.3 } );
    var floorGeometry = new THREE.BoxBufferGeometry( 400, 200, 2 );
    var floorMesh = new THREE.Mesh( floorGeometry, floorMaterial );
    floorMesh.rotation.x -= Math.PI * 0.5;
    floorMesh.position.y -= 1; 
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);
}

function createWarningSphere(pos, name)
{
    console.log(pos);
    console.log(name);
    if(name == null || pos == null)
    {
        return;
    }
    var selectedObject = scene.getObjectByName(name);
    if (selectedObject)
    {
        selectedObject.visible = true;
        return;
    }
    var holderObj = new THREE.Object3D();
    var sphereGeom =  new THREE.SphereBufferGeometry( 16, 16, 16 );
    var redMaterial = new THREE.MeshBasicMaterial( { color: '#FF0000', transparent: true, wireframe: true, opacity: 0.5 } );
    var sphere = new THREE.Mesh( sphereGeom, redMaterial );
    sphere.position.copy(pos);

    holderObj.add(sphere);
   // var textSprite = makeTextSprite((name).toString(), {r: 255, g: 0, b: 0, a: 255}, new THREE.Vector3(pos.x, pos.y, pos.z), Math.PI);
   // holderObj.add(textSprite);
    holderObj.name = name;
    scene.add(holderObj);
}

function hideWarningSphere(name)
{
    var selectedObject = scene.getObjectByName(name);
    if (selectedObject)
    {
        selectedObject.visible = false;
    }
}

function createMainFloor()
{
    const svgMarkup = document.getElementById('Main').outerHTML;
    const loader = new THREE.SVGLoader();
    const svgData = loader.parse(svgMarkup);
    var svgGroup = new THREE.Group();
    // Group we'll use for all SVG paths
    // When importing SVGs paths are inverted on Y axis
    // it happens in the process of mapping from 2d to 3d coordinate system
    //svgGroup.scale.y *= -1;

    const material = new THREE.MeshPhongMaterial({color: '#00FFFF', specular: 0x111111, shininess: 5});

    // Loop through all of the parsed paths
    svgData.paths.forEach((path, i) => {
      console.log(path);    
      const shapes = path.toShapes(true);
      
        // Each path has array of shapes
      shapes.forEach((shape, j) => {
        // Finally we can take each shape and extrude it
          console.log(shape);
          const geometry = new THREE.ExtrudeBufferGeometry(shape, {
          depth: 50,
          bevelEnabled: false
        });  
          
        // Create a mesh and add it to the group
        var edges = new THREE.EdgesGeometry( geometry );
         
        var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: '#FF00FF', width: 10 } ) );    
        line.recieveShadow = true;
        line.castShadow = true;  
        svgGroup.add(line);
      });
    });

    // Meshes we got are all relative to themselves
    // meaning they have position set to (0, 0, 0)
    // which makes centering them in the group easy

    // Get group's size
    const box = new THREE.Box3().setFromObject(svgGroup);
    const size = new THREE.Vector3();
    box.getSize(size);

    const yOffset = size.y / -2;
    const xOffset = size.x / -2;

    // Offset all of group's elements, to center them
    svgGroup.children.forEach(item => {
      item.position.x = xOffset;
      item.position.y = yOffset;
    });
    // Finally we add svg group to the scene
    centerObj(svgGroup);
    scene.add(svgGroup);
    camera.lookAt(svgGroup);
    var svgElem = document.getElementById('Main');
    svgElem.parentNode.removeChild(svgElem);
}


function createBasementFloor()
{
    const svgMarkup = document.getElementById('Basement').outerHTML;
    const loader = new THREE.SVGLoader();
    const svgData = loader.parse(svgMarkup);
    var svgGroup = new THREE.Group();
    // Group we'll use for all SVG paths
    // When importing SVGs paths are inverted on Y axis
    // it happens in the process of mapping from 2d to 3d coordinate system
    //svgGroup.scale.y *= -1;
    const material = new THREE.MeshPhongMaterial({color: '#00FFFF', specular: 0x111111, shininess: 5});
    // Loop through all of the parsed paths
    svgData.paths.forEach((path, i) => {
      console.log(path);    
      const shapes = path.toShapes(true);
      
        // Each path has array of shapes
      shapes.forEach((shape, j) => {
        // Finally we can take each shape and extrude it
          console.log(shape);
          const geometry = new THREE.ExtrudeBufferGeometry(shape, {
          depth: 50,
          bevelEnabled: false
        });  
          
        // Create a mesh and add it to the group
        var edges = new THREE.EdgesGeometry( geometry );
         
        var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: '#00FF00', width: 10 } ) );    
        line.recieveShadow = true;
        line.castShadow = true;  
        svgGroup.add(line); 
      });
    });

    // Meshes we got are all relative to themselves
    // meaning they have position set to (0, 0, 0)
    // which makes centering them in the group easy

    // Get group's size
    const box = new THREE.Box3().setFromObject(svgGroup);
    const size = new THREE.Vector3();
    box.getSize(size);

    const yOffset = size.y / -2;
    const xOffset = size.x / -2;

    // Offset all of group's elements, to center them
    svgGroup.children.forEach(item => {
      item.position.x = xOffset;
      item.position.y = yOffset;
    });
    // Finally we add svg group to the scene
    centerObjBasement(svgGroup);
    scene.add(svgGroup);
    var svgElem = document.getElementById('Basement');
    svgElem.parentNode.removeChild(svgElem);
}

function centerObj(object) {
    object.rotateX(1.5708);
    var box = new THREE.Box3().setFromObject( object )
    var boundingBoxSize = box.max.sub( box.min );
    var height = boundingBoxSize.y;
    object.position.y = height + 2;
    var width = boundingBoxSize.x;
    object.position.x = - width / 2;
    var depth = boundingBoxSize.z;
    object.position.z = - depth;  
    console.log(object);
}

function centerObjBasement(object) {
    object.rotateX(1.5708);
    var box = new THREE.Box3().setFromObject( object )
    var boundingBoxSize = box.max.sub( box.min );
    var height = boundingBoxSize.y;
    
    object.position.y = -4;
    var width = boundingBoxSize.x;
    object.position.x = - width / 2;
    var depth = boundingBoxSize.z;
    object.position.z = - (depth * 1.52);  
    console.log(object);
}

function createRuler(dist)
{
    object = new THREE.Object3D();
    var lineMtrX = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 3, opacity: 1 });
    var lineMtrY = new THREE.LineBasicMaterial({ color: 0x00ffff, linewidth: 3, opacity: 1 });
    var lineMtrZ = new THREE.LineBasicMaterial({ color: 0xffff00, linewidth: 3, opacity: 1 });
   
    /*
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3(0, -dist ,0));
    geo.vertices.push(new THREE.Vector3(0, dist ,0));
    var line = new THREE.Line(geo, lineMtrY);
    object.add(line);
    
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3( (-dist * 2), 0 , 0 ));
    geo.vertices.push(new THREE.Vector3( (dist * 2), 0 , 0 ));    
    var line = new THREE.Line(geo, lineMtrX);
    object.add(line);
    
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3( 0, 0 , (-dist * 2)));
    geo.vertices.push(new THREE.Vector3( 0, 0 , (dist * 2)));    
    var line = new THREE.Line(geo, lineMtrZ);    
    object.add(line);
    */
    
    for(var i = -dist; i < dist; i += 5)
    {
        
        if (i > 0)
        {    
        var geo = new THREE.Geometry();
        geo.vertices.push(new THREE.Vector3(0, i , 3));
        geo.vertices.push(new THREE.Vector3(3, i , 0));
        var line = new THREE.Line(geo, lineMtrY); 
        object.add(line);
        var textSprite = makeTextSprite((i).toString(), {r: 0, g: 40, b: 160, a: 255}, new THREE.Vector3(0.2, i, 3), Math.PI);
        object.add(textSprite);
            
        var geo = new THREE.Geometry();
        geo.vertices.push(new THREE.Vector3(i, 0 , 3));
        geo.vertices.push(new THREE.Vector3(i, 3 , 0));
        var line = new THREE.Line(geo, lineMtrX); 
        object.add(line);
        var textSprite = makeTextSprite((i).toString(), {r: 255, g: 255, b: 255, a: 255}, new THREE.Vector3(i, 3, .2), Math.PI);
        object.add(textSprite);
            
            
        var geo = new THREE.Geometry();
        geo.vertices.push(new THREE.Vector3(3, 0 , i));
        geo.vertices.push(new THREE.Vector3(0, 3 , i));
        var line = new THREE.Line(geo, lineMtrZ); 
        object.add(line);  
        var textSprite = makeTextSprite((i).toString(), {r: 255, g: 255, b: 0, a: 255}, new THREE.Vector3(.2, 3, i), Math.PI);
        object.add(textSprite);
        }
        else
        {
            // lines on neg side
        var geo = new THREE.Geometry();
        geo.vertices.push(new THREE.Vector3(0, i , 1));
        geo.vertices.push(new THREE.Vector3(1, i , 0));
        var line = new THREE.Line(geo, lineMtrY); 
        object.add(line);
        var textSprite = makeTextSprite((i).toString(), {r: 0, g: 40, b: 160, a: 255}, new THREE.Vector3(0.2, i, 3), Math.PI);
        object.add(textSprite);
            
        var geo = new THREE.Geometry();
        geo.vertices.push(new THREE.Vector3(i, 0 , 1));
        geo.vertices.push(new THREE.Vector3(i, 1 , 0));
        var line = new THREE.Line(geo, lineMtrX); 
        object.add(line);
        var textSprite = makeTextSprite((i).toString(), {r: 255, g: 255, b: 255, a: 255}, new THREE.Vector3(i, 3, .2), Math.PI);
        object.add(textSprite);
            
        var geo = new THREE.Geometry();
        geo.vertices.push(new THREE.Vector3(1, 0 , i));
        geo.vertices.push(new THREE.Vector3(0, 1 , i));
        var line = new THREE.Line(geo, lineMtrZ); 
        object.add(line);   
        var textSprite = makeTextSprite((i).toString(), {r: 255, g: 255, b: 0, a: 255}, new THREE.Vector3(.2, 3, i), Math.PI);
        object.add(textSprite);
        }
    }
    console.log(object);
    scene.add(object);
}


function onWindowResize() 
{
    camera.updateProjectionMatrix();
    globalAspect = window.screen.width/window.screen.height.toFixed(5);
    if(window.devicePixelRatio > 1)
    {
        globalAspect = window.devicePixelRatio;
    }
    renderer.setPixelRatio(globalAspect);
    
}

function makeTextSprite(label, fontColor, pos, rot) {
    var fontface = "Arial";
    var fontsize = 24;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize.toString() + "px " + fontface;
    
    context.rotate(-Math.PI);
    context.translate(-canvas.width, -canvas.height);
    context.fillStyle = "rgba(" + fontColor.r + "," + fontColor.g + "," + fontColor.b + "," + fontColor.a + ")";
    context.fillText(label, canvas.width/2, canvas.height/2);
    var texture = new THREE.Texture(canvas);
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    texture.center = new THREE.Vector2(0.5, 0.5);
    texture.rotation = Math.PI;

    var spriteMaterial = new THREE.SpriteMaterial({
        map: texture, color: 0xffffff
    });
    var sprite = new THREE.Sprite(spriteMaterial);

    
    sprite.scale.set(100, 100, 1);
    /*
    if(label % 10 === 0)
    {
         sprite.scale.set(5, 5, 5);   
    }
    if(label % 25 === 0)
    {
         sprite.scale.set(10, 10, 10);   
    }
    if(label % 50 === 0)
    {
         sprite.scale.set(15, 15, 15);   
    }
    if(label.length >= 5)
    {
            sprite.scale.set(15,15,15);
    }
    */
    sprite.position.set(pos.x, pos.y, pos.z);
    return sprite;
}




		