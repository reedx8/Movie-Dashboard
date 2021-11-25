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
  const [movieInfo, setMovieInfo] = React.useState([]);

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
      while (i < maxMovies && data && i < data.length) {
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
        params: {
          ids: `${temp[0]}&ids=${temp[1]}&ids=${temp[2]}&ids=${temp[3]}&ids=${temp[4]}`,
          region: "US",
        },
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
        // setMovieInfo(data2);
      } catch (error) {
        console.error("Movie Info 2 Axios Call ERROR: ", error);
      }

      // Turn movie object into an array
      let temp2 = [];
      let j = 0;
      for (const key in data2) {
        temp2[j] = [
          data2[key].title.image.url,
          data2[key].title.title,
          data2[key].genres[0] + " / " + data2[key].genres[1],
        ];
        ++j;
      }
      console.log("TEMP2: ", temp2);
      setMovieInfo(temp2);
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
        {/* Couldnt pass props to DisplayFilms component, error -> movieInfo[0] is null */}
        {/* {movieInfo ? <DisplayFilms props={movieInfo} /> : "Loading..."} */}
        {movieInfo
          ? movieInfo.map((movie, index) => {
              // return (<img key={index} src={movie[0]} alt="poster" />);
              return (
                <div className="movieInfo" key={index}>
                  <div className="moviePoster">
                    <img
                      src={movie[0]}
                      alt="poster"
                      style={{
                        width: "9vw",
                        maxWidth: "130px",
                        minWidth: "70px",
                      }}
                    />
                  </div>
                  <h3 className="movieTitle">{movie[1]}</h3>
                  <p className="movieGenre">{movie[2]}</p>
                </div>
              );
            })
          : "Loading..."}
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

function DisplayFilms({ props }) {
  function processData(props) {
    props.forEach((e) => {
      // if (e) console.log(e[0], e[1]);
      return <h3>e[0]</h3>;
    });
  }

  // setData(props);
  // processData(props);

  return (
    <>
      {/* {props ? processData(props) : "Loading..."} */}
      {processData(props)}
      {/* {props.forEach((film) => {
        if (film) {
          return (
            <div className="movieInfo">
              <div className="movieInfoPoster">
                <img
                  src={film[0]}
                  alt="poster"
                  style={{
                    width: "9vw",
                    maxWidth: "150px",
                    minWidth: "70px",
                  }}
                />
              </div>
              <h3>{film[1]}</h3>
              <p>{film[2]}</p>
            </div>
          );
        }
      })} */}
    </>
  );
}
