import React from "react";

function Hero() {
  return (
    <div className="container p-5 mb-5 text-center">

      <img
        src="/media/images/homeHero.png"
        alt="Hero Image"
        className="mb-5"
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "auto",
          display: "block",
          margin: "0 auto"
        }}
      />

      <h1 className="mt-5">Invest in everything</h1>

      <p>
        Online platform to invest in stocks, derivatives, mutual funds, and more
      </p>

      <button
        className="p-2 btn btn-primary fs-5 mb-5"
        style={{ width: "20%", margin: "0 auto" }}
      >
        Signup Now
      </button>

    </div>
  );
}

export default Hero;