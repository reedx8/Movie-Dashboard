import React from "react";
import { useEffect } from "react";
import axios from "axios";

import "./Moviespage.css";
const Moviespage = () => {
  let movies = [
    "movietitle_1sdfsdf",
    "movietitle_2",
    "movietitle_1",
    "movietitle_2",
    "movietitle_1",
    "movietitle_2",
    "movietitle_1",
    "movietitle_2"
  
  ];

  let baseUrl = 'https://imdb8.p.rapidapi.com/auto-complete';
  let apikey = '79dbda4576msh0d80bf6c42d69b8p12986cjsn0c3250dfa9b7';

  useEffect(() => {

    axios.get(baseUrl,{
      params: {
        q: 'game of thr'
      },
      headers: {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': apikey

      }
    }).then((response) => {

      console.log("response movie page: " + JSON.stringify(response));
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
        <div id="movieBox">
          {!movies
            ? null
            : movies.map((movie, key) => {
                return (
                  <div key={key} className="newReleaseMovie">
                     <span className="rating">10</span>
                    <img alt={key + "s poster"}></img>
                   
                    <h2 className="yeardisc">Year - Descript</h2>
                    <h3>{key + "s title"}</h3>
                  </div>
                );
              })}
        </div>
      </section>
      <aside id="topChart">
        <h2>Top Chart</h2>
        <div id="topChartGridContainer">
          <div className="topchartMovie">
            <p>movietitle_1</p>
          </div>
        </div>
      </aside>
      <section id="comingSoon">
        <h3>Coming Soon</h3>
        <div className="comingSoonMovie">
          <h3>movietitle_1</h3>
        </div>
      </section>
    </div>
  );
};

export default Moviespage;
