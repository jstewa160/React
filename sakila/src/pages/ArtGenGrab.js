import React, { useEffect, useState} from 'react'
import '../stylesheet.css';
import gif from '../skate2.gif';


export default function ArtGenGrab(){

        const [ai, setai] = useState(0);
        const[loading, setloading] = useState(true);
        const[error, setError] = useState(null);
        const [input, setInput] = useState("");
        const [title, setTitle] = useState("");
        var passingID;
        let ref;

        


        const handleSubmit = (evt) => {
            evt.preventDefault();
            postmethod(input);
        }


        useEffect(() => {
            filmDesc();
            //filmTitle();
        },[])  


    function filmDesc(){
        fetch("https://demo-1668596771555.azurewebsites.net/home/allFilms/random/0")
        .then(res => res.json())
        .then(desc => {
            postmethod(desc.filmDesc)
            passingID = desc.filmId;
            ref = "https://demo-1668596771555.azurewebsites.net/home/allFilms/single/" + passingID;
            setTitle(desc)
            setInput(desc)
            console.log(ref);
        })
    }

    function filmId(){
        fetch(ref)
        .then(res => res.json())
        .then(id =>
            id.filmId)
    }


    function FilmTitle(){
        return(
            <div id="waila">
                <p>
                You're currently looking at "{title.filmTitle}"
                </p>
                <p>
                "{title.filmDesc}"
                </p>
            </div>
        )
    }


    function postmethod(input){
        fetch("https://stablehorde.net/api/v2/generate/async", {
            method: 'POST',
            headers: {
                "apikey": "tfgQCv8pHWSRiv8PRP94VA",
                "accept": "application/json",
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                prompt: input
            })
         })
        .then(res => res.json())
        .then((ai) => {
            if(ai.message){
                setai("");
                console.log("test");
                alert("No Text!");
                return;
            } else {
                console.log(ai.id);
                checkImage(ai.id);
            }
        });
    }
    

    function checkImage(id){
        setTimeout(() => {
            fetch("https://stablehorde.net/api/v2/generate/check/" + id)
            .then(res => res.json())
            .then((ai) => {
                if(!ai.done){
                    console.log("trying");
                    checkImage(id);
                } else {
                    console.log("im calling getImage for " + passingID)
                    getImage(id);
                }
            });

        }, 2500);

    }


    function getImage(id){
        fetch("https://stablehorde.net/api/v2/generate/status/" + id)
        .then(res => res.json())
        .then((ai) => {
                console.log(ai.generations[0].img)
                if(ai.generations[0]){
                    setai(ai.generations[0].img);
                    console.log("im here at getImage now");
                }
        });
    }
    

        return(
            <div id='main'>
                <FilmTitle/>
                <div>
                {input !== "" ? <img alt="loading..." src={'data:image/png;base64,' + ai}/> : <img alt="loading..." src={gif}/>}
                </div>
                <br></br>
                <button id='navbtn'onSubmit={handleSubmit}>
                New Image!
              </button>
            </div>
        )
    }