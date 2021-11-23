import React from "react";
import "./Homepage.css";
import Seemorebutton from "./Seemorebutton";

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
  return (
    <div className="mostPopular">
      <div className="header">
        <div className="title">
          <h2>Most Popular</h2>
        </div>
        <div className="custButton">
          <Seemorebutton />
        </div>
      </div>
    </div>
  );
}

function TopRated() {
  return (
    <div className="topRated">
      <div className="header">
        <div className="title">
          <h2>Top Rated</h2>
        </div>
      </div>
    </div>
  );
}

function ComingSoon() {
  return (
    <div className="comingSoon">
      <div className="header">
        <div className="title">
          <h2>Coming Soon</h2>
        </div>
        <div className="custButton">
          <Seemorebutton />
        </div>
      </div>
    </div>
  );
}
