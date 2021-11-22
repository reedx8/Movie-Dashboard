import React from "react";
import "./Homepage.css";

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
      <h2>Most Popular</h2>
    </div>
  );
}

function TopRated() {
  return (
    <div className="topRated">
      <h2>Top Rated</h2>
    </div>
  );
}

function ComingSoon() {
  return (
    <div className="comingSoon">
      <h2>Coming Soon</h2>
    </div>
  );
}
