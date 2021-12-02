import * as THREE from 'three';
import waves from './waves';

let scene,
    camera,
    renderer,
    clock,
    wave;

const mousePositon = {
    x: 0,
    y: 0
};

const mousePrevPosition = {
    x: 0,
    y: 0
};

function createScene() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );
    camera.position.z = 50;

    renderer = new THREE.WebGLRenderer({
        alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xF2F2F2, 0);

    clock = new THREE.Clock();

    wave = waves({camera});
    scene.add(wave);
}

function addToDom() {
    const canvas = renderer.domElement;
    document.body.appendChild(canvas);
}

function setMouseEventListener() {
    document.addEventListener('mousemove', (e) => {
        mousePositon.x = e.pageX;
        mousePositon.y = e.pageY;            
    });

    const velocityCoef = 0.01;

    setInterval(() => {
        mousePrevPosition.x += (mousePositon.x - mousePrevPosition.x) * velocityCoef;
        mousePrevPosition.y += (mousePositon.y - mousePrevPosition.y) * velocityCoef;

        console.log(mousePrevPosition.x)
    }, 50);
}

function update() {
    const elapsed = clock.getElapsedTime();
    wave.updateTime(elapsed);
    wave.updateMouse(mousePrevPosition);
}

function render() {
    renderer.render(scene, camera);
}

function tick() {
    requestAnimationFrame(tick);

    update();
    render();
}

export default function init() {
    createScene();
    addToDom();
    setMouseEventListener();
    
    tick();
}


