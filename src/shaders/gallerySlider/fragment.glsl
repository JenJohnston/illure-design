uniform sampler2D uTexture;
uniform float uDistFromCenter;

varying vec2 vUv;

void main() 
{
    vec4 t = texture2D(uTexture, vUv);
    gl_FragColor = t;
    gl_FragColor.a = clamp(uDistFromCenter, 0.2, 1.0);
}