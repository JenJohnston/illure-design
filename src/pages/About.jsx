// Webgl Imports
import * as dat from 'dat.gui'
import * as THREE from 'three'
import { Water } from 'three/examples/jsm/objects/Water2.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


// React Imports

import ReactDOM from 'react-dom'
import React, { useRef, useState, useMemo } from 'react'

// Components

import NavBar from '../components/NavBar'

// /********** Initial Scene Setup **********/
//  window.addEventListener('load', function(e){
//     const canvas = document.querySelector('canvas.about-webgl')

//     // Scene
    
//     const scene = new THREE.Scene()
    
//     /**
//      * Loaders
//      */
//     // Texture loader
//     const textureLoader = new THREE.TextureLoader()

//     const caveBG = textureLoader.load('textures/cave-1.jpg')
    
//     // Draco loader
//     const dracoLoader = new DRACOLoader()
//     dracoLoader.setDecoderPath('draco/')
    
//     // GLTF loader
//     const gltfLoader = new GLTFLoader()
//     gltfLoader.setDRACOLoader(dracoLoader)
    
    
//     // Debug
//     const gui = new dat.GUI({
//         width: 400 
//     })

//       // Fog
    
//       const near = 5.5;
//       const far = 6.9;
//       const color = 0x162e54;
//       scene.fog = new THREE.Fog(color, near, far);
//       scene.background = new THREE.Color(0x0a0c1f);

//       /**
//     * background image
//     **/
    
//     // Geometry
    
//     const bgImageGeometry = new THREE.PlaneBufferGeometry(15, 10)

//     const bgImageMaterial = new THREE.MeshStandardMaterial( 
//         {
//             map: caveBG,
//             side: THREE.DoubleSide

//         }
//     )

//     const bgImageMesh = new THREE.Mesh(bgImageGeometry, bgImageMaterial)

//     scene.add(bgImageMesh)

//     bgImageMesh.position.x = 2.768
//     bgImageMesh.position.y = 3.158
//     bgImageMesh.position.z = 0.034
    
//     bgImageMesh.rotation.y = -0.877
//     bgImageMesh.rotation.z = 0.034

//     gui.add(bgImageMesh.position, 'x', -10, 10, 0.001).name('positionX')
//     gui.add(bgImageMesh.position, 'y', -10, 10, 0.001).name('positionY')
//     gui.add(bgImageMesh.position, 'z', -10, 10, 0.001).name('positionZ')

//     gui.add(bgImageMesh.rotation, 'x', -10, 10, 0.001).name('rotationX')
//     gui.add(bgImageMesh.rotation, 'y', -10, 10, 0.001).name('rotationY')
//     gui.add(bgImageMesh.rotation, 'z', -10, 10, 0.001).name('rotationZ')

//     /**
//      * Water 
//      */
    
//      const params = {
//         color: '#a8f8ff',
//         scale: 4,
//         flowX: 0.025,
//         flowY: 0.025
//     };
    
//     // geometry
//     const waterGeometry = new THREE.PlaneGeometry( 20, 20 );
    
//     let water = new Water( waterGeometry, {
//         color: params.color,
//         scale: params.scale,
//         flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
//         textureWidth: 2048,
//         textureHeight: 2048
//     } );
    
//     water.position.y = -1.5;
//     water.rotation.x = Math.PI * - 0.5;
//     scene.add( water ); 
    
//     /**
//     *   Sizes    
//     */
    
//     const sizes = {
//         width: window.innerWidth,
//         height: window.innerHeight
//     }
    
//     window.addEventListener('resize', () => 
//     {
    
//             // Update sizes
//             sizes.width = window.innerWidth
//             sizes.height = window.innerHeight
        
//             // Update camera
//             camera.aspect = sizes.width / sizes.height
//             camera.updateProjectionMatrix()
        
//             // Update renderer
//             renderer.setSize(sizes.width, sizes.height)
//             renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        
           
        
//     })
    
//     /**
//     * Lights
//     **/

//      const light = new THREE.AmbientLight( 0x404040 ); // soft white light
//      scene.add( light );
    
//     /**
//     * Camera
//     **/
    
//     // Base camera
//     const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 50)
//     camera.position.x = 4.425
//     camera.position.y = -1.433
//     camera.position.z = -5
//     scene.add(camera)
    
//     // Controls
//     const controls = new OrbitControls(camera, canvas)
//     controls.enableDamping = true
    
//     /**
//      * Renderer
//      **/
//      const renderer = new THREE.WebGLRenderer({
//         canvas: canvas,
//         antialias: true
//     })
    
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
//     /**
//     * Animate
//     **/
    
//     const clock = new THREE.Clock()
    
//     const tick = () =>
//     {
//         const elapsedTime = clock.getElapsedTime()
    
//         // Update controls
//         controls.update()
    
//         // Render
//         renderer.render(scene, camera)
    
//         // Call tick again on the next frame
//         window.requestAnimationFrame(tick)
//     }
    
//     tick()
//  })

const About = () => {
    return (
        <>
        {/* <div className="main-content">
            <section className="hero-section">
                <h1 className="title">Gallery</h1>
            </section>
            <footer>
                <NavBar />
            </footer>
        </div> */}
        <div className="show-canvas">
            
        </div>
        <div className="hide-canvas">
            <video id='galaxyVid' src="textures/projects/3d-galaxy.mp4" type="video/mp4" autoPlay muted loop></video>
            <video id='particlesVid' src="textures/projects/3d-particles.mp4" type="video/mp4" autoPlay muted loop></video>
            <video id='portalVid' src="textures/projects/3d-portal.mp4" type="video/mp4" autoPlay muted loop></video>
            <div className="img-slider slider-section"></div>
            <a href="#" className='title-link'></a>
            <p className='title-tech'></p>
            <canvas className="projects-webgl"></canvas>
            <canvas className="webgl"></canvas>
        </div>
        </>
    )
}

export default About