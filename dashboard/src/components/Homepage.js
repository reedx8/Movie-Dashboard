import React from "react";
import "./Homepage.css";
import Seemorebutton from "./Seemorebutton";
const axios = require("axios");

export default function Homepage() {
  return (
    <div className="homepage">
      <div className="subgrid">
        <MostPopular />
        <TopRated />
        <ComingSoon />
      </div>
    </div>
  );
}

function MostPopular() {
  const [popMovies, setPopMovies] = React.useState([null]);
  const [movieInfo, setMovieInfo] = React.useState(null);

  React.useEffect(() => {
    async function getData() {
      const options = {
        method: "GET",
        url: "https://imdb8.p.rapidapi.com/title/get-most-popular-movies",
        params: {
          homeCountry: "US",
          purchaseCountry: "US",
          currentCountry: "US",
        },
        headers: {
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
          "x-rapidapi-key":
            "79dbda4576msh0d80bf6c42d69b8p12986cjsn0c3250dfa9b7",
        },
      };
      let data;
      try {
        const response = await axios(options);
        data = await response.data;
        // console.log("Raw data: ", data);
        // setPopMovies(data);
      } catch (error) {
        console.error("Most Popular Axios Call ERROR: ", error);
      }

      // Now just get the first 5 movies IDs from the popular movies array
      let i = 0,
        maxMovies = 5,
        temp = [];
      while (i < maxMovies && i < data.length && data) {
        data[i] = data[i].substring(7);
        data[i] = data[i].substring(0, data[i].length - 1);
        temp.push(data[i]);
        ++i;
      }
      console.log(temp);
      setPopMovies(temp);

      // Now get the movie info for each movie ID
      const options2 = {
        method: "GET",
        url: "https://imdb8.p.rapidapi.com/title/get-meta-data",
        params: { ids: `${temp[0]}&ids=${temp[1]}`, region: "US" },
        headers: {
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
          "x-rapidapi-key":
            "79dbda4576msh0d80bf6c42d69b8p12986cjsn0c3250dfa9b7",
        },
      };

      let data2;
      try {
        const response2 = await axios(options2);
        data2 = await response2.data;
        console.log("Raw data: ", data2);
        setMovieInfo(data2);
      } catch (error) {
        console.error("Movie Info 2 Axios Call ERROR: ", error);
      }
    }

    getData();
    console.log("Popular movies: ", popMovies);
  }, []);

  return (
    <section className="mostPopular">
      <div className="header">
        <div className="title">
          <h2>Most Popular</h2>
        </div>
        <div className="custButton">
          <Seemorebutton />
        </div>
      </div>
      <div className="content">
        {movieInfo ? <DisplayFilms props={movieInfo} /> : "Loading..."}
        {/* <p>{popMovies}</p> */}
      </div>
    </section>
  );
}

function TopRated() {
  return (
    <section className="topRated">
      <div className="header">
        <div className="title">
          <h2>Top Rated</h2>
        </div>
      </div>
    </section>
  );
}

function ComingSoon() {
  return (
    <section className="comingSoon">
      <div className="header">
        <div className="title">
          <h2>Coming Soon</h2>
        </div>
        <div className="custButton">
          <Seemorebutton />
        </div>
      </div>
    </section>
  );
}
function DisplayFilms(props) {
  let data = [];
  function processData(props) {
    let i = 0;
    for (const key in props) {
      data[i] = [
        props[key].title.image.url,
        props[key].title.title,
        props[key].genres[0],
      ];
      ++i;
    }
    console.log(data);
  }
  // function display(props) {
  // for (const key in props) {
  // console.log(props[key].title.title);

  /*
      return (
        <div className="movieInfo">
          <div className="movieInfoPoster">
            <img
              src={props[key].title.image.url}
              alt="poster"
              style={{ width: "9vw", maxWidth: "150px", minWidth: "70px" }}
            />
          </div>
          <h3>{props[key].title.title}</h3>
          <p>{props[key].genres[0]}</p>
          <p>
            {props[key].ratings.canRate
              ? `${props[key].ratings.rating}/10`
              : ""}
          </p>
        </div>
      );
      */
  // }
  // }
  processData(props.props);
  // display(props.props);

  return <></>;
}
