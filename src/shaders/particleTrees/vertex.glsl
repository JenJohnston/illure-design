attribute vec3 aRandom;

uniform float uTime;
uniform float uScale;

varying vec3 vPosition;

void main()
{
    float time = uTime * 4.0;
    
    vec3 pos = position;
    pos.x += sin(time * aRandom.x) * 0.01;
    pos.y += cos(time * aRandom.y) * 0.01;
    pos.z += cos(time * aRandom.z) * 0.01;

    
    vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = 4.0 / -mvPosition.z;

    vPosition = position;
    
}