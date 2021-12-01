import * as THREE from 'three';
import glsl from 'glslify';
import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

const loader = new THREE.TextureLoader();

const planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 50, 50);
const planeMaterial = new THREE.ShaderMaterial({
    vertexShader: glsl(vertex),
    fragmentShader: glsl(fragment),
});

function calculateUnitSize({distance, cameraFov, cameraAspect}) {
    const vFov = cameraFov * Math.PI / 180;
    const height = 2 * Math.tan(vFov / 2) * distance;
    const width = height * cameraAspect;

    return { width, height };
}

function init({camera}) {
    const waves = new THREE.Object3D();

    const camUnit = calculateUnitSize({distance: camera.position.z - waves.position.z, cameraFov: camera.fov, cameraAspect: camera.aspect});

    waves.scale.x = camUnit.width * 295/window.innerWidth;
    waves.scale.y = camUnit.height * 448/window.innerHeight;

    waves.position.x = -(camUnit.width / 2) + (waves.scale.x / 2);
    waves.position.x += ((50 + 0) / window.innerWidth) * camUnit.width;

    console.log(camUnit)

    const geometry = planeGeometry;
    const material = planeMaterial.clone();

    material.uniforms = {
        uTexture: { value: 0 },
        uTime: { value: 0 },
        uProg: { value: 1 },
    }

    const img = document.getElementById('pic');
    loader.load(img.src, (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
      
        material.uniforms.uTexture.value = texture;
    })

    const mesh = new THREE.Mesh(geometry, material);
    waves.add(mesh);

    let backwards = 0.1;

    waves.updateTime = (time) => {
        material.uniforms.uTime.value = time;

        waves.position.x += backwards;
        if (waves.position.x > 40 || waves.position.x < -40) {
            backwards *= -1;
        }
        
    };

    return waves;
}

export default init;
