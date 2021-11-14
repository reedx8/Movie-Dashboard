import React from "react";
import "./Sidebar.css";
import { HiHome } from "react-icons/hi";
import { MdLocalMovies } from "react-icons/md";
import { IoTv } from "react-icons/io5";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="buttons">
        <Link to="/">
          <IconContext.Provider
            value={{
              className: "sidebarIcons",
              title: "Home page",
            }}
          >
            <HiHome />
          </IconContext.Provider>
          Home
        </Link>
        <Link to="/movies">
          <IconContext.Provider
            value={{ className: "sidebarIcons", title: "Movies page" }}
          >
            <MdLocalMovies />
          </IconContext.Provider>
          Movies
        </Link>
        <Link to="/shows">
          <IconContext.Provider
            value={{ className: "sidebarIcons", title: "TV shows page" }}
          >
            <IoTv />
          </IconContext.Provider>
          TV Shows
        </Link>
      </div>
    </div>
  );
}
