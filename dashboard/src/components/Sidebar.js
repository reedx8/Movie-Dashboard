import React from "react";
import "./Sidebar.css";
import { HiHome } from "react-icons/hi";
import { MdLocalMovies } from "react-icons/md";
import { IoTv } from "react-icons/io5";
import { IconContext } from "react-icons";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="buttons">
        <a href="/">
          <IconContext.Provider
            value={{
              className: "sidebarIcons",
              title: "Home page",
            }}
          >
            <HiHome />
          </IconContext.Provider>
          Home
        </a>
        <a href="/">
          <IconContext.Provider
            value={{ className: "sidebarIcons", title: "Movies page" }}
          >
            <MdLocalMovies />
          </IconContext.Provider>
          Movies
        </a>
        <a href="/">
          <IconContext.Provider
            value={{ className: "sidebarIcons", title: "TV shows page" }}
          >
            <IoTv />
          </IconContext.Provider>
          TV Shows
        </a>
      </div>
    </div>
  );
}
