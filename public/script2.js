import  *  as THREE from '/build/three.module.js';
import  { FirstPersonControls }  from '/jsm/controls/FirstPersonControls.js';

var xmin, ymin, zmin, xmax, ymax, zmax, x_range, y_range, z_range;
var controls, clock, scene, camera, renderer;
//Scale down the values by 100
var scale = 100;
var locations = [{"x":60000, "y":0, "z":20000, "c":0x0500ff}, {"x":60000, "y":1400, "z":20000, "c":0x0500ff}, 
                {"x":60000, "y":0, "z":21000, "c":0x0500ff}, {"x":60000, "y":1400, "z":21000, "c":0x0100ff}, 
                {"x":64000, "y":0, "z":20000, "c":0x0100ff}, {"x":64000, "y":1400, "z":20000, "c":0x17ff00}, 
                {"x":64000, "y":0, "z":21000, "c":0xFF8200}, {"x":64000, "y":1400, "z":21000, "c":0x00fff4}]

xmin = getMin(locations, 'x');
ymin = getMin(locations, 'y');
zmin = getMin(locations, 'z');
xmax = getMax(locations, 'x');
ymax = getMax(locations, 'y');
zmax = getMax(locations, 'z');
x_range = (xmax - xmin)/scale;
y_range = (xmax - ymin)/scale;
z_range = (zmax - zmin)/scale;

init();
animate();

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
    clock = new THREE.Clock();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xffffff, 1 );
    document.body.appendChild( renderer.domElement );

    controls = new FirstPersonControls(camera, renderer.domElement);
    //controls.addEventListener('change', render);
    controls.movementSpeed = 10;
    controls.lookSpeed = 0.1;
    controls.activeLook = false;

    renderer.domElement.addEventListener("mousedown", function(){
        controls.activeLook = true;
    });
    renderer.domElement.addEventListener("mouseup", function(){
        controls.activeLook = false;
    });

    var geometry = new THREE.CubeGeometry(9, 9, 9);

    for(var i=0;i<locations.length; i++){
        var material = new THREE.MeshBasicMaterial({color:locations[i].c});
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = ((locations[i].x-xmin)/scale)-100;
        mesh.position.y = ((locations[i].y-ymin)/scale)-100;
        mesh.position.z = ((locations[i].z-zmin)/scale);
        scene.add( mesh );
    }
    camera.position.z = 200;
}

function getMin(getArray, field){
    var min_value;
    for(var i=0; i<getArray.length; i++){
        if(i==0){
            min_value = getArray[i][field];
        }
        else if(getArray[i][field] < min_value){
            min_value = getArray[i][field];
        }
    }
    return min_value;
}

function getMax(getArray, field){
    var max_value;
    for(var i=0; i<getArray.length; i++){
        if(i==0){
            max_value = getArray[i][field];
        }
        else if(getArray[i][field] > max_value){
            max_value = getArray[i][field];
        }
    }
    return max_value;
}

function animate() {
    requestAnimationFrame( animate );
    controls.update( clock.getDelta() );
    render();
}

function render() {
    renderer.render( scene, camera );
}