import  *  as THREE from '/build/three.module.js';
import  { FirstPersonControls }  from '/jsm/controls/FirstPersonControls.js';

var xmin, ymin, zmin, xmax, ymax, zmax, lmax, wmax, hmax, x_range, y_range, z_range;
var controls, clock, scene, camera, renderer, gravity = 9, ground = 14, forcey = 0;
let text = "three.js";
//Scale down the values by 100
var scale = 100;
var locations = [{"location": "PAL1-01-001-01-01","x": 60000,"y": 0,"z": 20000,"l": 1200,"w": 1000,"h": 1400,"orientation":4},
            {"location": "PAL1-01-001-01-02","x": 60000,"y": 0,"z": 21000,"l": 1200,"w": 1000,"h": 1400,"orientation":4},
            {"location": "PAL1-01-001-01-03","x": 60000,"y": 0,"z": 22000,"l": 1200,"w": 1000,"h": 1400,"orientation":4},
            {"location": "PAL1-01-001-03-01","x": 60000,"y": 1400,"z": 20000,"l": 1200,"w": 1000,"h": 1400,"orientation":4},
            {"location": "PAL1-01-001-03-02","x": 60000,"y": 1400,"z": 21000,"l": 1200,"w": 1000,"h": 1400,"orientation":4},
            {"location": "PAL1-01-001-03-03","x": 60000,"y": 1400,"z": 22000,"l": 1200,"w": 1000,"h": 1400,"orientation":4},
            {"location": "PAL1-01-002-01-01","x": 64000,"y": 0,"z": 20000,"l": 1200,"w": 1000,"h": 1400,"orientation":2},
            {"location": "PAL1-01-002-01-02","x": 64000,"y": 0,"z": 21000,"l": 1200,"w": 1000,"h": 1400,"orientation":2},
            {"location": "PAL1-01-002-01-03","x": 64000,"y": 0,"z": 22000,"l": 1200,"w": 1000,"h": 1400,"orientation":2},
            {"location": "PAL1-01-002-03-01","x": 64000,"y": 1400,"z": 20000,"l": 1200,"w": 1000,"h": 1400,"orientation":2},
            {"location": "PAL1-01-002-03-02","x": 64000,"y": 1400,"z": 21000,"l": 1200,"w": 1000,"h": 1400,"orientation":2},
            {"location": "PAL1-01-002-03-03","x": 64000,"y": 1400,"z": 22000,"l": 1200,"w": 1000,"h": 1400,"orientation":2}];
xmin = getMin(locations, 'x');
ymin = getMin(locations, 'y');
zmin = getMin(locations, 'z');
xmax = getMax(locations, 'x');
ymax = getMax(locations, 'y');
zmax = getMax(locations, 'z');
lmax = getMax(locations, 'l');
wmax = getMax(locations, 'w');
hmax = getMax(locations, 'h');
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
    controls.movementSpeed = 30;
    controls.lookSpeed = 0.1;
    controls.activeLook = false;

    renderer.domElement.addEventListener("mousedown", function(){
        controls.activeLook = true;
    });
    renderer.domElement.addEventListener("mouseup", function(){
        controls.activeLook = false;
    });

    const texture = new THREE.TextureLoader().load( "/img/concrete_texture3_2.jpg" );
    // assuming you want the texture to repeat in both directions:
    texture.wrapS = THREE.RepeatWrapping; 
    texture.wrapT = THREE.RepeatWrapping;
    
    //   which is probably why your example wasn't working
    texture.repeat.set( 300, 200 );
    const planegeo = new THREE.PlaneGeometry( 1000, 1000, 32 );
    const planemat = new THREE.MeshBasicMaterial( {map : texture, side: THREE.DoubleSide} );
    planegeo.rotateX( - Math.PI / 2 );
    const plane = new THREE.Mesh( planegeo, planemat );
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add( plane );

    addpalletarea();
    camera.position.z = 100;
    camera.position.y = 14;
}

function addpalletarea(){
    for(var i=0;i<locations.length; i++){
        var material = new THREE.MeshBasicMaterial({transparent: true,
            opacity: 0.05,
            wireframe: false});
        if(locations[i].orientation == 1){
            var geometry = new THREE.BoxBufferGeometry(locations[i].w/scale, locations[i].h/scale, locations[i].l/scale);
            var mesh = new THREE.Mesh( geometry, material );
            mesh.position.x = ((locations[i].x-xmin)/scale-wmax/scale/2);
            mesh.position.y = ((locations[i].y-ymin)/scale+locations[i].h/scale/2);
            mesh.position.z = -((locations[i].z-zmin)/scale+locations[i].l/scale/2);
            
        }
        else if(locations[i].orientation == 2){
            var geometry = new THREE.BoxBufferGeometry(locations[i].l/scale, locations[i].h/scale, locations[i].w/scale);
            var mesh = new THREE.Mesh( geometry, material );
            mesh.position.x = ((locations[i].x-xmin)/scale+lmax/scale/2);
            mesh.position.y = ((locations[i].y-ymin)/scale+locations[i].h/scale/2);
            mesh.position.z = -((locations[i].z-zmin)/scale+locations[i].w/scale/2);
        }
        else if(locations[i].orientation == 3){
            var geometry = new THREE.BoxBufferGeometry(locations[i].w/scale, locations[i].h/scale, locations[i].l/scale);
            var mesh = new THREE.Mesh( geometry, material );
            mesh.position.x = ((locations[i].x-xmin)/scale-wmax/scale/2);
            mesh.position.y = ((locations[i].y-ymin)/scale+locations[i].h/scale/2);
            mesh.position.z = -((locations[i].z-zmin)/scale-locations[i].l/scale/2);
        }
        else if(locations[i].orientation == 4){
            var geometry = new THREE.BoxBufferGeometry(locations[i].l/scale, locations[i].h/scale, locations[i].w/scale);
            var mesh = new THREE.Mesh( geometry, material );
            mesh.position.x = ((locations[i].x-xmin)/scale-lmax/scale/2);
            mesh.position.y = ((locations[i].y-ymin)/scale+locations[i].h/scale/2);
            mesh.position.z = -((locations[i].z-zmin)/scale+locations[i].w/scale/2);
        }
        scene.add( mesh );
        const edgesGeometry = new THREE.EdgesGeometry( geometry );
        const wireframe = new THREE.LineSegments( edgesGeometry, 
                                                new THREE.LineBasicMaterial( { color: 0x333333 } ) ); 
		mesh.add( wireframe );
    }

    const loader = new THREE.FontLoader();
    loader.load( '/fonts/helvetiker_regular.typeface.json', function ( font ) {
        var color = 0x006699;
        var matDark = new THREE.LineBasicMaterial( {
            color: color,
            side: THREE.DoubleSide
        } );
        var message = "01";
        var shapes = font.generateShapes( message, 3 );
		var geotext = new THREE.ShapeBufferGeometry( shapes );
        var text = new THREE.Mesh( geotext, matDark );
        text.position.z = 0+5;
        text.position.x = 0+18;
        text.position.y = 0.5;
        text.rotateX( - Math.PI / 2 );
        scene.add( text );
    });
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