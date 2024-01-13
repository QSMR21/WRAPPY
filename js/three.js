import * as THREE from 'THREE';
import { OrbitControls } from './controls/OrbitControls.js';
import { GLTFLoader } from './loader/GLTFLoader.js';


/**
 * Variables
 */

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const clock = new THREE.Clock();

    var canvasId = document.getElementById("canvasId")
    const renderer = new THREE.WebGLRenderer({ canvas: canvasId, antialias: true });

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

    const loader = new GLTFLoader();
    let mixer;
    var model;

    loader.load(
        // resource URL
        '../assets/enveloppe.glb',
        // called when the resource is loaded
        function ( gltf ) {
            model = gltf.scene;
            scene.add( gltf.scene );
    
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

            gltf.scene.rotation.set(1,3.14,0);

            mixer = new THREE.AnimationMixer( gltf.scene );
            const clips = gltf.animations;
            console.log(clips);

            // Update the mixer on each frame
            function update () {    
                mixer.update( deltaSeconds );
            }

            
            // Play a specific animation
            var clip = THREE.AnimationClip.findByName( clips, 'Closed' );
            console.log(clip);
            var action = mixer.clipAction( clip, gltf.scene ).setLoop(THREE.LoopRepeat);
            console.log(action);
            action.play();
            document.addEventListener( 'dblclick', onDocumentMouseDown, false );
                let i = 0;

            function onDocumentMouseDown( event ) {
            
              if ( action !== null ) {
                action.stop();
                console.log(i);
                if (i%3===0){
                    clip = THREE.AnimationClip.findByName( clips, 'Open.001' );
                action = mixer.clipAction( clip, gltf.scene ).setLoop(THREE.LoopOnce);
                action.play();
                i++;
                console.log(i);

                } else if (i%3 === 1){
                    clip = THREE.AnimationClip.findByName( clips, 'Letter out' );
                    action = mixer.clipAction( clip, gltf.scene ).setLoop(THREE.LoopOnce);
                    action.clampWhenFinished = true;
                    action.play();
                    i++;
                } else {
                    clip = THREE.AnimationClip.findByName( clips, 'Closed' );
                   action = mixer.clipAction( clip, gltf.scene ).setLoop(THREE.LoopRepeat);
                   action.play();
                  i++;
                }
                
                
              }
        }},
        // called while loading is progressing
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        }
    );



/**
 * Functions
 */

    export function init() {

        //Scene
            scene.background = new THREE.Color(0xEFF7FF);
            scene.fog = new THREE.FogExp2(0xEFF7FF, 0.1);

        //Renderer
            renderer.setSize(800, window.innerHeight / window.innerWidth * 800);

        //Canvas
            // const canvas = document.querySelector("canvas");
            // const ctx = canvas.getContext("webgl");

        //Camera
            camera.position.set(0, 3, 1);
            camera.lookAt(new THREE.Vector3(0, 3, 0));

        //Controls
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.maxPolarAngle = Math.PI / 2;
            //controls.minAzimuthAngle = -2 * Math.PI / 5;
            //controls.maxAzimuthAngle = 2 * Math.PI / 5;
            controls.minDistance = 2;
            controls.maxDistance = 3;
            controls.enableDamping = true;
            controls.dampingFactor = 0.1;

        //Mesh


        
        //Lights
            const spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(10, 10, 10);
            spotLight.intensity = 100;
            scene.add(spotLight);

            const spotLight2 = new THREE.SpotLight(0xffffff);
            spotLight2.position.set(0, 10, 0);
            spotLight2.intensity = 100;
            scene.add(spotLight2);

            const spotLight3 = new THREE.SpotLight(0xffffff);
            spotLight3.position.set(-10, 10, -10);
            spotLight3.intensity = 100;
            scene.add(spotLight3);
    }

    export function animate() {
        requestAnimationFrame(animate);
        if ( mixer ) mixer.update( clock.getDelta() );
        renderer.render(scene, camera);
    }

    export function setcolor(color) {
        color = parseInt(color, 16);
        //model.material.color = new THREE.Color(color);
        model.traverse((o) => {
            if (o.isMesh) o.material = new THREE.MeshStandardMaterial({color: color});;
          });
    }