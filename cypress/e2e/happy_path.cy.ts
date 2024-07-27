describe("Happy path tests", () => {
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
    cy.getDataTest("theme-switch").should("be.visible");
    cy.get("html").then(($html) => {
      if ($html.hasClass("dark")) {
        cy.getDataTest("theme-switch").click().as("themeSwitch");
        cy.get("html").should("not.have.class", "dark");
        cy.get("@themeSwitch")
          .find("svg")
          .should("have.attr", "data-test", "moon-icon");
        cy.get("@themeSwitch").click();
        cy.get("html").should("have.class", "dark");
        cy.get("@themeSwitch")
          .find("svg")
          .should("have.attr", "data-test", "sun-icon");
      } else {
        cy.getDataTest("theme-switch").click().as("themeSwitch");
        cy.get("html").should("have.class", "dark");
        cy.get("@themeSwitch")
          .find("svg")
          .should("have.attr", "data-test", "sun-icon");
        cy.get("@themeSwitch").click();
        cy.get("html").should("not.have.class", "dark");
        cy.get("@themeSwitch")
          .find("svg")
          .should("have.attr", "data-test", "moon-icon");
      }
    });
  });

  it("Form input searches for a location and fetches data after select", () => {
    //Form and loader functionality tests
    cy.getDataTest("location-form").as("locationForm");
    cy.get("@locationForm").within(() => {
      cy.getDataTest("loader").should("not.exist");
    });
    cy.get("@locationForm").find("input").type("Zabol");
    cy.get("@locationForm").within(() => {
      cy.getDataTest("loader").should("exist").and("be.visible");
    });
    //List of available locations tests
    cy.getDataTest("location-list")
      .should("exist")
      .and("be.visible")
      .within(() => {
        cy.get("li")
          .should("have.length.gte", 1)
          .and("have.length.at.most", 5)
          .and("contain.text", "Zabol");
      });
    cy.get("@locationForm").within(() => {
      cy.getDataTest("loader").should("not.exist");
    });
    //Selecting a location and fetching response
    cy.getDataTest("location-select-0").click();
    cy.getDataTest("location-list").should("not.exist");
    cy.getDataTest("weather-loading")
      .should("exist")
      .and("be.visible")
      .and("contain.text", "Loading fresh data ...");
    cy.getDataTest("forecast-loading")
      .should("exist")
      .and("be.visible")
      .and("contain.text", "Loading fresh data ...");
    //Checking if the data is fetched and displayed properly
    cy.getDataTest("weather-main-info")
      .should("exist")
      .and("be.visible")
      .within(() => {
        //Checking if the location name is displayed and the current time is updated
        cy.get("h2").should("be.visible").and("contain.text", "Zabol");
        let previousTime: string;
        const checkIfTimeIsUpdating = () => {
          cy.getDataTest("clock")
            .should("exist")
            .and("be.visible")
            .invoke("text")
            .then((text) => {
              const currentTime = text.trim();
              expect(currentTime).to.not.equal(previousTime);
              previousTime = currentTime;
            });
        };
        for (let i = 0; i < 5; i++) {
          cy.wait(1000);
          checkIfTimeIsUpdating();
        }
        //Checking if the main temperature and description are displayed
        cy.getDataTest("main-temperature")
          .should("exist")
          .and("be.visible")
          .and("contain.text", "°C");
        cy.getDataTest("main-description").should("exist").and("be.visible");
      });
  });
});
