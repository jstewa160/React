import React from 'react';

function Homepage(){
    return (
        <div className='container grid'>
            <div className='homepagebx1'>
                <p id='titles'>
                  Welcome to Sakilafy!
                </p>
                <p>
                  This website is designed around the Sakila database commonly used for learning SQL
                  and general database management by people all around the globe! Here you'll find
                  two pages (three if you include this one) to browse through with their own little thing 
                  going on. Let me explain them a bit for you:
                </p>
            </div>
            <div className='homepagebx2'>
                <p id='titles'>
                    Sakila:
                </p>
                <p>
                    On the Sakila page you'll find that when you load it up it will come with a movie
                    title and description. These aren't real movies as you'll realise very quickly, but
                    random ones taken from the Sakila database using a Springboot GET request in the java
                    backend (fancy words right?). This request first connects to the database server and grabs a little JSON file
                    that represents a movie of any random ID. From this little JSON we can take the title
                    and description of our movie and plug those into our art generator API request to get a random image
                    based on that description. 
                </p>
            </div>
            <div className='homepagebx3'>
                <p id='titles'>
                    Custom:
                </p>
                <p>
                    On the custom page you'll first find it blank, but not to worry! There's a little box
                    that would just love to receive your silliest ideas. Rather than taking info from the
                    Sakila database, this one takes info straight from input field and sends it on over to
                    the art generator API to get an image. 
                </p>
            </div>
            <div className='homepagebx4'>
                <p id='titles'>
                    API:
                </p>
                <p>
                    Finally we can discuss the API and what that funky little guy is doing. I
                    hear you asking "What's an API?!" filled with enthusiasm for knowledge. API stands for
                    Application Programming Interface, its a way for computer programs to send each other information
                    which comes in very handy for alot of programmers. In this website the backend is using two different
                    API's to deliver this experience to you: One is connected to the Sakila database which we use to fetch
                    information about our movies, and the other is connected to the stablehorde web API that we use to generate the images.
                </p>
                <p>
                    
                </p>
            </div>
        </div>
    )
}

export default Homepage;