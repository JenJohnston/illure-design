import React from 'react'; 
import {Link} from 'react-router-dom';

import NavBar from '../components/NavBar'
import { loadBackground } from '../webGL/homeBackground'

loadBackground()

const HomePage = () => {
    return (
        <>
        <canvas className="webgl"></canvas>
        <div className="main-content">
            <section className="hero-section">
                <h1 className="title">
                    <span className="one">I</span><span className="two">L</span><span className="three">L</span><span className="four">U</span><span className="five">R</span><span className="six">E</span> <span className="seven">D</span><span className="eight">E</span><span className="nine">S</span><span className="ten">I</span><span className="eleven">G</span><span className="twelve">N</span>
                </h1>
                <p>Modern Web Development</p>
            </section>
            <footer>
                <NavBar />
            </footer>
        </div>
        </>
    )
}

export default HomePage
