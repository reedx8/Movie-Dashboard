import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import "./Moviespage.css";
const Moviespage = () => {
  let movies = [];
  let urls = [];

  let baseUrlComingSoon = 'https://imdb8.p.rapidapi.com/title/get-coming-soon-movies';
  let baseUrl = 'https://imdb8.p.rapidapi.com/title/get-details';
  let apikey = '79dbda4576msh0d80bf6c42d69b8p12986cjsn0c3250dfa9b7';

  const [ids, setIds] = useState([]);

  useEffect(() => {
    //shoot for the id list
    axios.get(baseUrlComingSoon,{
      
      headers: {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': apikey

      }
    }).then((response) => {

      console.log("response movie page: " + JSON.stringify(response.data));
      for(let x = 0; x < 8; x++){
        movies.push(JSON.stringify(response.data[x].id.split("/")[2]));
      }
      //should be just ids
      console.log("movies: " + movies);
     
      for(let x = 0; x < 8; x++){
        //let newurl = baseUrl + movies[x].split('/')[1];
        //urls.push(newurl);
      }
      //setIds(urls);
      for(let x = 0; x < 8; x++){
        //... collect data for each...
        //make axios call for each id
        
       
      }
    }).catch((error)=>{
      console.error("error: " + error);
    })


  }, []);

  return (
    <div className="moviespage">
     
      <div id="searchContainer">
        <label id="searchlabel" forhtml="searchinput" title="searchinput" aria-label='searchinput'>Search Movies </label>
        <input id="searchinput" type="text" name="searchinput" placeholder="Search..." />
       
      </div>
     
      <section id="newReleases">
        <h1>New Releases</h1>
        <div id="movieBox" style={{color: "white"}}>
          {!movies
            ? "No movies right now"
            : ids.map((movie, key) => {
                return (
                  <div key={key} className="newReleaseMovie">
                     <span className="rating">10</span>
                    <img alt={key + "s poster " + movie}></img>
                   
                    <h2 className="yeardisc">Year - Descript</h2>
                    <h3>{key + "s title"}</h3>
                  </div>
                );
              })}
        </div>
      </section>
      
    </div>
  );
};

export default Moviespage;
