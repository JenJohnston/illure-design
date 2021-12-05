import "./assets/css/reset.css"
import "./assets/scss/index.scss"

import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import HomePage from './pages/HomePage';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import About from './pages/About';
import PageNotFound from './pages/404';

import NavBar from './components/NavBar'


function App(){
    
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/projects" element={<Projects/>} />
                    <Route path="/gallery" element={<Gallery/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/404" element={<PageNotFound/>} />
                </Routes>    
            </Router>
        </>
    )
}


export default App;