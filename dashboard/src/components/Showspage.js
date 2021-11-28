import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import "./Showspage.css";


const Showspage = () => {

    let shows = [];
    const [showsObjects, setShowsObjects] = useState([]);

    let baseUrl = 'https://imdb8.p.rapidapi.com/title/get-videos';
    let baseShowUrl = 'https://imdb8.p.rapidapi.com/title/get-most-popular-tv-shows';
    let apikey = 'e135928549msh1209028a5caa461p1fdc8fjsn10334e907635';

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
            setShowsObjects(showsObjects => [...showsObjects, newobject]);
        }).catch((error)=>{
            console.error("secondary error: " + error);
        });
    }


    useEffect(()=>{
        //proper api calls
        let originalSearch = async () => {
            axios.get(baseShowUrl,{
            
              headers: {
                'x-rapidapi-host': 'imdb8.p.rapidapi.com',
                'x-rapidapi-key': apikey
      
              }
            }).then((response) => {
              console.log(JSON.stringify(response));
              for(let x = 0; x < 8; x++){
                shows.push(JSON.stringify(response.data[x].split('/')[2]));
              }
      
              let delayedsearch = async (indexvalue) => {
                await getShowData(baseUrl, shows[indexvalue]);
              }
      
              for(let x = 0; x < 1; x++){
                  setTimeout(()=>{
                    delayedsearch(x);
      
                  }, 500 * x)
              }
            }).catch((error)=>{
              console.error("error: " + error);
            })
          }
          originalSearch();

       
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
                {(!showsObjects || showsObjects == undefined) || showsObjects.length !== 1
                    ? "Loading Shows: Please wait..."
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
