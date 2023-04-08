import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PizzaForm.css";
const PizzaForm = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [toppings, setToppings] = useState([]);
  const [special, setSpecial] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleToppingsChange = (e) => {
    const selectedToppings = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setToppings(selectedToppings);
  };

  const handleSpecialChange = (e) => {
    setSpecial(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      name,
      size,
      toppings,
      special,
    };
    // burada veritabanına siparişi kaydetmek için bir API çağrısı yapılacak
    console.log("Sipariş verildi: ", order);
    setName("");
    setSize("");
    setToppings([]);
    setSpecial("");
  };

  return (
    <>
      <div className="container">
        <div>
          <h1>Teknolojik Yemekler</h1>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/">Anasayfa</Link>
            </li>
            <li>
              <Link to="/secenekler">Seçenekler</Link>
            </li>
            <li>
              <Link to="/order-pizza">Sipariş Oluştur</Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2>Position Absolute Acı Pizza</h2>
          <h3>85,50 ₺</h3>
          <p>
            Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
            pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
            diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
            ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
            yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan
            kökenli lezzetli bir yemektir.. Küçük bir pizzaya bazen pizzetta
            denir.
          </p>
          <p>
            İçindekiler: Domates sos, mozzarella peyniri, domates, biber,
            mantar, zeytin, sosis, pepperoni
          </p>
        </div>
        <form id="pizza-form" onSubmit={handleSubmit}>
          <label htmlFor="name-input">İsim:</label>
          <input
            type="text"
            id="name-input"
            value={name}
            onChange={handleNameChange}
            required
          />

          <label htmlFor="size-dropdown">Boyut:</label>
          <select
            id="size-dropdown"
            value={size}
            onChange={handleSizeChange}
            required
          >
            <option value="">--Boyut Seç--</option>
            <option value="small">Küçük</option>
            <option value="medium">Orta</option>
            <option value="large">Büyük</option>
          </select>
          <br />
          <br />
          <label htmlFor="toppings-checkboxes">Çıkarılacak Malzemeler:</label>
          <div id="toppings-checkboxes">
            <label htmlFor="pepperoni-checkbox">
              <input type="checkbox" name="toppings1" value="pepperoni" />
              Pepperoni
            </label>
            <label htmlFor="mushrooms-checkbox">
              <input type="checkbox" name="toppings2" value="mushrooms" />
              Mantar
            </label>
            <label htmlFor="olives-checkbox">
              <input type="checkbox" name="toppings3" value="olives" />
              Zeytin
            </label>
            <label htmlFor="sausage-checkbox">
              <input type="checkbox" name="toppings4" value="sausage" />
              Sosis
            </label>
            <label htmlFor="domates-checkbox">
              <input type="checkbox" name="toppings5" value="domates" />
              Domates
            </label>
            <label htmlFor="biber-checkbox">
              <input type="checkbox" name="toppings6" value="biber" />
              Biber
            </label>
          </div>
          <br />
          <br />
          <label htmlFor="special-text">Özel İstekler:</label>
          <input
            type="text"
            id="special-text"
            value={special}
            onChange={handleSpecialChange}
          />
          <br />
          <br />
          <button id="order-button" type="submit">
            Sipariş Ver
          </button>
        </form>
      </div>
    </>
  );
};

export default PizzaForm;
