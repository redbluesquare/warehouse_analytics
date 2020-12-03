import  *  as THREE from '/build/three.module.js';
import  { FirstPersonControls }  from '/jsm/controls/FirstPersonControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
const clock = new THREE.Clock();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const controls = new FirstPersonControls(camera, renderer.domElement); 
controls.movementSpeed = 10;
controls.lookSpeed = 0.1;
controls.activeLook = false;


renderer.domElement.addEventListener("mousedown", function(){
    controls.activeLook = true;
});
renderer.domElement.addEventListener("mouseup", function(){
    controls.activeLook = false;
});

const ambientLight = new THREE.AmbientLight( 0x606060 );
scene.add( ambientLight );

function addLocation(l = 1, w = 1, h = 1, posx = 0, posy = 0, posz = 0){
    const geometry = new THREE.BoxGeometry(l, w, h);
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.y = posy;
    scene.add( cube );
}

addLocation(1,1,1,0,0.5);

const texture = new THREE.TextureLoader().load( "/img/concrete_texture3_2.jpg" );
// assuming you want the texture to repeat in both directions:
texture.wrapS = THREE.RepeatWrapping; 
texture.wrapT = THREE.RepeatWrapping;

// how many times to repeat in each direction; the default is (1,1),
//   which is probably why your example wasn't working
texture.repeat.set( 300, 200 );
const planegeo = new THREE.PlaneGeometry( 1000, 1000, 32 );
const planemat = new THREE.MeshBasicMaterial( {map : texture, side: THREE.DoubleSide} );
planegeo.rotateX( - Math.PI / 2 );
const plane = new THREE.Mesh( planegeo, planemat );
plane.position.y = 0;
plane.position.z = 0;
scene.add( plane );


camera.position.z = 5;
camera.position.y = 1;

const animate = function () {
    requestAnimationFrame( animate );
    controls.update( clock.getDelta() );
    renderer.render( scene, camera );
};

animate();