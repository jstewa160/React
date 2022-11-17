import React, { useEffect, useState} from 'react'

function picGallery(){

    const picarray = []

    const filmId = () => {
        fetch("http://localhost:8080/home/allFilms/single/4")
        .then(res => res.json())
        .then(image =>
            image.id)
    }
}