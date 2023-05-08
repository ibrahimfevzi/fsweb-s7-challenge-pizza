import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./PizzaForm.css";
import * as Yup from "yup";
import axios from "axios";
const PizzaForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [size, setSize] = useState("");
  const [adet, setAdet] = useState(1);
  const [toppings, setToppings] = useState([]);
  const [special, setSpecial] = useState("");
  const a = 85.5;
  const [total, setTotal] = useState(85.5);
  const [secimler, setSecimler] = useState(0.0);
  const [setErrorMessage] = useState("");

  const history = useHistory();

  const PizzaFormSchema = Yup.object().shape({
    name: Yup.string(),
    address: Yup.string().min(3, "En az 3 karakter girilmelidir."),

    toppings: Yup.array().test(
      "max-selected",
      "En fazla 3 seçenek seçilebilir.",
      (value) => {
        if (value && value.length > 3) {
          return false;
        }
        return true;
      }
    ),
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

  const handleAdetChange = (newAdet) => {
    setAdet(newAdet);

    let secimler = toppings.length * newAdet * 5;
    setSecimler(secimler);

    let total = (a + toppings.length * 5) * newAdet;
    setTotal(total);
  };

  const handleToppingsChange = (e) => {
    const selectedToppings = Array.from(
      document.querySelectorAll('input[name="toppings"]:checked')
    ).map((input) => input.value);
    setToppings(selectedToppings);

    let secimler = selectedToppings.length * adet * 5;
    setSecimler(secimler);
  };

  useEffect(() => {
    let newTotal = (a + toppings.length * 5) * adet;
    setTotal(newTotal);
  }, [adet, toppings]);

  function handleSpecialChange(e) {
    setSpecial(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    PizzaFormSchema.validate({ name, address, toppings })
      .then(() => {
        const order = {
          name,
          address,
          size,
          toppings,
          special,
          Fiyat: total,
          adet,
        };

        axios
          .post("https://reqres.in/api/users", order)
          .then((response) => {
            console.log("Sipariş başarıyla gönderildi:", response);
            setName("");
            setAddress("");
            setSize("");
            setToppings([]);
            setSpecial("");
            history.push("/success");
          })
          .catch((error) => {
            console.error("Sipariş gönderilirken hata oluştu:", error);
          });
      })
      .catch((err) => {
        console.log(err.errors);
        if (err.errors.name) {
          setErrorMessage("Lütfen bir isim giriniz.");
        } else if (err.errors.address) {
          setErrorMessage("Lütfen bir adres giriniz.");
        }
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
                  <Link to="/order-pizza" style={{ fontWeight: "bold" }}>
                    Sipariş Oluştur
                  </Link>
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
            <b>
              Ek Malzemeler<span className="required">*</span>
            </b>
          </label>{" "}
          <p>En Fazla 3 malzeme seçebilirsiniz. 5₺</p>
          <br />
          <div id="toppings-checkboxes">
            <label htmlFor="pepperoni-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="pepperoni"
                onChange={handleToppingsChange}
              />
              Pepperoni
            </label>
            <label htmlFor="mushrooms-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="mushrooms"
                onChange={handleToppingsChange}
              />
              Mantar
            </label>
            <label htmlFor="olives-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="olives"
                onChange={handleToppingsChange}
              />
              Zeytin
            </label>
            <label htmlFor="sausage-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="sausage"
                onChange={handleToppingsChange}
              />
              Sosis
            </label>
            <label htmlFor="domates-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="domates"
                onChange={handleToppingsChange}
              />
              Domates
            </label>
            <label htmlFor="biber-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="biber"
                onChange={handleToppingsChange}
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
          <div className="adet-ve-siparis">
            <div className="adet-bolumu">
              <button
                className="minus-button"
                type="button"
                onClick={() => {
                  if (adet > 1) {
                    handleAdetChange(adet - 1);
                  }
                }}
              >
                -
              </button>

              <div className="adet-kutusu">
                <span className="adet-sayisi">{adet}</span>
              </div>

              <button
                className="plus-button"
                type="button"
                onClick={() => handleAdetChange(adet + 1)}
              >
                +
              </button>
            </div>

            <div className="siparis-bolumu">
              <div>Sipariş Toplamı</div>
              <div className="secimler">
                {" "}
                <span>Seçimler:</span> <span>{secimler} ₺</span>
              </div>
              <div className="secimler" style={{ color: " #ce2829" }}>
                <span>Toplam:</span> <span>{total} ₺</span>
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
