import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./PizzaForm.css";
import * as Yup from "yup";
const PizzaForm = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [toppings, setToppings] = useState([]);
  const [special, setSpecial] = useState("");
  const history = useHistory();

  const PizzaFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "En az 3 karakter girilmelidir.")
      .required(),
  });

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
    setToppings(selectedToppings());
  };

  const handleSpecialChange = (e) => {
    setSpecial(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PizzaFormSchema.validate({ name })
      .then(() => {
        const order = {
          name,
          size,
          toppings,
          special,
        };
        console.log("Sipariş verildi: ", order);
        setName("");
        setSize("");
        setToppings([]);
        setSpecial("");
        history.push("/success");
      })
      .catch((err) => {
        console.log(err.errors);
      });
  };

  return (
    <>
      <div className="container2">
        <div>
          <h1 className="tekno">Teknolojik Yemekler</h1>
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
          <label htmlFor="name-input">İsim Soyisim: </label>
          <input
            type="text"
            id="name-input"
            name="name-input"
            value={name}
            onChange={handleNameChange}
            required
            minLength={3}
          />
          <br />
          <br />
          <label htmlFor="size-dropdown">Boyut: </label>
          <select
            id="size-dropdown"
            value={size}
            name="size-dropdown"
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
          <label htmlFor="toppings-checkboxes">Malzemeler:</label>
          <br />
          <br />
          <div id="toppings-checkboxes">
            <label htmlFor="pepperoni-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="pepperoni"
                //onChange={handleToppingsChange}
              />
              Pepperoni
            </label>
            <label htmlFor="mushrooms-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="mushrooms" //onChange={handleToppingsChange}
              />
              Mantar
            </label>
            <label htmlFor="olives-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="olives" //onChange={handleToppingsChange}
              />
              Zeytin
            </label>
            <label htmlFor="sausage-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="sausage" //onChange={handleToppingsChange}
              />
              Sosis
            </label>
            <label htmlFor="domates-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="domates" //onChange={handleToppingsChange}
              />
              Domates
            </label>
            <label htmlFor="biber-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="biber"
                //onChange={handleToppingsChange}
              />
              Biber
            </label>
          </div>
          <br />
          <br />
          <label htmlFor="special-text">Özel İstekler:</label>
          <input
            type="text"
            id="special-text"
            name="special-text"
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
