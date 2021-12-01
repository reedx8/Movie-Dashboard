import React from "react";
import headshot from "./authorbritton.jpg";
import "./Authorspage.css";
const Authorspage = () => {
  return (
    <div className={"authorspage"}>
      <h1 id={"mainh1"}>About the Authors</h1>
      <div id={"authorcontainer"}>
        <section className={"authorbox"}>
          <h2>Xavier Reed</h2>

          <p>
            Post bac in computer science in his last year. Enjoys reading,
            hiking, programming, and being out in the sun.
          </p>
          <div className={"photoguy"}>
            <img src="images/x.jpg" id="brittonheadshot" alt="photoguy"></img>
          </div>
        </section>
        <section className={"authorbox"}>
          <h2>Austin Britton</h2>

          <p>
            Computer Science Major with a passion for programming. Focused on
            AI/ML in the area of game theory / decision making in games without
            perfect information
          </p>
          <div className={"photoguy"}>
            <img id={"brittonheadshot"} src={headshot} alt="photoguy"></img>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Authorspage;
