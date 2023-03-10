import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.148.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.148.0/examples/jsm/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'https://unpkg.com/three@0.148.0/examples/jsm/renderers/CSS2DRenderer.js';
import { b1, b2, b3 }  from './dotHtml.js';
import { enigmatext, fabriqtext, algoreustext }  from './addText.js';

let b_model;
let stars; 

const renderer = new THREE.WebGLRenderer({antialias:true, alpha: true})
export { renderer };
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

//our scene 
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010); //101010
 scene.fog = new THREE.FogExp2( 0x000000, 0.0003 );
//camera that look at our object
const camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(5, 5, 6);
//camera.rotation.set(0, 0, 0);

// var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
// hemiLight.position.set( 10, 20, 10 );
// scene.add( hemiLight );

// var dirLight = new THREE.DirectionalLight( 0xffffff );
// dirLight.position.set( - 3, 10, - 10 );
// scene.add( dirLight );

//ambient light
// const pointLight = new THREE.AmbientLight(0xffffff, 0.1);
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight);

//directional light 
// const directionalLight = new THREE.DirectionalLight(0xA9A9A9, 3)
// scene.add(directionalLight)

//controls for orbiting around the object
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', ()=> {renderer.render(scene, camera)});
controls.target.set(0, 0, 0);
controls.update();

//css2
const rendererCss2 = new CSS2DRenderer();
rendererCss2.setSize(window.innerWidth, window.innerHeight)
rendererCss2.domElement.style.position = 'absolute';
rendererCss2.domElement.style.top = '0px';
rendererCss2.domElement.classList.add('html-container');
document.body.appendChild(rendererCss2.domElement);

//css2 element
//const h5 = document.createElement('img');
//h5.textContent = "Enigma";
// h5.classList.add('svgtest');
// h5.src = './model/dot.svg';
// const cPointLabel = new CSS2DObject(h5);
// scene.add(cPointLabel);
// cPointLabel.position.set(-6, 0.8, 4);

//css2 div
const divDot1 = document.createElement('div');
divDot1.classList.add("dot1");
divDot1.insertAdjacentHTML('beforeend', b1());
const divDotWrap1 = new CSS2DObject(divDot1);
scene.add(divDotWrap1);
divDotWrap1.position.set(6, 0, 0) 

const divDot2 = document.createElement('div');
divDot2.classList.add("dot2");
divDot2.insertAdjacentHTML('beforeend', b2());
const divDotWrap2 = new CSS2DObject(divDot2);
scene.add(divDotWrap2);
divDotWrap2.position.set(1, 0, 5.5); 

const divDot3 = document.createElement('div');
divDot3.classList.add("dot3");
divDot3.insertAdjacentHTML('beforeend', b3());
const divDotWrap3 = new CSS2DObject(divDot3);
scene.add(divDotWrap3);
divDotWrap3.position.set(-7, 0, 2); 

//title
const main_title = document.createElement('h1');
main_title.classList.add("main_title");
main_title.textContent = "Turium.ai";
const main_title_wrap = new CSS2DObject(main_title);
scene.add(main_title_wrap);
main_title_wrap.position.set(5, 6, 0); 

//css2 wrap
const divcontainerObj = new THREE.Object3D();
divcontainerObj.add(divDotWrap1);
divcontainerObj.add(divDotWrap2);
divcontainerObj.add(divDotWrap3);
scene.add(divcontainerObj);

const maintitleobj = new THREE.Object3D();
maintitleobj.add(main_title_wrap);
scene.add(maintitleobj );
main_title_wrap.position.set(-0.1, 6, 0); 

let d1lt = new gsap.timeline();
let d2lt = new gsap.timeline();
let d3lt = new gsap.timeline();

d1lt.from(divDotWrap1.position, {x: 0, y: 0, z: 0, duration:2});
d2lt.from(divDotWrap2.position, {x: 0, y: 0, z: 0, duration:2});
d3lt.from(divDotWrap3.position, {x: 0, y: 0, z: 0, duration:2});

//load the GL object
const loader = new GLTFLoader();
let tl = new gsap.timeline();
loader.load('https://cdn.jsdelivr.net/gh/acronym1986/3dtest4_deploy/dist/model/briainwebflow.gltf', function(gltf){
    b_model = gltf.scene;
    b_model.scale.set(0.78, 0.79, 0.78);
    b_model.position.set(0.8, 0, 0);
    b_model.children[0].children[0].material.emissive.setHex( 0xffffff );
    b_model.children[0].children[1].material.emissive.setHex( 0xffffff );
    b_model.children[0].children[2].material.emissive.setHex( 0x000000 );
    b_model.children[0].children[3].material.emissive.setHex( 0x000000 );
    scene.add(b_model);  
    tl.from(b_model.scale, {x: 0, y: 0, z: 0, duration:1});
    //tl.from(b_model.position, 1, {y: -20, ease: Expo.easeOut}, '-=3');
}, undefined, function(error) {
    console.error(error);
})
 
const starloader = new THREE.TextureLoader()
const starTexture = starloader.load('https://upload.wikimedia.org/wikipedia/commons/5/58/White_Circle.svg')
starForge()
function starForge() {
    var starQty = 45000;
    var geometry = new THREE.BufferGeometry(0.5, 32, 32);
    var ps = [];
    var starStuff = new THREE.PointsMaterial({
        size: 1.0, 
        transparent: false, 
        opacity: 1,
        map: starTexture,
    });

    for (var i = 0; i < starQty; i++) {		
        var starVertex = new THREE.Vector3(
         Math.random() * 2000 - 1000,
         Math.random() * 2000 - 1000,
         Math.random() * 2000 - 1000,
        );
        ps.push(starVertex.x, starVertex.y, starVertex.z)
    }
    const positionAttribute = new THREE.Float32BufferAttribute(ps, 3)

  
  geometry.setAttribute('position', positionAttribute);

    stars = new THREE.Points(geometry, starStuff);
    scene.add(stars);
}
let cameraTarget = new THREE.Vector3(0, 0, );

