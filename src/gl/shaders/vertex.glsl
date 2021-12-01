precision mediump float;
varying vec2 vUv;
varying float wave;
uniform float uTime;
uniform float uProg;

#pragma glslify: noise = require(glsl-noise/simplex/3d) 

void main() {
  vec3 pos = position;

        
  pos.z += noise(vec3(pos.x * 4. + uTime, pos.y + uTime, 0. )) * uProg;
  wave = pos.z;
  pos.z *= 3.;    
  

  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}