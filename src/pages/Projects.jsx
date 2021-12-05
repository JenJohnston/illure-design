import React from 'react'; 
import {Link} from 'react-router-dom';
import ReactDOM from 'react-dom'
import { Canvas } from '@react-three/fiber'

import NavBar from '../components/NavBar'

const Projects = () => {
    return (
        <>
        <div className="main-content">
            <section className="hero-section">
                <h1>Projects</h1>
            </section>
            <footer>
                <NavBar />
            </footer>
        </div>
        </>
    )
}

export default Projects