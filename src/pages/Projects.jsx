import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import '../webGL/ColorMaterial'


import NavBar from '../components/NavBar'

function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += 0.01, ref.current.rotation.y += 0.01))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={ref}
        scale={[1, 1, 1]}
        >
        <boxGeometry args={[1, 1, 1]} />
        <colorMaterial color="#ff0000" />
        {/* <meshBasicMaterial color={'hotpink'} /> */}
      </mesh>
    )
  }

const Projects = () => {
    return (
        <>
            <div className="project-content">
                <section className="hero-section">
                        <h1>Projects</h1>
                </section>
                <div className="canvas-container">
                    <Canvas>
                        <Box position={[0, 0, 0]} />
                        <OrbitControls />
                    </Canvas>,
                </div>
                <footer>
                    <NavBar />
                </footer>
            </div>
        </>
    )
}

export default Projects