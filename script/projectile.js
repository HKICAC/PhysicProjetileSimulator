var scene, camera, renderer, base, sphere, ground, ball;

function init() {
    // Create a scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcce0ff);
    scene.fog = new THREE.Fog(0xcce0ff, 900, 1000);

    // Create a camera
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, -200);

    // Creates the renderer with size 1280x720
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Puts the "canvas" into our HTML page.
    document.body.appendChild(renderer.domElement);
    create();
}

function create() {


    // Create Base
    const baseTexture = new THREE.TextureLoader().load('./image/wood.jpg')
    baseTexture.anisotropy = 2;
    baseTexture.wrapS = baseTexture.wrapT = THREE.MirroredRepeatWrapping;
    baseTexture.repeat.set(2, 2);
    const baseMaterial = new THREE.MeshBasicMaterial( { map: baseTexture } );
    base = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1), // width, height, depth
        baseMaterial
    );
    base.position.set(450,-29,0);
    base.scale.set(10,70,0);
    scene.add(base);

    // Create Sphere
    sphere = new THREE.Mesh(
        new THREE.SphereGeometry(2, 10, 10), // width, height, depth
        new THREE.MeshBasicMaterial({color:0xff4444})
    );
    sphere.position.set(450,11.5,0);
    sphere.scale.set(3,3,0);
    scene.add(sphere);

    /*const groundTexture = new THREE.TextureLoader().load( './image/grasslight-big.jpg' );
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 1000, 1000);
    groundTexture.anisotropy = 1000;

    const groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );*/

    ground = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 20000, 20000 ),
        new THREE.MeshBasicMaterial({color:0x228B22})
    );
    ground.position.y = -300;
    ground.rotation.x = - Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Point the camera to look at 0,0,0
    camera.lookAt(new THREE.Vector3(0,0,0));

    // load scene
    renderer.render(scene, camera);
}



//create an velocity component
function Velocity(x0,y0,vx,vy){
    this.x0 = x0;
    this.y0 = y0;
    this.vx = vx;
    this.vy = vy;
}

function maxHeight(){
    var v0 = parseFloat(document.getElementById("v0").value);
    var y0 = parseFloat(document.getElementById("y0").value); //need a default value if y0 no input
    console.log(y0);
    var theta = document.getElementById("theta").value * Math.PI/180;
    var vy = Math.sin(theta) * v0; //calculate vy
        //console.log("vy: "+vy);
    var vx = Math.cos(theta).toFixed(3) * v0; //calculate vx
    console.log("vfx"+vx);
    var t = vy / 9.8;
    var tf =Number.parseFloat((-vy-Math.sqrt(vy*vy+2*9.8*y0))/-9.8).toPrecision(4);
    console.log("tf:"+tf);
    var xf = (vx*tf).toFixed(2);
    var ym = Number.parseFloat(y0 + vy * t + 1 / 2 * 9.8 * t * t).toPrecision(4);
    document.getElementById("ym").value = ym;
    document.getElementById("xf").value = xf;
    document.getElementById("tf").value = tf;
    vy/=2;
    vx/=2;
    if(vy>100){
        vy/=5;
        vx/=5;
    }
    ball = new Velocity(v0,y0,vx,vy); // put values in ball object
}

function display() {
    // Animate
    const groundHeight = -58;
    if (sphere.position.y > groundHeight) { // If above ground
        requestAnimationFrame(display); // Tells the browser to smoothly render at 60Hz
        //sphere.rotation.x += 0.01;
        ball.vy -= 9.8/20;
        //console.log("y: "+ball.vy);
        //console.log("x: "+ball.vx);
        sphere.rotation.z += 0.02;
        sphere.position.x -= ball.vx;
        sphere.position.y += ball.vy; //+x = to the right
        // Draw the scene from the perspective of the camera.
        renderer.render(scene, camera);
    } else {
        sphere.position.y=groundHeight;
        cancelAnimationFrame(display);
        create();
    }
}
// When the page has loaded, run init();
window.onload = init;

