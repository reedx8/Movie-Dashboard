import React from "react";
import "./Homepage.css";
import Seemorebutton from "./Seemorebutton";
import { IconContext } from "react-icons";
import { AiFillStar } from "react-icons/ai";
import { BiPlayCircle } from "react-icons/bi";
import {
  BsPlayCircleFill,
  BsFillPlayBtnFill,
  BsFillPlayFill,
} from "react-icons/bs";
import { IoTicketOutline, IoTicket } from "react-icons/io5";

const axios = require("axios");

// displays every section on homepage (most popular, top rated, and coming soon)
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

// Displays the most popular films on the homepage
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
            // "923c367cdbmsh6ea785496f3c985p1af000jsn90cc9c8b8e53",
            "10b706d841mshd8df930f4b01e45p1eb5a1jsncd3b1c89a8a0",
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

      // Now just get the first movies IDs from the popular movies array, up to maxMovies
      let i = 0,
        maxMovies = 8,
        temp = [];
      while (i < maxMovies && data && i < data.length) {
        data[i] = data[i].substring(7);
        data[i] = data[i].substring(0, data[i].length - 1);
        temp.push(data[i]);
        ++i;
      }
      console.log(temp);
      setPopMovies(temp);

      // Then get string of ids to pass to APIs params
      let ids = () => {
        let tempIds = temp[0];
        for (let i = 1; i < temp.length; i++) {
          tempIds = tempIds + "&ids=" + temp[i];
        }
        return tempIds;
      };

      // Now get the movie info for each movie ID
      const options2 = {
        method: "GET",
        url: "https://imdb8.p.rapidapi.com/title/get-meta-data",
        params: {
          // ids: `${temp[0]}&ids=${temp[1]}&ids=${temp[2]}&ids=${temp[3]}&ids=${temp[4]}&ids=${temp[5]}&ids=${temp[6]}&ids=${temp[7]}`,
          ids: ids(),
          region: "US",
        },
        headers: {
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
          "x-rapidapi-key":
            // "923c367cdbmsh6ea785496f3c985p1af000jsn90cc9c8b8e53",
            "10b706d841mshd8df930f4b01e45p1eb5a1jsncd3b1c89a8a0",
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

      // Turn movie object data2 into an array temp2
      let temp2 = [];
      let j = 0;
      for (const key in data2) {
        let rating = 0;
        let ratingCount = 0;
        if (data2[key].ratings.canRate) {
          rating = data2[key].ratings.rating;
          ratingCount = data2[key].ratings.ratingCount;
        }
        temp2[j] = [
          data2[key].title.image.url,
          data2[key].title.title,
          data2[key].genres[0] + " / " + data2[key].genres[1],
          rating,
          parseInt(ratingCount).toLocaleString("en-US"),
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
                        width: "110px",
                        // width: "9vw",
                        // maxWidth: "130px",
                        // minWidth: "70px",
                        borderRadius: "3px",
                      }}
                    />
                  </div>
                  <h3 className="movieTitle">{movie[1]}</h3>
                  <p className="movieGenre">{movie[2]}</p>
                  <p className="movieRating">
                    <IconContext.Provider value={{ className: "starIcon" }}>
                      <AiFillStar />
                    </IconContext.Provider>
                    {movie[3]}
                    <span className="totRating">/10</span>
                    <span className="ratingCount">({movie[4]})</span>
                  </p>
                </div>
              );
            })
          : "Loading..."}
      </div>
    </section>
  );
}

