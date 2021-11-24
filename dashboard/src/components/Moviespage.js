import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import "./Moviespage.css";
const Moviespage = () => {
  let movies = [];
  let urls = [];

  //let baseUrlComingSoon = 'https://imdb8.p.rapidapi.com/title/get-coming-soon-movies';
  let baseUrlDetail = 'https://imdb8.p.rapidapi.com/title/get-best-picture-winners';
  let baseUrl = 'https://imdb8.p.rapidapi.com/title/get-videos';
  let apikey = '5bb2b56e53msh67f66570f892479p101960jsn07ab6f964109';

  const [ids, setIds] = useState([]);

  useEffect(() => {
    //shoot for the id list
    axios.get(baseUrlDetail,{
     
      headers: {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': apikey

      }
    }).then((response) => {

      console.log("response movie page: " + JSON.stringify(response.data));
      for(let x = 0; x < 8; x++){
        movies.push(JSON.stringify(response.data[x].split('/')[2]));
      }
      //should be just ids
      console.log("movies: " + movies);
      let firstmovie = movies[0];
      console.log(JSON.parse(firstmovie));
      for(let x = 0; x < 8; x++){
        //let newurl = baseUrl + movies[x].split('/')[1];
        //urls.push(newurl);
      }
      //setIds(urls);
      for(let x = 0; x < 1; x++){
        //... collect data for each...
        //make axios call for each id
        axios.get(baseUrl,{
          params: {
            tconst: JSON.parse(firstmovie),
            limit: '8',
            region: 'US'
          },
          headers: {
            'x-rapidapi-host': 'imdb8.p.rapidapi.com',
            'x-rapidapi-key': apikey
    
          }
        }).then((response) => {
            console.log("secondary data: " + JSON.stringify(response.data));
            //setIds(...ids, newmovie);
        }).catch((error)=>{
            console.error("secondary error: " + error);
        });
        
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
