
import * as dat from 'dat.gui'
import * as THREE from 'three'

import treeModels from './treeModels'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { Water } from 'three/examples/jsm/objects/Water2.js';

import firefliesVertexShader from '../shaders/fireflies/vertex.glsl'
import firefliesFragmentShader from '../shaders/fireflies/fragment.glsl'
import energyBallVertexShader from '../shaders/energyBall/vertex.glsl'
import energyBallFragmentShader from '../shaders/energyBall/fragment.glsl'

/**
 * Three.js scene
 */
// Debug
// const gui = new dat.GUI({
//     width: 400
// })
export function loadBackground(){
    window.addEventListener('load', function(e){

        // Canvas
    const canvas = document.querySelector('canvas.webgl')
    
    // Scene
    const scene = new THREE.Scene()
    
    /**
     * Loaders
     */
    // Texture loader
    const textureLoader = new THREE.TextureLoader()
    
    // Draco loader
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('draco/')
    
    // GLTF loader
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)
    
    // Fog
    
    const near = 5.5;
    const far = 6.9;
    const color = 0x162e54;
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color(0x0a0c1f);
    
    /**
     *  Fireflies
     */
    
    //Geometry
    
    const firefliesGeometry = new THREE.BufferGeometry()
    const firefliesCount = 80
    const positionArray = new Float32Array(firefliesCount * 3)
    const scaleArray = new Float32Array(firefliesCount)
    
    for(let i = 0; i < firefliesCount ; i++)
    {
        positionArray[i * 3 + 0] = (Math.random() * 2.25) * 3
        positionArray[i * 3 + 1] = Math.random() * -1
        positionArray[i * 3 + 2] = (Math.random() - 0.5) * 14
    
        scaleArray[i] = Math.random()
    }
    
    firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
    firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))
    
    // Material
    
    const firefliesMaterial = new THREE.ShaderMaterial({
        uniforms:
        {
            uColor1: { value: '#ed7af5'},
            uColor1: { value: '#3de9fc'},
            uTime: { value: 0},
            uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            uSize: { value: 100 }
        },
        vertexShader: firefliesVertexShader,
        fragmentShader: firefliesFragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    })
    
    // points
    const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial)
    
    scene.add(fireflies)
    
    /**
     *  Energy Ball
     */
    
    // geometry
    
    const energyBallGeo= new THREE.SphereBufferGeometry(1.15, 30, 30)
    
    // material
    
    const energyBallMaterial = new THREE.ShaderMaterial(
        {
            uniforms:
            {
                uTime: { value: 0 },
                uColorStart: { value: new THREE.Color(0x4300FF)},
                uColorEnd: { value: new THREE.Color(0x6434eb)},
            },
            vertexShader: energyBallVertexShader,
            fragmentShader: energyBallFragmentShader
        }
    )
    
    // mesh
    
    const energyBall = new THREE.Mesh(energyBallGeo, energyBallMaterial)
    // energyBall.scale.set(0.7, 0.7, 0.7)
    
    energyBall.position.y = 0.25
    scene.add(energyBall)
    
    /**
     * Water 
     */
    
    const params = {
        color: '#a8f8ff',
        scale: 4,
        flowX: 0.025,
        flowY: 0.025
    };
    
    // geometry
    const waterGeometry = new THREE.PlaneGeometry( 20, 20 );
    
    let water = new Water( waterGeometry, {
        color: params.color,
        scale: params.scale,
        flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
        textureWidth: 2048,
        textureHeight: 2048
    } );
    
    water.position.y = -1.5;
    water.rotation.x = Math.PI * - 0.5;
    scene.add( water ); 

    console.log(water)
    
    /**
     *  Models
     */
    let arcaneSphere = new THREE.Object3D();

    gltfLoader.load(
        'models/arcaneSphere.glb', init
    )
    
    const particleTreeOne = new treeModels(
        {
            name: 'particleTreeOne',
            file: './models/particleTree1.glb',
            color1: 'red',
            color2: 'yellow',
            scene: scene,
            placeOnLoad: true
        }
    )
    
    
    const particleTreeTwo = new treeModels(
        {
            name: 'particleTreeTwo',
            file: './models/particleTree2.glb',
            color1: 'red',
            color2: 'yellow',
            scene: scene,
            placeOnLoad: true
        }
    )
    
    const particleTreeThree = new treeModels(
        {
            name: 'particleTreeThree',
            file: './models/particleTree3.glb',
            color1: 'red',
            color2: 'yellow',
            scene: scene,
            placeOnLoad: true
        }
    )
    
    const particleTreeFour = new treeModels(
        {
            name: 'particleTreeFour',
            file: './models/particleTree4.glb',
            color1: 'red',
            color2: 'yellow',
            scene: scene,
            placeOnLoad: true
        }
    )
    
    const particleTreeFive = new treeModels(
        {
            name: 'particleTreeFive',
            file: './models/particleTree5.glb',
            color1: 'orange',
            color2: 'yellow',
            scene: scene,
            placeOnLoad: true
        }
    )
    
    const particleTreeSix = new treeModels(
        {
            name: 'particleTreeSix',
            file: './models/particleTree6.glb',
            color1: 'orange',
            color2: 'yellow',
            scene: scene,
            placeOnLoad: true
        }
    )
    
    const particleTreeSeven = new treeModels(
        {
            name: 'particleTreeSeven',
            file: './models/particleTree7.glb',
            color1: 'pink',
            color2: 'orange',
            scene: scene,
            placeOnLoad: true
        }
    )
    
    const particleTreeEight = new treeModels(
        {
            name: 'particleTreeEight',
            file: './models/particleTree8.glb',
            color1: 'red',
            color2: 'yellow',
            scene: scene,
            placeOnLoad: true
        }
    )
    
    
    
    
    
    /**
     * Sizes
     */
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    
    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    
        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
    
        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
        // Update fireflies
    
        firefliesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
    
    })
    
    /**
     * Lights
     */
    // Ambient light
    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );
    
    const directionalLight = new THREE.DirectionalLight(0x6434eb, 2)
    directionalLight.position.set(2, 2, 2)
    scene.add(directionalLight)
    
    const pointLight = new THREE.PointLight( 0x6434eb, 10, 50 );
    scene.add(pointLight)
    
    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 50)
    camera.position.x = 4.425
    camera.position.y = -1.433
    camera.position.z = -5
    scene.add(camera)
    
    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    
    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    })
    
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    /**
     * Animate
     */
    const clock = new THREE.Clock()
    
    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()
    
        // update arcane sphere
    
        arcaneSphere.rotation.x = elapsedTime * 0.05;
        arcaneSphere.rotation.y = elapsedTime * 0.05;
    
        // update energy ball
    
        energyBall.rotation.x = elapsedTime * 0.5;
        energyBall.rotation.y = elapsedTime * 0.25;
        energyBallMaterial.uniforms.uTime.value = elapsedTime
    
        // update fireflies
    
        firefliesMaterial.uniforms.uTime.value = elapsedTime
    
        if (particleTreeOne.isActive)
        {
        particleTreeOne.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
        }
    
        if (particleTreeTwo.isActive)
        {
        particleTreeTwo.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
        }
    
        if (particleTreeThree.isActive)
        {
        particleTreeThree.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
        }
    
        if (particleTreeFour.isActive)
        {
        particleTreeFour.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
        }
    
        if (particleTreeFive.isActive)
        {
        particleTreeFive.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
        }
    
        if (particleTreeSix.isActive)
        {
        particleTreeSix.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
        }
    
        if (particleTreeSeven.isActive)
        {
        particleTreeSeven.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
        }
    
        if (particleTreeEight.isActive)
        {
        particleTreeEight.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
        }
    
        // Update controls
        controls.update()
    
        // Render
        renderer.render(scene, camera)
    
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }
    
    tick()
    function init(gltf){
        arcaneSphere.add( gltf.scene );
        arcaneSphere.position.y = 0.25
        scene.add( arcaneSphere );
        scene.position.y = 0.5
    }

})
}







