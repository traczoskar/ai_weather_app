describe("Happy path AI response tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("AI response is fetched correctly", () => {
    // Checking if the main page is loaded and fetches the weather data
    cy.getDataTest("location-form").as("locationForm");
    cy.get("@locationForm").find("input").type("New York");
    cy.getDataTest("location-list")
      .should("exist")
      .and("be.visible")
      .within(() => {
        cy.get("li")
          .should("have.length.gte", 1)
          .and("have.length.at.most", 5)
          .and("contain.text", "New York");
      });
    cy.getDataTest("ai-button").should("not.exist");
    cy.getDataTest("location-select-0").click();
    cy.getDataTest("weather-main-info").should("exist").and("be.visible");
    // Checking if the AI response is fetched correctly and loading screen is shown
    cy.getDataTest("ai-button").should("exist").wait(1000).click();
    cy.getDataTest("ai-waiting")
      .scrollIntoView()
      .should("exist")
      .and("be.visible");
    cy.get(`[data-test="ai-collapsed"`, { timeout: 20000 })
      .scrollIntoView()
      .should("exist")
      .and("be.visible");
    cy.getDataTest("ai-waiting").should("not.exist");
    cy.getDataTest("ai-button").should("not.exist");
    // Checking if the AI response is displayed correctly in collapsed view
    cy.getDataTest("ai-collapsed").within(() => {
      cy.get("h2")
        .should("contain.text", "AI advices for today at New York County")
        .find("svg")
        .should("exist");
    });
    cy.getDataTest("ai-collapsed-general")
      .should("exist")
      .and("be.visible")
      .within(() => {
        cy.get("h4")
          .should("contain.text", "Summary from AI:")
          .and("contain.text", "Mood:");
      });
    cy.getDataTest("ai-popover")
      .should("exist")
      .and("be.visible")
      .and("contain.text", "Click the button to expand AI advice.");
    cy.getDataTest("ai-collapsed").click();
    cy.getDataTest("ai-popover").should("not.exist");
    // Checking if the AI response is displayed correctly in expanded view
    cy.getDataTest("ai-expand-button").click();
    cy.getDataTest("ai-expanded")
      .should("exist")
      .and("be.visible")
      .within(() => {
        cy.getDataTest("ai-expanded-general")
          .should("exist")
          .and("be.visible")
          .within(() => {
            cy.get("h4")
              .should("contain.text", "Summary from AI:")
              .and("contain.text", "Mood:");
          });
        cy.getDataTest("ai-expanded-list")
          .scrollIntoView()
          .should("exist")
          .and("be.visible")
          .within(() => {
            cy.get("div")
              .should("have.length.gte", 8)
              .each((div) => {
                cy.wrap(div)
                  .find("h4")
                  .should("exist")
                  .invoke("text")
                  .then((text) => {
                    const expectedCategories = [
                      "Indoor Activities",
                      "Outdoor Activities",
                      "Health Tips",
                      "Attire",
                      "Food Suggestions",
                      "Places to Visit",
                      "Music",
                      "Movies",
                    ];
                    const regexKeys = new RegExp(expectedCategories.join("|"));
                    expect(text.trim()).to.match(regexKeys);
                  });
              });
          });
      });
  });
});
