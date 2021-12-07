// Webgl Imports
import * as dat from 'dat.gui'
import * as THREE from 'three'
import { Water } from 'three/examples/jsm/objects/Water2.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import '../assets/images/illure-logo.png'

import bloomLeaves from '../webGL/bloomLeaves'
import imageParticleVertexShader from '../shaders/imageParticles/vertex.glsl'
import imageParticleFragmentShader from '../shaders/imageParticles/fragment.glsl'


// React Imports

import ReactDOM from 'react-dom'
import React, { useRef, useState, useMemo } from 'react'

// Components

import NavBar from '../components/NavBar'

window.addEventListener('load', function(e){
    /********** Initial Scene Setup **********/

// Canvas

const canvasProjects = document.querySelector('canvas.projects-webgl')

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


// Debug
const gui = new dat.GUI({
    width: 400 
})

scene.background = new THREE.Color(0x0a0c1f);

//fog

const near = 5.5;
const far = 6.9;
const color = 0x162e54;
scene.fog = new THREE.Fog(color, near, far);

 /**
 *  Tree Models
 */

let treeBloomBaseOne = new THREE.Object3D();
  
 gltfLoader.load(
    'models/treeBloom1-base.glb',
     init
      
 )

 gltfLoader.load(
    'models/treeBloom2-base.glb',
     init
      
 )

const bloomLeavesOne = new bloomLeaves(
    {
        name: 'bloomLeavesOne',
        file: './models/treeBloom1-leaves.glb',
        color1: 'orange',
        color2: 'yellow',
        scene: scene,
        placeOnLoad: true
    }
)

const bloomLeavesTwo = new bloomLeaves(
    {
        name: 'bloomLeavesTwo',
        file: './models/treeBloom2-leaves.glb',
        color1: 'orange',
        color2: 'yellow',
        scene: scene,
        placeOnLoad: true
    }
)

function init(gltf){
    // treeBloomLeavesOne.add( gltf.scene )
    treeBloomBaseOne.add( gltf.scene )
    scene.add( treeBloomBaseOne )
}

/**
* Image Particles
**/

// Geometry

const imageParticlesGeometry = new THREE.PlaneBufferGeometry(1.51 * 1.1, 1 * 1.1, 650, 431)

// Material

const imageParticlesMaterial = new THREE.ShaderMaterial(
    {
        extensions: 
        {
            derivatives: "#extension GL_OES_standard_derivates : enable"
        },
        side: THREE.DoubleSide,
        uniforms: {
            uTime: { type: "f", value: 0 },
            uTexture: { type: "t", value: textureLoader.load('textures/nature-1.jpg') },
            uResolution: { type: "v4", value: new THREE.Vector4() },
            uUvRatel: 
            {
                value: new THREE.Vector2(1, 1)
            }
        },
        // wireframe: true,
        // transparent: true,
        vertexShader: imageParticleVertexShader,
        fragmentShader: imageParticleFragmentShader
    }
)

const imageParticlesMesh = new THREE.Points(imageParticlesGeometry, imageParticlesMaterial)

scene.add(imageParticlesMesh)

imageParticlesMesh.position.y = -.853
imageParticlesMesh.position.z = -3.623
imageParticlesMesh.position.x = 3.407

imageParticlesMesh.rotation.y = -0.735

gui.add(imageParticlesMesh.rotation, 'y', -3, 3, 0.001).name('rotationY')
gui.add(imageParticlesMesh.rotation, 'x', -3, 3, 0.001).name('rotationX')
gui.add(imageParticlesMesh.rotation, 'z', -3, 3, 0.001).name('rotationZ')

gui.add(imageParticlesMesh.position, 'y', -3, 3, 0.001).name('positionY')
gui.add(imageParticlesMesh.position, 'x', -10, 10, 0.001).name('positionX')
gui.add(imageParticlesMesh.position, 'z', -10, 10, 0.001).name('positionZ')

/**
* Water 
**/
    
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

/**
*   Sizes    
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
    
       
    
})

/**
* Lights
**/

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
**/

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 50)
camera.position.x = 4.425
camera.position.y = -1.433
camera.position.z = -5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvasProjects)
controls.enableDamping = true

/**
 * Renderer
 **/
 const renderer = new THREE.WebGLRenderer({
    canvas: canvasProjects,
    antialias: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
* Animate
**/

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // update leaves

    if (bloomLeavesOne.isActive)
        {
            bloomLeavesOne.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
        }

    if (bloomLeavesTwo.isActive)
        {
            bloomLeavesTwo.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
        }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
})

const Projects = () => {
    return (
        <>
           <canvas className="projects-webgl"></canvas>
            {/* <div className="main-content">
                <section className="hero-section">
                        <h1>Projects</h1>
                </section>
                <footer>
                    <NavBar />
                </footer>
            </div> */}
        </>
    )
}


export default Projects