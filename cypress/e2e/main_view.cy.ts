describe("Main view tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Contains h1 tag and app logo in the header", () => {
    cy.getDataTest("app-header")
      .find("h1")
      .should("have.text", "WeatherWise.ai");
    cy.getDataTest("app-header")
      .find("svg")
      .should("have.attr", "title", "App Logo")
      .and("be.visible");
  });

  it("Contains theme switch and it works properly", () => {
    cy.getDataTest("theme-switch").should("be.visible").as("themeSwitch");
    cy.get("@themeSwitch").click();
    cy.get("html").should("have.class", "dark");
    cy.get("@themeSwitch")
      .find("svg")
      .should("have.attr", "data-test", "sun-icon");
    cy.get("@themeSwitch").click();
    cy.get("@themeSwitch")
      .find("svg")
      .should("have.attr", "data-test", "moon-icon");
    cy.get("html").should("not.have.class", "dark");
  });
});
