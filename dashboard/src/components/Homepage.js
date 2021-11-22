import React from "react";
import "./Homepage.css";

export default function Homepage() {
  return (
    <div className="homepage">
      <div className="subgrid">
        <section className="mostPopular">
          <h2>Most Popular</h2>
        </section>
        <section className="topRated">
          <h2>Top Rated</h2>
        </section>
        <section className="comingSoon">
          <h2>Coming Soon</h2>
        </section>
      </div>
    </div>
  );
}
