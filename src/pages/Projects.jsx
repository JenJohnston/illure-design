// Webgl Imports
import gsap from 'gsap'

import * as dat from 'dat.gui'
import * as THREE from 'three'
import { Water } from 'three/examples/jsm/objects/Water2.js'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import '../assets/images/illure-logo.png'

import bloomLeaves from '../webGL/bloomLeaves'
import imageParticleVertexShader from '../shaders/imageParticles/vertex.glsl'
import imageParticleFragmentShader from '../shaders/imageParticles/fragment.glsl'

import React, { useState } from 'react'

import NavBar from '../components/NavBar'

document.addEventListener('DOMContentLoaded', function(e){
        /********** Initial Scene Setup **********/
    // Canvas
    
    const canvasProjects = document.querySelector('canvas.projects-webgl')
    
    // Scene
    
    const scene = new THREE.Scene()
    
    /**
     * Loaders
     */
    // Texture loader

    //image textures

    const textureLoader = new THREE.TextureLoader()
    
    const alphaTexture = textureLoader.load('textures/alpha2.png')

    const img1 = textureLoader.load('textures/nature-1.jpg')
    const img2 = textureLoader.load('textures/nature-2.jpg')
    const jftPromo = textureLoader.load('textures/projects/jft-promo.jpg')
    const abundancePromo = textureLoader.load('textures/projects/abundance-promo.jpg')

    // video textures

    const galaxyVideo = document.querySelector('#galaxyVid')
    const particlesVideo = document.querySelector('#particlesVid')
    const portalVideo = document.querySelector('#portalVid')

    const galaxyTexture = new THREE.VideoTexture(galaxyVideo)
    const particlesTexture = new THREE.VideoTexture(particlesVideo)
    const portalTexture = new THREE.VideoTexture(portalVideo)
    
    const imgArray = 
    [
        jftPromo,
        abundancePromo,
        galaxyTexture,
        particlesTexture,
        portalTexture
    ]


    
    // Draco loader
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('draco/')
    
    // GLTF loader
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)
    
    
    // Debug
    // const gui = new dat.GUI({
    //     width: 400 
    // })
    
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
    * Project Image Particles
    **/
    
    // Geometry
    
    const imageParticlesGeometry = new THREE.PlaneBufferGeometry(1.6550, 1.0775, 650, 431)
    
    // Material
    
    const imageParticlesMaterial = new THREE.ShaderMaterial(
        {
            
            depthTest: false,
            depthWrite: false,
            extensions: 
            {
                derivatives: "#extension GL_OES_standard_derivates : enable"
            },
            side: THREE.DoubleSide,
            uniforms: {
                alphaMap: {value: alphaTexture},
                time: { type: "f", value: 0 },
                uTime: { type: "f", value: 0 },
                uProgress: { type: "f", value: 0 },
                uDistortion: { type: "f", value: 0 },
                uTexture: { type: "t", value: imgArray[0] },
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
    
    imageParticlesMesh.position.x = 3.407
    imageParticlesMesh.position.y = -.853
    imageParticlesMesh.position.z = -3.623
    
    imageParticlesMesh.rotation.y = -0.735
    
    /**
    * Water 
    **/
        
     const params = {
        color: '#a8f8ff',
        scale: 4,
        flowX: 0.025,
        flowY: 0.025,
    
        exposure: 1,
        bloomStrength: 0,
        bloomThreshold: 0,
        bloomRadius: 0
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
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 5000)
    camera.position.x = 4.425
    camera.position.y = -1.433
    camera.position.z = -5
    scene.add(camera)
    
    
    /**
     * Renderer
     **/
     const renderer = new THREE.WebGLRenderer({
        canvas: canvasProjects,
        antialias: true,
        alpha: true
    })
    
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // Controls
    const controls = new OrbitControls(camera, canvasProjects)
    controls.enableDamping = true
    
    /**
    *   Post Processing
    */
    
    const renderScene = new RenderPass( scene, camera );
    
    const bloomPass = new UnrealBloomPass( new THREE.Vector2( sizes.innerWidth, sizes.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;
    
    const composer = new EffectComposer( renderer );
    composer.addPass( renderScene );
    composer.addPass( bloomPass );
    composer.setSize(sizes.width, sizes.height)
    
    /**
    * Animate
    **/
    
    // pagination for images
    
    const pageControl = document.querySelector('.img-slider')
    let currentTexture = 0
    
    
    for (let idx = 0; idx < imgArray.length; idx +=1){
        document.querySelector('.img-slider').innerHTML += '<div class="btn-container" data-idx="' + idx + '"><button class="pagButton" data-idx="' + idx + '"></button></div>'

    }

    const namesArray = [
        {
            idx: 0, 
            projectName: 'J Fitness and Training', 
            projectTech: 'three.js | react | sass'
        },
        { 
            idx: 1, 
            projectName: 'Abundance Massage and Wellness', 
            projectTech: 'jQuery | sass'
        },
        { 
            idx: 2, 
            projectName: 'Threejs-Journey 3D Galaxy', 
            projectTech: 'Three.js'
        },
        { 
            idx: 3, 
            projectName: 'awwwards Fabio Ottaviani demo ', 
            projectTech: 'Three.js | Blender'
        },
        { 
            idx: 4, 
            projectName: 'Threejs-Journey Magic Portal', 
            projectTech: 'Three.js | Blender'
        }

    ]

    

    document.querySelector('.title-link').textContent=namesArray[0].projectName

    document.querySelector('.title-tech').textContent=namesArray[0].projectTech


    // start the initial control button in the active state

    document.querySelector('.img-slider')
    .querySelector('.btn-container')
    .classList.add('active');

    document.querySelector('.img-slider')
    .querySelector('.btn-container')
    .querySelector('.pagButton')
    .classList.add('btn-active');


    pageControl.addEventListener('click', (e)=> {

        
        let controlTarget = e.target
    
        // gsap
    
        gsap.to(imageParticlesMesh.material.uniforms.uDistortion,
        {
            duration: 0.5,
            value: 4,
            ease: 'power2.inOut'
        })
    
        gsap.to(bloomPass,
        {
            duration: 0.5,
            strength: 0.35,
            delay: 1.5
        })
    
        gsap.to(imageParticlesMesh.material.uniforms.uDistortion,
        {
            duration: 0.5,
            value: 0,
            delay: 3,
            ease: 'power2.inOut'
        })
    
        gsap.to(bloomPass,
        {
            duration: 0.5,
            strength: 0,
            delay: 3,
            ease: 'power2.out'
        })
    
    
        if (controlTarget.hasAttribute('data-idx')){

            const activeButton = document.querySelectorAll('.pagButton')[currentTexture]

            currentTexture = Number(controlTarget.dataset.idx)

            // update the active selector

            document.querySelector('.img-slider .active').classList.remove('active');
            document.querySelectorAll('.btn-container')[currentTexture].classList.add('active');

            document.querySelectorAll('.pagButton')[currentTexture].classList.add('btn-active');

            if (activeButton.classList.contains('btn-active')){
                activeButton.classList.remove('btn-active')
            }

        }
    
        
        // timeout function
    
        const delay = 3200
    
        setTimeout( () => {
            imageParticlesMesh.material.uniforms.uTexture.value = imgArray[currentTexture]

            document.querySelector('.title-link').textContent=namesArray[currentTexture].projectName

            document.querySelector('.title-tech').textContent=namesArray[currentTexture].projectTech

        }, delay);
    
    })
    
    
    const clock = new THREE.Clock()
    
    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()
    
        // update image distortion
    
        imageParticlesMesh.material.uniforms.time.value = elapsedTime * 0.1
        imageParticlesMesh.material.uniforms.uTime.value = elapsedTime * 0.1
        imageParticlesMesh.material.uniforms.uTime.value = imageParticlesMesh.material.uniforms.uDistortion.value
    
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
        // renderer.render(scene, camera)
        composer.render()
    
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }
    
    tick()

    })

    

    const Projects = () => {

        
        return (
            <>
            <div className="main-content">
                <section className="hero-section projects-main">
                    <h1 className="title">
                       Projects
                    </h1>
                    <div className="slider-section">
                        <div className="sub-title">
                            <h2><a href="#" className='title-link'></a></h2>
                            <p className='title-tech'></p>
                        </div>
                        <div className="img-slider"></div>
                    </div>
                </section>
                <footer>
                    <NavBar />
                </footer>
            </div>
            <div className="hide-canvas">
                <div id="gallery-control-wrap">
                    <div className="n">
                    <img src="#" className="gallery-img"></img>
                    </div>
                    <div className="n n1">
                    <img src="#" className="gallery-img"></img>
                    </div>
                    <div className="n n2">
                    <img src="#" className="gallery-img"></img>
                    </div>
                    <div className="n n3">
                    <img src="#" className="gallery-img"></img>
                    </div>
                    <div className="n n4">
                    <img src="#" className="gallery-img"></img>
                    </div>
                    <div className="n n5">
                    <img src="#" className="gallery-img"></img>
                    </div>
                    <div className="n n6">
                    <img src="#" className="gallery-img"></img>
                    </div>
                    <div className="n n7">
                    <img src="#" className="gallery-img"></img>
                    </div>
                    <div className="n n8">
                    <img src="#" className="gallery-img"></img>
                    </div>
                </div>
                <div id="block"></div>
                <img src="#" className="gallery-img"></img>
                <video id='galaxyVid' src="textures/projects/3d-galaxy.mp4" type="video/mp4" autoPlay muted loop></video>
                <video id='particlesVid' src="textures/projects/3d-particles.mp4" type="video/mp4" autoPlay muted loop></video>
                <video id='portalVid' src="textures/projects/3d-portal.mp4" type="video/mp4" autoPlay muted loop></video>
                <canvas className="webgl"></canvas>
                <canvas className="gallery-webgl"></canvas>
            </div>
            <div className='show-canvas'>
                <canvas className="projects-webgl"></canvas>
            </div>
            </>
        )
    }
    
    export default Projects








