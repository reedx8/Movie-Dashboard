import React from "react";
import { useEffect } from "react";
import axios from "axios";

import "./Moviespage.css";
const Moviespage = () => {
  let movies = [
    "movietitle_1",
    "movietitle_2",
    "movietitle_3",
    "movietitle_1",
    "movietitle_2",
    "movietitle_3",
    "lastmovie",
  ];

  useEffect(() => {}, []);

  return (
    <div className="moviespage">
      <div id="searchContainer">
        <input id="searchinput" type="text" placeholder="Search..." />
      </div>
      <section id="newReleases">
        <h2>New Releases</h2>
        <div id="movieBox">
          {!movies
            ? null
            : movies.map((movie, key) => {
                return (
                  <div key={key} className="newReleaseMovie">
                    <h3>{movie}</h3>
                  </div>
                );
              })}
        </div>
      </section>
      <section id="comingSoon">
        <h3>Coming Soon</h3>
        <div className="comingSoonMovie">
          <h3>movietitle_1</h3>
        </div>
      </section>
      <aside id="topChart">
        <h3>Top Chart</h3>
        <div id="topChartGridContainer">
          <div className="topchartMovie">
            <h5>movietitle_1</h5>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Moviespage;
