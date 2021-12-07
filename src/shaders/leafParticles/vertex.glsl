attribute vec3 aRandom;

uniform float uTime;
uniform float uScale;

varying vec3 vPosition;
varying vec2 vUv;

void main()
{
    float time = uTime * 4.0;
    
    vec3 pos = position;
    pos.x += sin(time * aRandom.x) * 0.03;
    pos.y += cos(time * aRandom.y) * 0.03;
    pos.z += cos(time * aRandom.z) * 0.03;

    
    vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = 2000.0 / -mvPosition.z;

    vPosition = position;
    vUv = uv;
    
}