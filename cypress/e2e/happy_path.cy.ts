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
    cy.getDataTest("weather-loading").should("not.exist");
    //Checking if the detailed weather info is properly displayed
    cy.getDataTest("weather-detailed-info")
      .should("exist")
      .and("be.visible")
      .scrollIntoView()
      .within(() => {
        cy.get("li").should("have.length", 11);
        cy.get("li")
          .should("contain.text", "Feels like:")
          .and("contain.text", "°C")
          .and("contain.text", "Max:")
          .and("contain.text", "Min:")
          .and("contain.text", "Humidity:")
          .and("contain.text", "Pressure:")
          .and("contain.text", "Wind:")
          .and("contain.text", "Cloudiness:")
          .and("contain.text", "Visibility:")
          .and("contain.text", "Sunrise:")
          .and("contain.text", "Sunset:")
          .and("contain.text", "Night:");
      });
    //Checking if the air pollution info is fetched and properly displayed
    cy.getDataTest("weather-airPollution")
      .should("exist")
      .and("be.visible")
      .within(() => {
        cy.get("h2")
          .scrollIntoView()
          .should("be.visible")
          .and("contain.text", "Air Quality");
        cy.getDataTest("air-icon").should("exist").and("be.visible");
        cy.get("ul")
          .should("exist")
          .and("be.visible")
          .within(() => {
            cy.get("li").should("have.length", 8);
            cy.get("li").each(($li) => {
              cy.wrap($li).within(() => {
                cy.getDataTest("air-key")
                  .invoke("text")
                  .then((text) => {
                    expect(text.trim()).to.be.a("string");
                    const expectedKeys = [
                      "CO",
                      "NO",
                      "NO2",
                      "O3",
                      "SO2",
                      "PM2.5",
                      "PM10",
                      "NH3",
                    ];
                    const regexKeys = new RegExp(expectedKeys.join("|"));
                    expect(text.trim()).to.match(regexKeys);
                  });
              });
            });
            cy.get("li").each(($li) => {
              cy.wrap($li).within(() => {
                cy.getDataTest("air-rate")
                  .invoke("text")
                  .then((text) => {
                    const expectedValues = [
                      "Very Good",
                      "Good",
                      "Moderate",
                      "Poor",
                      "Bad",
                      "Very Bad",
                    ];
                    const regexValues = new RegExp(expectedValues.join("|"));
                    expect(text.trim()).to.match(regexValues);
                  });
              });
            });
            cy.get("li").each(($li) => {
              cy.wrap($li).within(() => {
                cy.getDataTest("air-value")
                  .invoke("text")
                  .then((text) => {
                    expect(parseFloat(text.trim())).to.be.a("number");
                    expect(parseFloat(text.trim())).to.be.gte(0);
                  });
              });
            });
          });
      });
    //Checking if the forecast data is fetched and properly displayed
    cy.getDataTest("forecast-main")
      .scrollIntoView()
      .should("exist")
      .and("be.visible")
      .within(() => {
        cy.get("h2").should("be.visible").and("contain.text", "Forecast");
        cy.getDataTest("forecast-title-icon").should("exist").and("be.visible");
        cy.get("ul")
          .should("exist")
          .and("be.visible")
          .within(() => {
            cy.get("li").should("have.length", 5);
            cy.get("li").each(($li) => {
              cy.wrap($li).within(() => {
                cy.get("h3").should("exist").and("be.visible");
                cy.getDataTest("forecast-date")
                  .should("exist")
                  .and("be.visible");
                cy.getDataTest("forecast-animation")
                  .should("exist")
                  .and("be.visible");
                cy.getDataTest("forecast-temperature")
                  .should("exist")
                  .and("be.visible");
                cy.getDataTest("forecast-description")
                  .should("exist")
                  .and("be.visible");
                cy.getDataTest("forecast-pressure")
                  .should("exist")
                  .and("be.visible");
                cy.getDataTest("forecast-humidity")
                  .should("exist")
                  .and("be.visible");
                cy.getDataTest("forecast-nightTemperature")
                  .should("exist")
                  .and("be.visible");
              });
            });
          });
      });
    cy.getDataTest("forecast-loading").should("not.exist");
  });

  it("Searches location using Navigator API and fetches data", () => {
    cy.getDataTest("location-form").as("locationForm");
    cy.get("@locationForm").within(() => {
      cy.getDataTest("navigator-button").click();
    });
    cy.getDataTest("weather-loading")
      .should("exist")
      .and("be.visible")
      .and("contain.text", "Loading fresh data ...");
    cy.getDataTest("forecast-loading")
      .should("exist")
      .and("be.visible")
      .and("contain.text", "Loading fresh data ...");
    cy.getDataTest("weather-main-info")
      .should("exist")
      .and("be.visible")
      .within(() => {
        cy.get("h2")
          .should("be.visible")
          .and("contain.text", "Browser Location");
      });
    cy.getDataTest("weather-loading").should("not.exist");
    cy.getDataTest("forecast-loading").should("not.exist");
    cy;
  });
});
