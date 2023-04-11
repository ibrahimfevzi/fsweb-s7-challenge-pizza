describe("Form Submission Test", () => {
  it("Submits the form with name and toppings", () => {
    // Form sayafasına git
    cy.visit("http://localhost:3000/order-pizza");

    // İnputa isim gir
    cy.get('input[name="name-input"]').type("ibrahim");

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
