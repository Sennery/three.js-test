precision mediump float;

varying vec2 vUv;
varying float wave;

uniform sampler2D uTexture;
uniform float uTime;
uniform float uProg;
uniform float uIndex;
  
void main() {
  vec2 uv = vUv;
  vec2 dUv = vec2(uv.x, uv.y);
  vec3 texture;

  float w = wave;
  float r = texture2D(uTexture, dUv + vec2(0., 0.) + uProg * w * 0.05).r;
  float g = texture2D(uTexture, dUv + vec2(0., 0.) + uProg * w * 0.0).g;
  float b = texture2D(uTexture, dUv + vec2(0., 0.) + uProg * w * -0.02).b;
  texture = vec3(r, g, b);    
  
  
  gl_FragColor = vec4(texture, 1.);
}