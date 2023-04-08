import React from "react";
import { useHistory } from "react-router-dom";
import "./Anasayfa.css";

const Anasayfa = () => {
  const history = useHistory();

  const handlePizzaOrder = () => {
    history.push("/order-pizza");
  };

  return (
    <div className="container">
      <h1>Teknolojik Yemekler</h1>
      <p>
        KOD ACIKTIRIR <br /> PİZZA, DOYURUR
      </p>
      <button onClick={handlePizzaOrder}>ACIKTIM</button>
      <img src="/banner.png" alt="Pizza" />
    </div>
  );
};

export default Anasayfa;
