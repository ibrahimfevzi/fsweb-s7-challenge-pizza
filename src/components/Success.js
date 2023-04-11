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
      <div className="success">
        <div>
          <h1>Teknolojik Yemekler</h1>
        </div>
        <p className="KodAciktirir">
          TEBRİKLER <br /> SİPARİŞİNİZ ALINDI!
          <br />
        </p>
        <button id="aciktim" onClick={handleMain}>
          ANASAYFAYA DÖN
        </button>
      </div>
    </>
  );
};

export default Success;
