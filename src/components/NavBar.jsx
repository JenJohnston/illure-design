import React from 'react';
import {Link} from 'react-router-dom';

import IllureLogo from '../assets/images/illure-logo.png'
import FacebookSVG from '../assets/images/svg/facebook_icon.svg'
import InstagramSvg from '../assets/images/svg/instagram_icon.svg'
import LinkedInSvg from '../assets/images/svg/linkedin_icon.svg'
import SnapChatLogo from '../assets/images//snapchat_icon.png'
import WhatsAppLogo from '../assets/images/whatsApp_icon.png'

function toggleHamburger() {

    const menuToggle = document.querySelector('.nav-toggle');
    let menuOpen = false;

        document.querySelector('.site-nav').classList.toggle('show-nav');
        document.querySelector('.media-nav').classList.toggle('show-nav');
        menuToggle.classList.toggle('open');

        if(!menuOpen){
            menuOpen = true;
        } else {
            menuToggle.classList.remove('open');
            menuOpen = false;
        }
  }


const NavBar = () => {
    return (
        <>
        <nav className="site-nav">
            <ul className="main-menu">
                <li className="menu-links"><Link to="/projects">Projects</Link></li>
                <li className="menu-links"><Link to="/gallery">Gallery</Link></li>
                <li className="menu-links"><Link to="/about">About</Link></li>
            </ul>
        </nav>
        <div className="mobile-container">
            <div className="logo-container">
                <Link to="/" className="site-logo" onClick="window.location.reload();">
                    <img src={IllureLogo} alt="Illure Design Logo" />
                </Link>
            </div>
            <div className="nav-toggle" onClick={toggleHamburger}>
                <div className="nav-btn"></div>
            </div>
        </div>
        <nav className="media-nav">
            <ul className="media-menu">
                <li className="media-links">
                    <Link to="#">
                            <svg version="1.1" id="Layer_1"  x="0px" y="0px"
                            viewBox="0 0 30 30"  >
                            <circle cx="15" cy="15" r="15" fill="#1686B0"/>
                            <path id="f" fill="#FFFFFF" d="M16.4,23.9v-8.1h2.7l0.4-3.2h-3.1v-2c0-0.9,0.3-1.5,1.6-1.5l1.7,0V6.2c-0.3,0-1.3-0.1-2.4-0.1
                            c-2.4,0-4.1,1.5-4.1,4.2v2.3h-2.7v3.2h2.7v8.1H16.4z"/>
                            </svg>
                    </Link>
                </li>
                <li className="media-links">
                    <Link to="#">
                    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram-square"  role="img" viewBox="0 0 448 512" ><path fill="currentColor" d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"></path></svg>
                    </Link>
                </li>
                <li className="media-links">
                    <Link to="#"><svg  id="Layer_1" version="1.1" viewBox="0 0 48 48"><circle cx="24" cy="24" fill="#1686B0" r="24"/><path d="M17.4,34.9h-4.6V20.1h4.6V34.9z M14.9,18.2L14.9,18.2c-1.7,0-2.8-1.1-2.8-2.6c0-1.5,1.1-2.6,2.8-2.6  c1.7,0,2.8,1.1,2.8,2.6C17.7,17.1,16.7,18.2,14.9,18.2z M35.9,34.9h-5.3v-7.7c0-2-0.8-3.4-2.6-3.4c-1.4,0-2.1,0.9-2.5,1.8  c-0.1,0.3-0.1,0.8-0.1,1.2v8h-5.2c0,0,0.1-13.6,0-14.8h5.2v2.3c0.3-1,2-2.5,4.6-2.5c3.3,0,5.9,2.1,5.9,6.7V34.9z" fill="#FFFFFF"/></svg></Link>
                </li>
                <li className="media-links">
                    <Link to="#">
                        <img src={SnapChatLogo} alt="Snap Chat Logo" />   
                    </Link>
                </li>
                <li className="media-links">
                <img src={WhatsAppLogo} alt="WhatsApp Logo" /> 
                </li>
            </ul>
            <ul className="contact-menu">
                <li className="contact-links">
                    <Link to="tel:7802314506">PH: (780)231-4506</Link>
                </li>
                <li className="contact-links">
                    <Link to="mailto:jen@illure-design.com">EMAIL: jen@illure-design.com</Link>
                </li>
            </ul>
        </nav>
        </>
    )
}

export default NavBar