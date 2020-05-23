
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
window.onload = function () {
    
    holderDiv = document.getElementById("houseModel");
    worldCanvas = document.getElementById("houseCanvas");
    initializeRender();
};

function initializeRender() 
{
    console.log("initializing HouseARjs v.01a -- lmao what is life");
    initWorld();
}

function initWorld() 
{

        camera = new THREE.PerspectiveCamera(45, globalAspect, .001, 10000);
        //camera.position.set( 0, originCoords.altitude? originCoords.altitude : 1.6, 0 );
        camera.position.set(0, 1000, 0);
        camera.lookAt(0,0,0);
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: worldCanvas });
        renderer.domElement.style.zIndex = "1";
        renderer.setPixelRatio(globalAspect);
        console.log(renderer.domElement);
        //controls = initMobileControls(camera, renderer);
        window.addEventListener('resize', onWindowResize, false);
        createUIElements();
        animate();
    
        var light = new THREE.PointLight( 0xffffcc, 20, 200 );
        light.position.set( 4, 30, -20 );
        scene.add( light );

        var light2 = new THREE.AmbientLight( 0x20202A, 20, 100 );
        light2.position.set( 30, -10, 30 );
        scene.add( light2 );

}

function animate() 
{
    renderer.render(scene, camera);
    //controls.update();
    setTimeout(animate, 15);
}

function createUIElements()
{
    console.log('ui generating... not');
    var newMesh = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 100, 100), new THREE.MeshBasicMaterial({ color: '#00FF00' }));
    scene.add(newMesh);
}

function onWindowResize() 
{
    camera.updateProjectionMatrix();
}
