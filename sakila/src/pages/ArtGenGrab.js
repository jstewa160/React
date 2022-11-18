import React, { useEffect, useState} from 'react'
import '../stylesheet.css';
import gif from '../skate2.gif';


export default function ArtGenGrab(){

        const [ai, setai] = useState(0);
        const[error, setError] = useState(null);
        const [input, setInput] = useState("");
        const [title, setTitle] = useState("");
        const[loading, setloading] = useState(true);

        var passingID;
        let ref;

        


        const handleSubmit = (evt) => {
            evt.preventDefault();
            setloading(true);
            filmDescThenStart();
        }


        useEffect(() => {
            filmDescThenStart();
        },[])  


    function filmDescThenStart(){
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



    function FilmTitle(){
        if(loading == true){
            return(
                <div id="waila">
                    <p>
                    You'll soon be looking at "{title.filmTitle}"
                    </p>
                    <p>
                    "{title.filmDesc}"
                    </p>
                </div>
            )
        } else {
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
        
    }


    function postmethod(input){
        fetch("https://stablehorde.net/api/v2/generate/async", {
            method: 'POST',
            headers: {
                "apikey": "iDrJk9XiVBvZBVeuZPZWwg",
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
                    console.log("image got!");
                    setloading(false);
                }
        });
    }
    

        return(
            <div id='main'>
                <FilmTitle/>
                <div>
                {loading !== true ? <img alt="loading..." src={'data:image/png;base64,' + ai}/> : <img alt="loading..." src={gif}/>}
                </div>
                <button id='navbtn'onClick={handleSubmit}>
                New Image!
                </button>
            </div>
        )
    }