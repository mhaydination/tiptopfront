import React from "react";
import "./Lots.css";

const Lots = () => {
  return (
    <>
      <div className="lots" id="lots">
        <div className="container">
          <h2 style={{ color: "black" }}>Lots</h2>
          <span className="line2"></span>
          <div className="content-second">
            <div className="card">
              <img src={require("./images/prize4.png")} alt="dddd" className="small-image"/>
              <p>Un coffret découverte d’une valeur de 69€</p>
            </div>
            <div className="card">
              <img src={require("./images/prize3.png")} alt="user1" className="small-image"/>
              <p>Un coffret découverte d’une valeur de 39€</p>
            </div>
          </div>
          <div className="content">
            <div className="card">
              <img src={require("./images/prize2.png")} alt="user1" className="small-image"/>
              <p>Une boîte de 100g d'un thé signature</p>
            </div>
            <div className="card">
              <img src={require("./images/prize5.png")} alt="user1" className="small-image"/>
              <p>Un infuseur à thé</p>
            </div>
            <div className="card">
              <img src={require("./images/prize1.png")} alt="user1" className="small-image"/>
              <p>Une boîte de 100g d'un thé détox ou d'infusion</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lots;
