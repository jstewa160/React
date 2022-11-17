import React from 'react';
import * as ReactDOM from 'react-dom';
import {useEffect} from 'react';
import {useState } from 'react';
import ArtGenGrab from './pages/ArtGenGrab';
import CustomPromptPage from './pages/CustomPromptPage';
import Layout from './pages/Layout';
import Homepage from './pages/Homepage';
import './stylesheet.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// const root = ReactDOM.createRoot(
//     document.getElementById('root')
// );

export default function App(){
    return(
        <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Homepage/>}/>
                    <Route path="sakila" element={<ArtGenGrab />}/>
                    <Route path="custom" element={<CustomPromptPage/>}/>
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));

function NoPage(){
    return(
        <div id="err">
            404
        </div>
    )
}

// root.render(
//     <div>
//         <Navbar/>
//         <Header/>
//         <Body/>
//     </div>
// )

// function Body(){
//     return(
//         <div id="main">
//             <ArtGenGrab/>
//             <CustomPromptPage/>
//         </div>
//     )
// }

// function Header(){
//     return(
//         <div>
//             <h1 id ="topHeader">Art Generate</h1>
//         </div>
//     )
// }