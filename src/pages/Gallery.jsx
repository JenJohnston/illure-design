// Webgl Imports
import * as dat from 'dat.gui'
import * as THREE from 'three'
import { Water } from 'three/examples/jsm/objects/Water2.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import bloomLeaves from '../webGL/bloomLeaves'

import gallerySliderVertexShader from '../shaders/gallerySlider/vertex.glsl'
import gallerySliderFragmentShader from '../shaders/gallerySlider/fragment.glsl'

// React Imports

import ReactDOM from 'react-dom'
import React, { useRef, useState, useMemo } from 'react'

// Components

import NavBar from '../components/NavBar'

/********** Initial Scene Setup **********/
 window.addEventListener('load', function(e){

    // locomotive scroll function

    let mouseSpeed = 0
    let position = 0
    let rounded = 0
    const controlWrap = document.querySelector('#gallery-control-wrap')
    let elems = [...document.querySelectorAll('.n')]

    window.addEventListener('wheel', (e) =>{
        
        mouseSpeed += e.deltaY * 0.0003
    })

    let objs = Array(9).fill({dist:0})

    function raf(){
        position += mouseSpeed
        mouseSpeed *= 0.8

        function clamp(val, min, max){
            return Math.min(Math.max(min, +val), max);
        }

        objs.forEach((o, i) => {

            o.dist = Math.min(Math.abs(position - i),1)
            o.dist = 1 - o.dist**2
            elems[i].style.transform = `scale(${1 + 0.4*o.dist})`

            let scale = 1 + 0.2 * o.dist
            meshes[i].position.y = 0.543 + i * 3.2 - position * 3.2
            meshes[i].scale.set(scale, scale, scale)
            meshes[i].material.uniforms.uDistFromCenter.value = o.dist

        })

        rounded = Math.round(position)
        let diff = rounded - position

        position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.015;
        position = clamp(position, 0, 8)
        controlWrap.style.transform = `translate(0, ${-position*100 +50}px)`
        window.requestAnimationFrame(raf)
    }

   
    const canvas = document.querySelector('canvas.gallery-webgl')

    // Scene
    
    const scene = new THREE.Scene()
    
    /**
     * Loaders
     */
    // Texture loader
    const textureLoader = new THREE.TextureLoader()

    const caveBG = textureLoader.load('textures/gallery/iterative_final-1.jpg')

    const iterative1 = textureLoader.load('textures/gallery/iterative_final-1.jpg')
    const iterative2 = textureLoader.load('textures/gallery/iterative_final-2.jpg')
    const iterative3 = textureLoader.load('textures/gallery/iterative_final-3.jpg')
    const iterative4 = textureLoader.load('textures/gallery/iterative_final-4.jpg')
    const iterative5 = textureLoader.load('textures/gallery/iterative_final-5.jpg')
    const iterative6 = textureLoader.load('textures/gallery/iterative_final-6.jpg')
    const iterative7 = textureLoader.load('textures/gallery/iterative_final-7.jpg')
    const jcOneSheet = textureLoader.load('textures/gallery/jc-onesheet.jpg')
    const summersToto = textureLoader.load('textures/gallery/summers-toto.jpg')

    const galleryArray = [
        iterative1,
        iterative2,
        iterative3,
        iterative4,
        iterative5,
        iterative6,
        iterative7,
        jcOneSheet,
        summersToto
    ]
    
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

      // Fog
    
      const near = 10.5;
      const far = 16.9;
      const color = 0x162e54;
      scene.fog = new THREE.Fog(color, near, far);
      scene.background = new THREE.Color(0x0a0c1f);

      /**
    * background image
    **/
    
    // Geometry
    
    const bgImageGeometry = new THREE.PlaneBufferGeometry(30, 15)

    const bgImageMaterial = new THREE.MeshStandardMaterial( 
        {
            map: caveBG,
            side: THREE.DoubleSide

        }
    )

    const bgImageMesh = new THREE.Mesh(bgImageGeometry, bgImageMaterial)

    scene.add(bgImageMesh)

    bgImageMesh.position.x = -5.824
    bgImageMesh.position.y = 5.632
    bgImageMesh.position.z = 2.247
    
    bgImageMesh.rotation.x = 0.034
    bgImageMesh.rotation.y = -0.747
    bgImageMesh.rotation.z = 0.034

      /**
    * gallery slider
    **/

    const gallerySlideGeom = new THREE.PlaneBufferGeometry(5, 3.5)
    const materials = []
    const meshes = []
    const groups = []


    function handleImages()
    {
        let images = [...document.querySelectorAll('.gallery-img')]
        images.forEach((im, i) =>
            {
                let material = gallerySlideMaterial.clone()
                materials.push(material)
                let group = new THREE.Group()

                material.uniforms.uTexture.value = new THREE.Texture(im)
                material.uniforms.uTexture.value.needsUpdate = true
                
                let geometry = new THREE.PlaneBufferGeometry(4, 2.5, 20, 20)
                let mesh = new THREE.Mesh(geometry, material)
                group.add(mesh)
                groups.push(group)
                scene.add(group)
                meshes.push(mesh)

                mesh.rotation.y = -0.759

                mesh.position.x = 1.064
                mesh.position.y = 0.543 + (i*1.2)
                mesh.position.z = -1.019

                group.rotation.y = -0.35
                group.rotation.x = 6.39
                group.rotation.z = -6.12
        
            }
        )
    }

    const gallerySlideMaterial = new THREE.ShaderMaterial( 
        {
            side: THREE.DoubleSide,
            transparent: true,
            uniforms:
            {
                uTime: {type: 'f', value: 0},
                uTexture: {type: 't', value: null},
                uDistFromCenter: {type: 'f', value: 0}
            },
            vertexShader: gallerySliderVertexShader,
            fragmentShader: gallerySliderFragmentShader
        }
    )

    handleImages();

    const gallerySlideMesh = new THREE.Mesh(gallerySlideGeom, gallerySlideMaterial)

    let treeBloom = new THREE.Object3D()

    gltfLoader.load(
        'models/gallery-tree.glb',
        init
    )

    const galleryLeaves = new bloomLeaves(
        {
            name: 'bloomLeavesOne',
            file: './models/gallery-leaves.glb',
            color1: 'orange',
            color2: 'pink',
            scene: scene,
            placeOnLoad: true
        }
    )

    function init(gltf){
        treeBloom.add(gltf.scene)
        scene.add(treeBloom)
    }

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

     const light = new THREE.AmbientLight( 0x404040 ); // soft white light
     scene.add( light );

     const directionalLight = new THREE.DirectionalLight(0x0fbad1, 2)
    directionalLight.position.set(2, 2, 2)
    scene.add(directionalLight)
    
    const pointLight = new THREE.PointLight( 0x0fbad1, 20, 3 );
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
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    
    /**
     * Renderer
     **/
     const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    })
    
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    /**
    * Animate
    **/
    
    const clock = new THREE.Clock()
    
    raf();
    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()

         if(materials)
         {
            materials.forEach(m => 
                {
                    m.uniforms.uTime.value = elapsedTime
                }
            )
         }
         materials.forEach

         // update leaves
    
         if (galleryLeaves.isActive)
         {
            galleryLeaves.particlesMaterial.uniforms.uTime.value = elapsedTime
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

const Gallery = () => {
    return (
        <>
        <div className="main-content">
            <section className="hero-section">
                
                
            </section>
            <footer>
                <NavBar />
            </footer>
        </div>
        <div className="show-canvas">
            <canvas className="gallery-webgl"></canvas>
        </div>
        <div id="gallery-control-wrap">
            <div className="n">
                <img src="textures/gallery/iterative_final-1.jpg" alt="" className='gallery-img'/>
            </div>
            <div className="n n1">
                <img src="textures/gallery/iterative_final-2.jpg" alt="" className='gallery-img'/>
            </div>
            <div className="n n2">
                <img src="textures/gallery/iterative_final-3.jpg" alt="" className='gallery-img'/>
            </div>
            <div className="n n3">
                <img src="textures/gallery/iterative_final-4.jpg" alt="" className='gallery-img'/>
            </div>
            <div className="n n4">
                <img src="textures/gallery/iterative_final-5.jpg" alt="" className='gallery-img'/>
            </div>
            <div className="n n5">
                <img src="textures/gallery/iterative_final-6.jpg" alt="" className='gallery-img'/>
            </div>
            <div className="n n6">
                <img src="textures/gallery/iterative_final-7.jpg" alt="" className='gallery-img'/>
            </div>
            <div className="n n7">
                <img src="textures/gallery/jc-onesheet.jpg" alt="" className='gallery-img'/>
            </div>
            <div className="n n8">
                <img src="textures/gallery/summers-toto.jpg" alt="" className='gallery-img'/>
            </div>
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

export default Gallery