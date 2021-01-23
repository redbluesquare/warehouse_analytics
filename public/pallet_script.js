import  *  as THREE from '/build/three.module.js';
import  { FirstPersonControls }  from '/jsm/controls/FirstPersonControls.js';

var xmin, ymin, zmin, xmax, ymax, zmax, x_range, y_range, z_range;
var controls, clock, scene, camera, renderer, gravity = 9, ground = 14, forcey = 0;
//Scale down the values by 100
var scale = 100;
var aisles = [{"x":60000, "y":0, "z":20000, "l":1200, "w":1000*50, "h":1400*7},
                {"x":64000, "y":0, "z":20000, "l":1200, "w":1000*50, "h":1400*7},
                {"x":68000, "y":0, "z":20000, "l":1200, "w":1000*50, "h":1400*7}];
var locations = [
    {"location": "PAL1-01-001-01-01","x": 60000,"y": 0,"z": 20000,"l": 1200,"w": 1000,"h": 1400},
    {"location": "PAL1-01-001-01-02","x": 60000,"y": 0,"z": 21000,"l": 1200,"w": 1000,"h": 1400},
    {"location": "PAL1-01-001-01-03","x": 60000,"y": 0,"z": 22000,"l": 1200,"w": 1000,"h": 1400},
    {"location": "PAL1-01-001-03-01","x": 60000,"y": 1400,"z": 20000,"l": 1200,"w": 1000,"h": 1400},
    {"location": "PAL1-01-001-03-02","x": 60000,"y": 1400,"z": 21000,"l": 1200,"w": 1000,"h": 1400},
    {"location": "PAL1-01-001-03-03","x": 60000,"y": 1400,"z": 22000,"l": 1200,"w": 1000,"h": 1400},
    {
      "location": "PAL1-01-001-05-01",
      "x": 60000,
      "y": 2800,
      "z": 20000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-001-05-02",
      "x": 60000,
      "y": 2800,
      "z": 21000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-001-05-03",
      "x": 60000,
      "y": 2800,
      "z": 22000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-001-07-01",
      "x": 60000,
      "y": 4200,
      "z": 20000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-001-07-02",
      "x": 60000,
      "y": 4200,
      "z": 21000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-001-07-03",
      "x": 60000,
      "y": 4200,
      "z": 22000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-001-09-01",
      "x": 60000,
      "y": 5600,
      "z": 20000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-001-09-02",
      "x": 60000,
      "y": 5600,
      "z": 21000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-001-09-03",
      "x": 60000,
      "y": 5600,
      "z": 22000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-002-01-01",
      "x": 64000,
      "y": 0,
      "z": 20000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-002-01-02",
      "x": 64000,
      "y": 0,
      "z": 21000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-002-01-03",
      "x": 64000,
      "y": 0,
      "z": 22000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-002-03-01",
      "x": 64000,
      "y": 1400,
      "z": 20000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-002-03-02",
      "x": 64000,
      "y": 1400,
      "z": 21000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-002-03-03",
      "x": 64000,
      "y": 1400,
      "z": 22000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-002-05-01",
      "x": 64000,
      "y": 2800,
      "z": 20000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-002-05-02",
      "x": 64000,
      "y": 2800,
      "z": 21000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-002-05-03",
      "x": 64000,
      "y": 2800,
      "z": 22000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-002-07-01",
      "x": 64000,
      "y": 4200,
      "z": 20000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-002-07-02",
      "x": 64000,
      "y": 4200,
      "z": 21000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-002-07-03",
      "x": 64000,
      "y": 4200,
      "z": 22000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-002-09-01",
      "x": 64000,
      "y": 5600,
      "z": 20000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-002-09-02",
      "x": 64000,
      "y": 5600,
      "z": 21000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-002-09-03",
      "x": 64000,
      "y": 5600,
      "z": 22000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-003-01-01",
      "x": 60000,
      "y": 0,
      "z": 23000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-003-01-02",
      "x": 60000,
      "y": 0,
      "z": 24000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-003-01-03",
      "x": 60000,
      "y": 0,
      "z": 25000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-003-03-01",
      "x": 60000,
      "y": 1400,
      "z": 23000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-003-03-02",
      "x": 60000,
      "y": 1400,
      "z": 24000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-003-03-03",
      "x": 60000,
      "y": 1400,
      "z": 25000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-003-05-01",
      "x": 60000,
      "y": 2800,
      "z": 23000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-003-05-02",
      "x": 60000,
      "y": 2800,
      "z": 24000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-003-05-03",
      "x": 60000,
      "y": 2800,
      "z": 25000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-003-07-01",
      "x": 60000,
      "y": 4200,
      "z": 23000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-003-07-02",
      "x": 60000,
      "y": 4200,
      "z": 24000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-003-07-03",
      "x": 60000,
      "y": 4200,
      "z": 25000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-003-09-01",
      "x": 60000,
      "y": 5600,
      "z": 23000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-003-09-02",
      "x": 60000,
      "y": 5600,
      "z": 24000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-003-09-03",
      "x": 60000,
      "y": 5600,
      "z": 25000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-004-01-01",
      "x": 64000,
      "y": 0,
      "z": 23000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-004-01-02",
      "x": 64000,
      "y": 0,
      "z": 24000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-004-01-03",
      "x": 64000,
      "y": 0,
      "z": 25000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-004-03-01",
      "x": 64000,
      "y": 1400,
      "z": 23000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-004-03-02",
      "x": 64000,
      "y": 1400,
      "z": 24000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-004-03-03",
      "x": 64000,
      "y": 1400,
      "z": 25000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-004-05-01",
      "x": 64000,
      "y": 2800,
      "z": 23000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-004-05-02",
      "x": 64000,
      "y": 2800,
      "z": 24000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-004-05-03",
      "x": 64000,
      "y": 2800,
      "z": 25000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-004-07-01",
      "x": 64000,
      "y": 4200,
      "z": 23000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-004-07-02",
      "x": 64000,
      "y": 4200,
      "z": 24000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-004-07-03",
      "x": 64000,
      "y": 4200,
      "z": 25000,
      "l": 1200,
      "w": 1000,
      "h": 1400
    },
    {
      "location": "PAL1-01-004-09-01","x": 64000,"y": 5600,"z": 23000,"l": 1200,"w": 1000,"h": 1400
    },
    {
      "location": "PAL1-01-004-09-02","x": 64000,"y": 5600,"z": 24000,"l": 1200,"w": 1000,"h": 1400
    },
    {
      "location": "PAL1-01-004-09-03","x": 64000,"y": 5600,"z": 25000,"l": 1200,"w": 1000,"h": 1400
    }
   ];
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
    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 2000 );
    clock = new THREE.Clock();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xffffff, 1 );
    document.body.appendChild( renderer.domElement );

    controls = new FirstPersonControls(camera, renderer.domElement);
    controls.movementSpeed = 50;
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
    const planegeo = new THREE.PlaneGeometry( 10000, 10000, 32 );
    const planemat = new THREE.MeshBasicMaterial( {map : texture, side: THREE.DoubleSide} );
    planegeo.rotateX( - Math.PI / 2 );
    const plane = new THREE.Mesh( planegeo, planemat );
    plane.position.y = 0;
    plane.position.z = -4800;
    plane.position.x = 4800;
    scene.add( plane );

    addpalletarea();
    camera.position.z = 100;
    camera.position.y = 16;
}

function addpalletarea(){
    for(var i=0;i<locations.length; i++){
        var geometry = new THREE.BoxBufferGeometry(locations[i].l/scale, locations[i].h/scale, locations[i].w/scale);
        var material = new THREE.MeshBasicMaterial({transparent: true,
                                                    opacity: 0.05,
                                                    wireframe: false});
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = ((locations[i].x-xmin)/scale);
        mesh.position.y = ((locations[i].y-ymin)/scale);
        mesh.position.z = -((locations[i].z-zmin)/scale);
        scene.add( mesh );
        const edgesGeometry = new THREE.EdgesGeometry( geometry );
        const wireframe = new THREE.LineSegments( edgesGeometry, 
                                                new THREE.LineBasicMaterial( { color: 0x333333 } ) ); 
		mesh.add( wireframe );
    }
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
var url = 'http://graph.facebook.com/517267866/?fields=picture';

http.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var fbResponse = JSON.parse(body);
        console.log("Got a response: ", fbResponse.picture);
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});