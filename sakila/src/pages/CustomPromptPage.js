import React, {useEffect, useState} from 'react'
import gif from "../skate2.gif"

export default function SakilaPage(){
    
    const [ai, setai] = useState(0);
    const[loading, setloading] = useState(true);
    const[error, setError] = useState(null);
    const [input, setInput] = useState("");
    const [image, setImage] = useState("");
    const imageSet = useState("");
    var passingID;
    let ref;

    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        postmethod(input);
    }


    useEffect(() => {
        FilmTitle();
        postmethod(input);
    },[])  


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
                You're currently looking at "{image}"
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
                    setInput("");
                }
        });
    }


    function LoadImage(){
        if(image !== input){
            return(
            <div>
                <img alt="loading..." src={'data:image/png;base64,' + ai}/>
            </div>
            );
        }
        else if(image == input){
            return(
            <div>
                <img alt="loading..." src={gif}/>
            </div>
            );    
        }
    }

    function paramUpdate(){
        //setImage(e.target.value)
        this.imageSet = false;
    }


    return(
        <div id='main'>
            <FilmTitle/>
            <LoadImage/>
            <form onSubmit={handleSubmit}>
            <label id='prompt'>
              Give a Prompt:
              <input
                type="text"
                onChange={e => {setImage(e.target.value)}} //; setInput(e.target.value)
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
    );
}