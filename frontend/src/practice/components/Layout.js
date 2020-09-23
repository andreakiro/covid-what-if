import React from 'react';
import Nav from './Navbar.js'
import Footer from './Footer.js'

export default function Layout(props) {
    return (
        <div>
            <Nav/>
            {props.children}
            <Footer/>
        </div>
    );
}