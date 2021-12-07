varying vec2 vUv;

void main()
{

    

    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.03 / distanceToCenter - 0.04 * 2.7;
    gl_FragColor = vec4(0.7, 1.3, 0.4, strength);
}