import React, { useEffect, useState} from 'react'


export default function ArtGenGrab(){

        const [ai, setai] = useState(0);
        const[loading, setloading] = useState(true);
        const[error, setError] = useState(null)


        useEffect(() => {
            postmethod("rock");
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
                .then(aiimage => {
                    if(aiimage.message){
                        setai(0);
                        console.log("test");
                    } else {
                        console.log(aiimage.id)
                        passid = aiimage.id;
                    }
                });
            }  

            function checkImage(id){
                setTimeout(() => {
                    fetch("https://stablehorde.net/api/v2/generate/check/" + id)
                    .then(res => res.json())
                    .then(result => {
                        if(!result.done){
                            console.log("trying");
                            checkImage();
                        } else {
                            
                        }
                    })


                }, 2500);
  
            }

            // function getImage(id){
            //     fetch("https://stablehorde.net/api/v2/generate/status/")
            //     .then(res => res.json())
            //     .then(result => {

            //     })
            // }
        }
        
        
        ,[])  
    }
