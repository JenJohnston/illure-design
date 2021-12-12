uniform float uTime;
uniform float progress;

uniform sampler2D uTexture;
uniform sampler2D uTexture2;
uniform vec4 uResolution;

varying vec2 vUv;
varying vec3 vPosition;

float PI = 3.141592653589793238;

void main() 
{
    // vec2 newUV = vPosition.xy/vec2(1.51 * 1.1, 1.0 * 1.1) + vec2(0.5);
    vec4 texture = texture2D(uTexture, vUv);
    // vec4 texture2 = texture2D(uTexture2, vUv);

    // vec4 finalTexture = mix(texture, uTexture2, progress);

     
     gl_FragColor = texture;
}
   
