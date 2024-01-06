import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0, 10, 10 );
spotLight.intensity = 100;
scene.add( spotLight );

const spotLight2 = new THREE.SpotLight( 0xffffff );
spotLight2.position.set( 0, 10, 0 );
spotLight2.intensity = 100;
scene.add( spotLight2 );

const spotLight3 = new THREE.SpotLight( 0xffffff );
spotLight3.position.set( 0, 10, -10 );
spotLight3.intensity = 100;
scene.add( spotLight3 );

//var controls = new THREE.OrbitControls( camera, renderer.domElement );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();