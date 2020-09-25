import React from 'react';
import Nav from './Navbar.js'
import Footer from './Footer.js'

export default function Layout(props) {
    return (
        <div className="w-full space-y-4 h-full flex flex-col">
            <Nav/>
            <div className="flex flex-col items-center w-full flex-grow">
                {props.children}
            </div>
            <Footer/>
        </div>
    );
}