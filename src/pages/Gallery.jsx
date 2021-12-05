import React from 'react'; 
import {Link} from 'react-router-dom';

import NavBar from '../components/NavBar'

const Gallery = () => {
    return (
        <>
        <div className="main-content">
            <section className="hero-section">
                <h1>Gallery</h1>
            </section>
            <footer>
                <NavBar />
            </footer>
        </div>
        </>
    )
}

export default Gallery