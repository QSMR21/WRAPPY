import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background= new THREE.Color(0xEFF7FF);
scene.fog = new THREE.FogExp2( 0xEFF7FF, 0.1 );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var canvasId = document.getElementById("canvasId")

const renderer = new THREE.WebGLRenderer({canvas: canvasId});
renderer.setSize( window.innerWidth/2, window.innerHeight /2);
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("webgl");
//document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.maxPolarAngle = Math.PI / 2;
controls.minAzimuthAngle = -2*Math.PI / 5;
controls.maxAzimuthAngle = 2*Math.PI / 5;
controls.minDistance = 2;
controls.maxDistance = 4;

controls.enableDamping = true; 
controls.dampingFactor = 0.1;

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const cube2 = new THREE.Mesh( geometry, material );
cube2.position.x = 1;
cube2.position.z = -4;
scene.add( cube2 );

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 10, 10, 10 );
spotLight.intensity = 100;
scene.add( spotLight );

const spotLight2 = new THREE.SpotLight( 0xffffff );
spotLight2.position.set( 0, 10, 0 );
spotLight2.intensity = 100;
scene.add( spotLight2 );

const spotLight3 = new THREE.SpotLight( 0xffffff );
spotLight3.position.set( -10, 10, -10 );
spotLight3.intensity = 100;
scene.add( spotLight3 );

//camera.position.y = 1;
camera.position.z = 4;
//camera.getWorldDirection({target: (0,0,0)});

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

//
//Partie pour l'input de fichier
//

const fileInput = document.querySelector('#file');
const fileList = document.querySelector('#file-list');

fileInput.addEventListener('change', updateFileList);

function updateFileList() {
  while(fileList.firstChild) {
	fileList.removeChild(fileList.firstChild);
  }

  let curFiles = fileInput.files;

  if(!(curFiles.length === 0))  {
	console.log('test');
	for(let i = 0; i < curFiles.length; i++) {
	  const listItem = document.createElement('li');
	  listItem.textContent = 'File name: ' + curFiles[i].name + '; file size ' + returnFileSize(curFiles[i].size) + '.';
	  fileList.appendChild(listItem);
	}
  }
}

function returnFileSize(number) {
  if(number < 1024) {
	return number + 'bytes';
  } else if(number >= 1024 && number < 1048576) {
	return (number/1024).toFixed(1) + 'KB';
  } else if(number >= 1048576) {
	return (number/1048576).toFixed(1) + 'MB';
  }
}