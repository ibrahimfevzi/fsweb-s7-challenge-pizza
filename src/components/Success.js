import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Success = () => {
  const history = useHistory();

  const handleMain = () => {
    history.push("/");
  };
  return (
    <>
      <div className="container">
        <h1>Teknolojik Yemekler</h1>
        <p className="KodAciktirir">
          TEBRİKLER <br /> SİPARİŞİNİZ ALINDI!
          <button onClick={handleMain}>ANASAYFAYA DÖN</button>
        </p>
      </div>
    </>
  );
};

export default Success;
