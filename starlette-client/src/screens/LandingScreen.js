import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

function LandingScreen() {
  useEffect(() => {
    Aos.init({ duration: 1200 });
  }, []);

  return (
    <div className="row landing justify-content-center">
      <div
        className="col-md-9 my-auto text-center"
        style={{ borderRight: "8px solid white" }}
        data-aos="zoom-out-up"
      >
        <h2 style={{ color: "white", fontSize: "130px" }}>STARLETTE</h2>
        <h1 style={{ color: "white" }}>
          "Discover the art of seamless travel. Where comfort meets convenience,
          and every stay becomes a story. Your journey begins with us, where
          each booking is more than a reservation – it's an experience tailored
          just for you. Welcome to Starlette"
        </h1>

        <Link to="/home">
          <button className="btn landingbtn" style={{ color: "black" }}>
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LandingScreen;
