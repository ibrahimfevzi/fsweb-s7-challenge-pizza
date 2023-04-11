describe("Form Gönderme Testi", () => {
  it("Submits the form with name and toppings", () => {
    // Form sayafasına git
    cy.visit("http://localhost:3000/order-pizza");

    // İnputa isim gir
    cy.get('input[name="name-input"]').type("ibrahim");

    // adres gir
    cy.get('input[name="address-input"]').type("Kurtköy Mah. 123 Sok. No: 1");

    // Dropdown menüden "Büyük" seç
    cy.get('select[name="size-dropdown"]').select("Büyük");

    // Pepperoni ve Sosis seç
    cy.get('input[name="toppings"][value="pepperoni"]').check();
    cy.get('input[name="toppings"][value="sausage"]').check();

    // Özel istekler
    cy.get('input[name="special-text"]').type("Baharat tozu istiyorum");

    // Formu gönder
    cy.get('button[type="submit"]').click();
  });
});

describe("Position Absolute Acı Pizza tagi sayfada görünüyor", () => {
  it("should be visible on the page", () => {
    cy.visit("http://localhost:3000/order-pizza");
    cy.contains("h2", "Position Absolute Acı Pizza").should("be.visible");
  });
});

describe("Navbar ve öğeleri sayfada görünüyor", () => {
  it("should have 3 items", () => {
    cy.visit("http://localhost:3000/order-pizza");
    cy.get("nav")
      .find("li")
      .should("have.length", 3);
  });
});

describe("Sipariş butonu", () => {
  it("should be visible on the page", () => {
    cy.visit("http://localhost:3000/order-pizza");
    cy.contains("SİPARİŞ VER").should("be.visible");
  });
});
