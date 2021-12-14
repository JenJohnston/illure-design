// Webgl Imports
import * as dat from 'dat.gui'
import * as THREE from 'three'
import { Water } from 'three/examples/jsm/objects/Water2.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'



import { OrbitControls, Sky } from '@react-three/drei'
// React Imports

import ReactDOM from 'react-dom'
import React, { useRef, useState, useMemo } from 'react'

// Components

import NavBar from '../components/NavBar'

import { Canvas, useFrame, extend, useThree, useLoader } from '@react-three/fiber'

extend({ Water })

function AddWater(){
    const ref = useRef()
    const gl = useThree((state) => state.gl)

    const params = {
        color: '#a8f8ff',
        scale: 4,
        flowX: 0.025,
        flowY: 0.025
    }

    const waterGeometry = useMemo(() => new THREE.PlaneGeometry(20, 20), [])
    const water = useMemo(() => new Water( waterGeometry, {
        color: params.color,
        scale: params.scale,
        flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
        textureWidth: 2048,
        textureHeight: 2048
    } )
       
    )

    return (
        <water />
    )
}



const About = () => {
    return (
        <>
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <AddWater/>
            <OrbitControls />
        </Canvas>
        {/* <div className="main-content">
            <section className="hero-section">
               <h1>About</h1>
            </section>
            <footer>
                <NavBar />
            </footer>
        </div> */}
        </>
    )
}

export default About