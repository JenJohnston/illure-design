uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec3 vPosition;
varying vec3 vColor;

void main()
{
    vec3 color = vec3(1.0, 1.0, 1.0);

    vec3 color1 = vec3(1.0, 1.0, 0.0);
    vec3 color2 = vec3(1.0, 0.0, 1.0);

    float depth = vPosition.z * 0.1 + 0.25;

    color = mix(uColor1, uColor2, depth);

    gl_FragColor = vec4(color, 1.0);
}