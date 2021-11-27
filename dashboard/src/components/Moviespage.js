/*Author: Austin Britton*/
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import "./Moviespage.css";
const Moviespage = () => {
  
  let movies = [];
  
  const [movieObjects, setMovieObjects] = useState([]);


  let getMovieData = async (baseUrl, movieid) => {
    
    const response = axios.get(baseUrl,{
      params: {
        tconst: JSON.parse(movieid),
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
        setMovieObjects(movieObjects => [...movieObjects, newobject]);
        if(movieObjects.length == 8){
          setLoaded(true);
        }
    }).catch((error)=>{
        console.error("secondary error: " + error);
    });
  }

  let baseUrlDetail = 'https://imdb8.p.rapidapi.com/title/get-best-picture-winners';
  //let baseUrlDetail = 'https://imdb8.p.rapidapi.com/title/get-most-popular-tv-shows';
  let baseUrl = 'https://imdb8.p.rapidapi.com/title/get-videos';
  let apikey = '0d06046b1emsh0ee30cdd2f84aa0p181203jsn4b2a464c1844';


  useEffect(() => {
    
    //shoot for the id list
    let originalSearch = async () => {
      axios.get(baseUrlDetail,{
      
        headers: {
          'x-rapidapi-host': 'imdb8.p.rapidapi.com',
          'x-rapidapi-key': apikey

        }
      }).then((response) => {
        console.log(JSON.stringify(response));
        for(let x = 0; x < 8; x++){
          movies.push(JSON.stringify(response.data[x].split('/')[2]));
        }

        let delayedsearch = async (indexvalue) => {
          await getMovieData(baseUrl, movies[indexvalue]);
          console.log("size: " + movieObjects.length)
          
        }

        for(let x = 0; x < 8; x++){
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
    <div className="moviespage">
      <div id="searchContainer">
        <label id="searchlabel" forhtml="searchinput" title="searchinput" aria-label='searchinput'>Search Movies </label>
        <input id="searchinput" type="text" name="searchinput" placeholder="Search..." />
      </div>
      <section id="newReleases">
        <h1>Best Pictures (Top 8)</h1>
        <div id="movieBox" style={{color: "white"}}>
          {(!movieObjects || movieObjects == undefined) || movieObjects.length !== 8
            ? "Loading Movies: Please wait..."
            : movieObjects.map((movie, key) => {
                return (
                  <div key={key} className="newReleaseMovie">
                    <span className="rating">{key + 1}</span>
                    <img className="newReleaseImg" src={movie.imgsrc} alt={key + "s poster"}></img>              
                    <h2 className="yeardisc">{movie.year} - {movie.type}</h2>
                    <h3 className="classich3">{movie.title}</h3>
                  </div>
                );
              })}
        </div>
      </section>
      
    </div>
  );
};
export default Moviespage;