import * as THREE from 'three';
import waves from './waves';

let scene,
    camera,
    renderer,
    clock,
    wave;

function createScene() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        45,
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

function update() {
    const elapsed = clock.getElapsedTime();
    wave.updateTime(elapsed);
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
    
    tick();
}


