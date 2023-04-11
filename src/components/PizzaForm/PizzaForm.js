import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./PizzaForm.css";
import * as Yup from "yup";
const PizzaForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [size, setSize] = useState("");
  const [adet, setAdet] = useState(1);
  const [toppings, setToppings] = useState([]);
  const [special, setSpecial] = useState("");
  const history = useHistory();

  const PizzaFormSchema = Yup.object().shape({
    name: Yup.string(),
    address: Yup.string()
      .min(3, "En az 3 karakter girilmelidir.")
      .required(),
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
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
    PizzaFormSchema.validate({ name, address })
      .then(() => {
        const order = {
          name,
          address,
          size,
          toppings,
          special,
        };
        console.log("Sipariş verildi: ", order);
        setName("");
        setAddress("");
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
        <div className="header">
          <div>
            <div>
              <h2 className="tekno">Teknolojik Yemekler</h2>
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
          </div>
        </div>
      </div>
      <div className="siparis-body">
        <br />
        <h2>Position Absolute Acı Pizza</h2>
        <br />
        <h3>85,50 ₺</h3>
        <p>
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
          pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
          diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
          ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak,
          düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli
          lezzetli bir yemektir.. Küçük bir pizzaya bazen pizzetta denir.
        </p>

        <br />

        <form id="pizza-form" onSubmit={handleSubmit}>
          <label htmlFor="name-input">
            <b>
              İsim Soyisim <span className="required">*</span>
            </b>{" "}
          </label>
          <input
            type="text"
            id="name-input"
            name="name-input"
            value={name}
            onChange={handleNameChange}
            required
            minLength={3}
          />
          <label htmlFor="address-input">
            <b>
              Adres <span className="required">*</span>
            </b>{" "}
          </label>
          <input
            type="text"
            id="address-input"
            name="address-input"
            value={address}
            onChange={handleAddressChange}
            required
            minLength={3}
          />
          <br />
          <br />
          <label htmlFor="size-dropdown">
            Boyut Seç<span className="required">*</span>{" "}
          </label>
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
          <label htmlFor="toppings-checkboxes">
            <b>Ek Malzemeler:</b>
          </label>{" "}
          <p>En Fazla 3 malzeme seçebilirsiniz. 5₺</p>
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
          <label htmlFor="special-text">Sipariş Notu</label>
          <br />
          <input
            type="text"
            id="special-text"
            name="special-text"
            value={special}
            onChange={handleSpecialChange}
            placeholder="Siparişine eklemek istediğin bir not var mı ?"
          />
          <br />
          <br />
          <div className="cizgi"></div>
          <br />
          <div class="adet-ve-siparis">
            <div class="adet-bolumu">
              <button
                class="minus-button"
                type="button"
                onClick={() => {
                  if (adet > 1) {
                    setAdet(adet - 1);
                  }
                }}
              >
                -
              </button>
              <div class="adet-kutusu">
                <span class="adet-sayisi">{adet}</span>
              </div>
              <button
                class="plus-button"
                type="button"
                onClick={() => setAdet(adet + 1)}
              >
                +
              </button>
            </div>

            <div class="siparis-bolumu">
              <div>Sipariş Toplamı</div>
              <div className="secimler">
                {" "}
                <span>Seçimler:</span> <span>85,50 ₺</span>
              </div>
              <div className="secimler" style={{ color: "red" }}>
                <span>Toplam:</span> <span>85,50 ₺</span>
              </div>
              <button id="order-button" type="submit">
                SİPARİŞ VER
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="footer"></div>
    </>
  );
};

export default PizzaForm;
