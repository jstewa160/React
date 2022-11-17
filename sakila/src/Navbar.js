import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar(){
    return (
        <nav>
        <ul id='nav'>
            <li>
                <Link to="/"><button id='navbtn' >Homepage</button></Link>
            </li>
            <li>
                <Link to="/sakila"><button id='navbtn' >SakilaPage</button></Link>
            </li>
            <li>
                <Link to="/custom"><button id='navbtn'>Custom</button></Link>
            </li>
        </ul>
    </nav>
    )
}

export default Navbar;