// displays the top rated titles to homepage
function TopRated() {
  return (
    <section className="topRated">
      <div className="header">
        <div className="title">
          <h2>Top Rated</h2>
        </div>
      </div>
      <div className="TRcontent">
        <div className="TRbox">
          <div className="TRtitlerow">
            <p className="TRrank">
              1 <span className="rankLine">|</span> Planet Earth II
            </p>
            <p className="TRrating">
              <IconContext.Provider value={{ className: "TRstarIcon" }}>
                <AiFillStar />
              </IconContext.Provider>
              9.5<span className="totRating">/10</span>
            </p>
          </div>
          <div className="TRbuttonrow">
            <button className="TRtrailerbutton">
              <IconContext.Provider value={{ className: "TRplayicon" }}>
                <BsFillPlayFill />
                Trailer
              </IconContext.Provider>
            </button>
            <button className="TRshowtimebutton">
              <IconContext.Provider value={{ className: "TRshowtimeicon" }}>
                <IoTicket />
                Showtimes
              </IconContext.Provider>
            </button>
          </div>
        </div>
        <div className="TRbox">
          <div className="TRtitlerow">
            <p className="TRrank">
              2 <span className="rankLine">|</span> Breaking Bad
            </p>
            <p className="TRrating">
              <IconContext.Provider value={{ className: "TRstarIcon" }}>
                <AiFillStar />
              </IconContext.Provider>
              9.4<span className="totRating">/10</span>
            </p>
          </div>
          <div className="TRbuttonrow">
            <button className="TRtrailerbutton">
              <IconContext.Provider value={{ className: "TRplayicon" }}>
                <BsFillPlayFill />
                Trailer
              </IconContext.Provider>
            </button>
            <button className="TRshowtimebutton">
              <IconContext.Provider value={{ className: "TRshowtimeicon" }}>
                <IoTicket />
                Showtimes
              </IconContext.Provider>
            </button>
          </div>
        </div>
        <div className="TRbox">
          <div className="TRtitlerow">
            <p className="TRrank">
              3 <span className="rankLine">|</span> Game of Thrones
            </p>
            <p className="TRrating">
              <IconContext.Provider value={{ className: "TRstarIcon" }}>
                <AiFillStar />
              </IconContext.Provider>
              9.2<span className="totRating">/10</span>
            </p>
          </div>
          <div className="TRbuttonrow">
            <button className="TRtrailerbutton">
              <IconContext.Provider value={{ className: "TRplayicon" }}>
                <BsFillPlayFill />
                Trailer
              </IconContext.Provider>
            </button>
            <button className="TRshowtimebutton">
              <IconContext.Provider value={{ className: "TRshowtimeicon" }}>
                <IoTicket />
                Showtimes
              </IconContext.Provider>
            </button>
          </div>
        </div>
        <div className="TRbox">
          <div className="TRtitlerow">
            <p className="TRrank">
              4 <span className="rankLine">|</span> The Godfather
            </p>
            <p className="TRrating">
              <IconContext.Provider value={{ className: "TRstarIcon" }}>
                <AiFillStar />
              </IconContext.Provider>
              9.1<span className="totRating">/10</span>
            </p>
          </div>
          <div className="TRbuttonrow">
            <button className="TRtrailerbutton">
              <IconContext.Provider value={{ className: "TRplayicon" }}>
                <BsFillPlayFill />
                Trailer
              </IconContext.Provider>
            </button>
            <button className="TRshowtimebutton">
              <IconContext.Provider value={{ className: "TRshowtimeicon" }}>
                <IoTicket />
                Showtimes
              </IconContext.Provider>
            </button>
          </div>
        </div>
        <div className="TRbox">
          <div className="TRtitlerow">
            <p className="TRrank">
              5 <span className="rankLine">|</span> The Dark Knight
            </p>
            <p className="TRrating">
              <IconContext.Provider value={{ className: "TRstarIcon" }}>
                <AiFillStar />
              </IconContext.Provider>
              9.0<span className="totRating">/10</span>
            </p>
          </div>
          <div className="TRbuttonrow">
            <button className="TRtrailerbutton">
              <IconContext.Provider value={{ className: "TRplayicon" }}>
                <BsFillPlayFill />
                Trailer
              </IconContext.Provider>
            </button>
            <button className="TRshowtimebutton">
              <IconContext.Provider value={{ className: "TRshowtimeicon" }}>
                <IoTicket />
                Showtimes
              </IconContext.Provider>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// displays the titles coming soon to the homepage
function ComingSoon() {
  const [films, setFilms] = React.useState([
    ["/images/comingsoon/expanse.jpg", "The Expanse (Sn. 6)", "Dec 10, 2021"],
    ["/images/comingsoon/sing.jpg", "Sing 2", "Dec 22, 2021"],
    [
      "/images/comingsoon/matrix.jpg",
      "The Matrix Resurrections",
      "Dec 22, 2021",
    ],
    [
      "/images/comingsoon/dragons.jpg",
      "Dragons: The Nine Realms",
      "Dec 23, 2021",
    ],
    ["/images/comingsoon/boba.jpg", "The Book of Boba Fett", "Dec 29, 2021"],
    ["/images/comingsoon/scream.jpg", "Scream", "Jan 14, 2022"],
  ]);

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
      <div className="CScontent">
        {films.map((film, key) => {
          return (
            <div className="CSbox" key={key}>
              <div className="moviePoster">
                <img
                  src={film[0]}
                  alt="poster"
                  style={{
                    width: "110px",
                    borderRadius: "3px",
                  }}
                />
              </div>
              <h3 className="movieTitle">{film[1]}</h3>
              <p className="movieDate">{film[2]}</p>
            </div>
          );
        })}
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
