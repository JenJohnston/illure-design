uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;

void main()
{
    vUv = (uv - vec2(0.5)) * 0.9 + vec2(0.5);

    vec3 pos = position;

    pos.y += sin(uTime * 0.5)*0.2; 
    vUv.y -= sin(uTime * 0.35)*0.008;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0);

}