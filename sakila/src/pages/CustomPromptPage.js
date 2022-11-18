import React, {useEffect, useState} from 'react'
import gif from "../skate2.gif"
import gif2 from "../giphy.gif"
import bam from "../bam.jpg"
import wow from "../wow.jpg"

export default function SakilaPage(){
    
    const [ai, setai] = useState(0);
    const[error, setError] = useState(null);
    const [input, setInput] = useState("");
    const [image, setImage] = useState("");
    const [loaded, setLoaded] = useState("");
    const[loading, setLoading] = useState("");


    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        setInput(image);
        setLoading(true);
        setLoaded(false);
        postmethod(input);
    }


    useEffect(() => {
        FilmTitle();
        postmethod(input);
    },[])  


    function FilmTitle(){
        if(loaded == false && loading == false){
            return(
                <div id="waila">
                    <p>
                        You're currently looking at a bird :)
                    </p>
                    <p>
                        Nothing is loading right now but...
                    </p>
                    <p>
                        You can give a little prompt in the box if you'd like and I'll try generate it!
                    </p>
                    <div>
                    <img alt="loading..." src={gif2}/>
                    </div>
                </div>
            )
        } else if(loaded == true && loading == false){
            return(
                <div id="waila">
                    <p>
                    You're currently looking at "{input}"
                    </p>
                </div>
            )
        } else if(loaded == false && loading == true){
            return(
                <div>
                    <p id='waila'>
                        Getting your image, hold on tight!
                    </p>
                </div>
            )
        }
        
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
                    console.log("im calling getImage for ")
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
                    setLoaded(true);
                    setLoading(false);
                }
        });
    }


    function LoadImage(){
        if(loaded == true && loading == false){
            return(
            <div>
                <img alt="loading..." src={'data:image/png;base64,' + ai}/>
            </div>

            );
        }
        else if(loaded == false && loading == true){
            return(
            <div>
                <img alt="loading..." src={gif}/>
            </div>
            );
        }  
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
                onChange={e => setImage(e.target.value)} //; setInput(e.target.value)
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
    );
}
