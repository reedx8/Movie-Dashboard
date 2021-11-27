import React from "react";
import { useEffect, useState } from "react";
//import axios from "axios";

import "./Showspage.css";



const Showspage = () => {

    const [showsObjects, setShowsObjects] = useState([]);
    let showObject = {
        title: "",
        year: "", 
        imgsrc: "",
        type: ""
    }


    useEffect(()=>{
        //proper api calls

        let newShow = showObject;
        newShow.title = "test show";
        newShow.year = "1993";
        newShow.type = "horror";
        newShow.imgsrc = "";

        setShowsObjects(showsObjects => [...showsObjects, newShow]);
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
