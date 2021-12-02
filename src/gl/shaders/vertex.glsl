precision mediump float;
varying vec2 vUv;
varying float wave;
uniform float uTime;
uniform float uMouseX;
uniform float uMouseY;

#pragma glslify: noise = require(glsl-noise/simplex/3d) 

void main() {
  vec3 pos = position;

        
  pos.z += noise(vec3(pos.x * uMouseX + uTime, pos.y * uMouseY + uTime, 0. )) / 5.;
  wave = pos.z;
  pos.z *= 50.;    
  

  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}