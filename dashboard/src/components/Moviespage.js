/*Author: Austin Britton*/
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import "./Moviespage.css";
const Moviespage = () => {
  
  let movies = [];
  let plotline = 'https://imdb8.p.rapidapi.com/title/get-plots';
  
  const [movieObjects, setMovieObjects] = useState([]); 
  const [ids, setIds] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [insearch, setInsearch] = useState(false);

  let getIndividualMovieData = async (plotline, movieid) => {
   
    const response = axios.get(plotline,{
      params: {
        tconst: JSON.parse(movieid),
      },
      headers: {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': apikey

      }

    }).then(response => {
     
      setMovieObjects(movieObjects.map( movie => movie.id === JSON.parse(movieid) ? {...movie, flipped: !movie.flipped, plot: JSON.stringify(response.data["plots"][0].text)} : movie))

    }).catch(error => {
      console.log("error: " + error);

    })
  }

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
          id: JSON.parse(movieid),
          flipped: false,
          plot: "",
          display: true,
          title: JSON.parse(JSON.stringify(response.data["resource"].title)),
          imgsrc: response.data["resource"].image.url,
          year: JSON.stringify(response.data["resource"].year),
          type: JSON.parse(JSON.stringify(response.data["resource"].titleType))
        }  
        setMovieObjects(movieObjects => [...movieObjects, newobject]);
       
    }).catch((error)=>{
        console.error("secondary error: " + error);
    });
  }

  let baseUrlDetail = 'https://imdb8.p.rapidapi.com/title/get-best-picture-winners';

  let baseUrl = 'https://imdb8.p.rapidapi.com/title/get-videos';
  let apikey = 'e54ace058amshb3046adff5a9a9cp10a2b3jsnb6e062ae922b';

  let getSearchedValue = (searchString) => {
    setInsearch(true);
    setMovieObjects(movieObjects.map((moviex) => 
      moviex.title !== searchString ? {...moviex, display: false} : moviex
    ))
  }

  useEffect(() => {
    
  
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
          setIds(ids => [...ids, movies[indexvalue]])
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

  let getshowdata = (movieid) => {

    setMovieObjects(movieObjects.map((moviex) => 
      moviex.id === movieid ? {...moviex, flipped: !moviex.flipped} : moviex
    ))
    
  }

  let clearSearchedValue = () => {

    setInsearch(false);
    setMovieObjects(movieObjects.map((moviex) => 
      moviex ? {...moviex, display: true} : moviex
    ))

  }

  return (
    <div className="moviespage">
      <div id="searchContainer">
        <label id="searchlabel" forhtml="searchinput" title="searchinput" aria-label='searchinput'>Search Movies </label>
        <input id="searchinput" type="text" name="searchinput" onChange={(e)=>{
          e.preventDefault();
          setSearchString(e.target.value)
        }} value={searchString}/>
        { !insearch ? <button id={'buttonclass'} onClick={(e)=>{
          e.preventDefault();
          
          getSearchedValue(searchString);
          setSearchString("")
          }}>Find</button> : <button id={'buttonclass'} onClick={(e)=>{
            e.preventDefault();
            
            clearSearchedValue();
            setSearchString("")
            }}>Clear</button>}
      </div>
      <section id="newReleases">
        <h1>Best Pictures (Top 8)</h1>
        <div id="movieBox" style={{color: "white"}}>
          {(!movieObjects || movieObjects == undefined) || movieObjects.length !== 8
            ? "Loading Movies: Please wait..."
            : movieObjects.filter(moviez => moviez.display == true).map((movie, key) => {
                return (
                  <div key={key} className="newReleaseMovie" onClick={(e)=>{
                    e.preventDefault();
                    
                    getshowdata(movie.id);
                    let movieId = ids[key];
                    
                    {!movie.flipped && getIndividualMovieData(plotline, movieId)};
   
                  }}>
                    {!movie.flipped && <span className="rating">{key + 1}</span> }
                    
                    {!movie.flipped
                     ?
                     <img className="newReleaseImg" src={movie.imgsrc} alt={key + "s poster"}></img>
                     :
                     <div className="newDescription">{!movie.plot || movie.plot.length == 0 ? "Loading..." : movie.plot}</div>}   
                    
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