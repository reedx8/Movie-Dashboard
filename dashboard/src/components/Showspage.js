
/*Author: Austin Britton*/
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import "./Showspage.css";


const Showspage = () => {

    let shows = [];
    const [showsObjects, setShowsObjects] = useState([]);
    const [ids, setIds] = useState([]);
    
    let plotline = 'https://imdb8.p.rapidapi.com/title/get-plots';

    let baseUrl = 'https://imdb8.p.rapidapi.com/title/get-videos';
    let baseShowUrl = 'https://imdb8.p.rapidapi.com/title/get-most-popular-tv-shows';
    let apikey = 'e135928549msh1209028a5caa461p1fdc8fjsn10334e907635';

    let getIndividualShowData = async (plotline, showid) => {
   
      const response = axios.get(plotline,{
        params: {
          tconst: JSON.parse(showid),
        },
        headers: {
          'x-rapidapi-host': 'imdb8.p.rapidapi.com',
          'x-rapidapi-key': apikey
  
        }
  
      }).then(response => {
        
        setShowsObjects(showsObjects.map( show => show.id === JSON.parse(showid) ? {...show, flipped: !show.flipped, plot: JSON.stringify(response.data["plots"][0].text)} : show))
  
      }).catch(error => {
        console.log("error: " + error);
  
      })
    }


    let getShowData = async (baseUrl, showid) => {
      alert("show id: " + showid);
        const response = axios.get(baseUrl,{
          params: {
            tconst: JSON.parse(showid),
            limit: '8',
            region: 'US',
          },
          headers: {
            'x-rapidapi-host': 'imdb8.p.rapidapi.com',
            'x-rapidapi-key': apikey
    
          }
        }).then((response) => {
            let newobject = {
              id: JSON.parse(showid),
              flipped: false,
              plot: "",
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
                setIds(ids => [...ids, shows[indexvalue]])
                console.log("size: " + showsObjects.length);
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

    let getshowdata = (showid) => {

      setShowsObjects(showsObjects.map((showx) => 
        showx.id === showid ? {...showx, flipped: !showx.flipped} : showx
      ))
      
    }

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
                        <div key={key} className="newReleaseShow" onClick={(e)=>{
                          e.preventDefault();
                          
                          getshowdata(show.id);
                          let showId = ids[key];
                          
                          {!show.flipped && getIndividualShowData(plotline, showId)};
         
                        }}>
                            {!show.flipped && <span className="rating">{key + 1}</span>}
                            {!show.flipped
                              ?
                            <img className="newReleaseImg" src={show.imgsrc} alt={key + "s poster"}></img>              
                              :
                            <div className="newDescription">{!show.plot || show.plot.length == 0 ? "Loading..." : show.plot}</div>}  
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
