import React, { useEffect, useState} from 'react'

function picGallery(){


    function filmId(){
        fetch("http://localhost:8080/home/allFilms/single/4")
        .then(res => res.json())
        .then(image =>
            image.id)
    }
}