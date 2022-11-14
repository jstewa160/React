import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {useEffect} from 'react';
import {useState } from 'react';
import ArtGenGrab from './ArtGenGrab';


const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <React.StrictMode>
        {/* <Body/>
        <SakilaAPI/>
        <GetImage/> */}
        <ArtGenGrab/>
    </React.StrictMode>
)

function Body(){
    return(
        <div>
            Hello
        </div>
    )
}


function SakilaAPI(){
    const [error, setError] = useState(null);
    const [desc, setDesc] = useState("")

    useEffect(() => {
        fetch("http://localhost:8080/home/allFilms/single/4")
        .then(res => res.json())
        .then(desc => {
            setDesc(desc.filmDesc);
        },
        error => {
            setError(error);
        }
        )
    },[])
    if(error){
        return <div>Error loading</div>
    } else{
        return(
        <div id = "activity"> {desc} </div>
        )
    }
}


// function GetImage(){
//     const[url, seturl] = useState(0)
    
//     useEffect(() => {
//         fetch('http://localhost:8080/home/films/4')
//         .then(res => res.json())
//         .then(cats => {
//             cats.forEach(cat =>{
//                 seturl(cat.url)
//             })
//         })
//     },[])
//     return(
//         <div>
//             <img th:src="'data:image/png;base64,' + ${image}"/>
//         </div>
//     )
// }