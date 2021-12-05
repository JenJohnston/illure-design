import * as THREE from "three"
import { extend } from "@react-three/fiber"

class ColorMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: { 
          time: { value: 1.0 }, 
          color: { value: new THREE.Color(0.2, 0.0, 0.1) } 
        },
        vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
            vUv = uv;
            vNormal = normal;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
        fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec3 vNormal;
        varying vec2 vUv;
        void main() {
            gl_FragColor.rgba = vec4(vUv, 0.5, 1.0);
        }`
    })
  }
  get color() {
    return this.uniforms.color.value
  }
  get time() {
    return this.uniforms.time.value
  }
  set time(v) {
    return (this.uniforms.time.value = v)
  }
}

extend({ ColorMaterial })