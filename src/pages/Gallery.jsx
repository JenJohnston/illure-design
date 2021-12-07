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

/********** Initial Scene Setup **********/

// Canvas

// const canvas = document.querySelector('canvas.gallery-webgl')

// // Scene

// const scene = new THREE.Scene()

// /**
//  * Loaders
//  */
// // Texture loader
// const textureLoader = new THREE.TextureLoader()

// // Draco loader
// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('draco/')

// // GLTF loader
// const gltfLoader = new GLTFLoader()
// gltfLoader.setDRACOLoader(dracoLoader)


// // Debug
// const gui = new dat.GUI({
//     width: 400 
// })

// /**
// *   Sizes    
// */

// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () => 
// {

//         // Update sizes
//         sizes.width = window.innerWidth
//         sizes.height = window.innerHeight
    
//         // Update camera
//         camera.aspect = sizes.width / sizes.height
//         camera.updateProjectionMatrix()
    
//         // Update renderer
//         renderer.setSize(sizes.width, sizes.height)
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
       
    
// })

// /**
// * Lights
// **/

// /**
// * Camera
// **/

// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 50)
// camera.position.x = 4.425
// camera.position.y = -1.433
// camera.position.z = -5
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Renderer
//  **/
//  const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     antialias: true
// })

// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// /**
// * Animate
// **/

// const clock = new THREE.Clock()

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     // Update controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()

const Gallery = () => {
    return (
        <>
        <canvas className="gallery-webgl"></canvas>
        {/* <div className="main-content">
            <section className="hero-section">
                <h1>Gallery</h1>
            </section>
            <footer>
                <NavBar />
            </footer>
        </div> */}
        </>
    )
}

export default Gallery