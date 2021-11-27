import React from "react";
import { useEffect, useState } from "react";
//import axios from "axios";

import "./Showspage.css";



const Showspage = () => {

    
    const [showsObjects, setShowsObjects] = useState([]);

    let getShowData = async (baseUrl, showid) => {
    
        const response = axios.get(baseUrl,{
          params: {
            tconst: JSON.parse(showid),
            limit: '8',
            region: 'US'
          },
          headers: {
            'x-rapidapi-host': 'imdb8.p.rapidapi.com',
            'x-rapidapi-key': apikey
    
          }
        }).then((response) => {
            let newobject = {
              title: JSON.parse(JSON.stringify(response.data["resource"].title)),
              imgsrc: response.data["resource"].image.url,
              year: JSON.stringify(response.data["resource"].year),
              type: JSON.parse(JSON.stringify(response.data["resource"].titleType))
            }  
            setMovieObjects(showsObjects => [...showsObjects, newobject]);
        }).catch((error)=>{
            console.error("secondary error: " + error);
        });
    }


    useEffect(()=>{
        //proper api calls

       
    }, []);

    return (
        <div className="showspage">
            <div id="searchContainer">
                <label id="searchlabel" forhtml="searchinput" title="searchinput" aria-label='searchinput'>Search Shows </label>
                <input id="searchinput" type="text" name="searchinput" placeholder="Search..." />
            </div>
            <section id="newReleases">
                <h1>Shows (Top 8)</h1>
                <div id="showBox" style={{color: "white"}}>
                {!showsObjects || showsObjects == undefined
                    ? "No shows right now"
                    : showsObjects.map((show, key) => {
                        return (
                        <div key={key} className="newReleaseShow">
                            <span className="rating">{key + 1}</span>
                            <img className="newReleaseImg" src={show.imgsrc} alt={key + "s poster"}></img>              
                            <h2 className="yeardisc">{show.year} - {show.type}</h2>
                            <h3 className="classich3">{show.title}</h3>
                        </div>
                        );
                    })}
                </div>
            </section>
        </div>
    )
}

export default Showspage