let mouseX = 0;
let mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', onDocumentMouseMove);
function onDocumentMouseMove(event) {

    mouseX = (event.clientX - windowHalfX) / 300;
    mouseY = (event.clientY - windowHalfY) / 300;
}

// Particles
// const particles = new THREE.BufferGeometry();
// const particlesCount = 10000;
// const posArray = new Float32Array(particlesCount * 3);

// for (let i =0; i < particlesCount * 3; i++) {
//     posArray[i] = (Math.random() - 0.5) * (Math.random() * 10000);
// }

// const particalsMaterial = new THREE.PointsMaterial({size: 1})

// particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
// const particlesMesh = new THREE.Points(particles, particalsMaterial);
// scene.add(particlesMesh);

// document.addEventListener('mousemove', animateParticles )
// let mouseX = 0;
// let mouseY = 0;

// function animateParticles(e) {
//     mouseY = e.clientY;
//     mouseX = e.clientX;
// }

window.onresize = function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererCss2.setSize(this.window.innerWidth, this.window.innerHeight);
}
 
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame( animate );
    const elapsedTime = clock.getElapsedTime();
    //particlesMesh.rotation.y = 0.1 * elapsedTime;
    stars.rotation.y= -0.01 * elapsedTime;
    stars.rotation.z= -0.02 * elapsedTime;
    stars.position.x += (mouseX - stars.position.x) * 1.5;
    stars.position.y += (- mouseY - stars.position.y) * 1;

    if (b_model) {
        b_model.rotation.y =  0.1 * elapsedTime;
        b_model.position.y = Math.cos( elapsedTime ) * 0.2;
    }
    // if (mouseX > 0){
    //     particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.00008);
    //     particlesMesh.rotation.y = mouseX * (elapsedTime * 0.00008);
    // }
    if(divcontainerObj){
       divcontainerObj.position.y = Math.cos( elapsedTime ) * -0.3;
    }

    renderer.render( scene, camera );
    rendererCss2.render(scene, camera);
}
 animate();

 const back_btn = document.querySelector('.buttonBg');
 const sidepanel = document.querySelector('.sidepanel');

 const d_input1 = document.getElementById('input1');
 d_input1.addEventListener('click', function(){
    back_btn.classList.add('show_backbtn');
    sidepanel.classList.add('expand_sidepanel');
    moveCam(-10, 4, 3, 2);
    rotateCam(-0.2, -0.3, -0.1, 1);
    loopLabText();
    switchText(this, enigmatext());
})

const d_input2 = document.getElementById('input2');
d_input2.addEventListener('click', function(){
   back_btn.classList.add('show_backbtn');
   sidepanel.classList.add('expand_sidepanel');
    moveCam(-10, -3, 8, 2);
    rotateCam(0.1, 0, 0.1, 1);  
    loopLabText();
    switchText(this, fabriqtext());
})

const d_input3 = document.getElementById('input3');
d_input3.addEventListener('click', function(){
   back_btn.classList.add('show_backbtn');
   sidepanel.classList.add('expand_sidepanel');
   moveCam(2, 0.6, 6, 2);
   rotateCam(-0.01, 1, 0.1, 1); 
   loopLabText();
   switchText(this, algoreustext());
})


back_btn.addEventListener('click',function(){
    this.classList.remove('show_backbtn');
    sidepanel.classList.remove('expand_sidepanel');
    // moveCam(5, 5, 6, 1); //5, 6, 10
    //gsap.from(camera.position, {x:-10, y:-3, z:8, duration:2});
    //gsap.to(camera.position, {x:5, y:5, z:6, duration:1 });
    reset();
    //setTimeout(controls.reset(), 10000)
    loopLabText();
})

function loopLabText(){
    let dot_btns = document.querySelectorAll('.label_text');
    for (let i=0; i < dot_btns.length; i++){
        if(back_btn.classList.contains('show_backbtn')){
            dot_btns[i].classList.add('hide_text');
        }
        
        if(!back_btn.classList.contains('show_backbtn')){
            dot_btns[i].classList.remove('hide_text');
        }
   }
}

function switchText(self, textobj){
    if(self.previousElementSibling.innerHTML === textobj.name) {
        const pophead = document.querySelector('.pop-head');
        const poptext = document.querySelector('.pop-text');
        pophead.innerHTML = textobj.header;
        poptext.innerHTML = textobj.text;
        console.log(textobj.header)
    }
}

function moveCam(x, y, z, dur) {
    gsap.to(camera.position,{x, y, z, duration: dur});
}

function rotateCam(x, y, z, dur) {
    gsap.to(camera.rotation,{x, y, z, duration: dur});
}

//rest when click back
let resetTl = new gsap.timeline();
const iniQ = new THREE.Quaternion().copy(camera.quaternion);

function reset() {
    const quat = new THREE.Quaternion().copy(camera.quaternion)
  
    resetTl = new gsap.timeline()
    resetTl.to(controls.object.up, { duration: 1, ...controls.up0 }, 0)
    resetTl.to(controls.object.position, { duration: 1, ...controls.position0 }, 0)
    resetTl.to(controls.target, { duration: 1, ...controls.target0 }, 0)
    resetTl.to({}, {
      duration: 1,
      onUpdate: function() {
        camera.quaternion.slerpQuaternions(quat, iniQ, this.progress());
      },
    }, 0)
  }





