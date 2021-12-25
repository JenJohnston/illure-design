uniform float uTime;
uniform float progress;

uniform sampler2D uTexture;
uniform sampler2D uTexture2;
uniform sampler2D alphaMap;
uniform vec4 uResolution;

varying vec2 vUv;
varying vec3 vPosition;

float PI = 3.141592653589793238;

void main() 
{
   
    vec4 texture = texture2D(uTexture, vUv);
    
     gl_FragColor = texture;

     if (gl_FragColor.r<0.1 &&gl_FragColor.g<0.1 && gl_FragColor.b<0.1)discard;
}
   
