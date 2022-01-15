uniform sampler2D uTexture;

varying vec2 vUv;

void main() 
{
    vec4 t = texture2D(uTexture, vUv);
    gl_FragColor = t;
}