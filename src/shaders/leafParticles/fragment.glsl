uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec3 vPosition;
varying vec3 vColor;
varying vec2 vUv;

void main()
{
    vec3 color = vec3(1.0, 1.0, 1.0);

    vec3 color1 = vec3(1.0, 1.0, 0.0);
    vec3 color2 = vec3(vUv, 1.0);

    float depth = vPosition.z * 0.1 + 0.25;

    float distanceToCenter = distance(gl_PointCoord, vec2(0.485));
    float strength = 0.0065 / distanceToCenter - 0.05 * 2.0;

    color = mix(uColor1, uColor2, depth);

    gl_FragColor = vec4(color, strength);
}