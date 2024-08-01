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
  });
});
