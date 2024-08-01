describe("Happy path AI response tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("AI response is fetched correctly", () => {
    cy.getDataTest("location-form").as("locationForm");
    cy.get("@locationForm").find("input").type("New York");
    //List of available locations tests
    cy.getDataTest("location-list")
      .should("exist")
      .and("be.visible")
      .within(() => {
        cy.get("li")
          .should("have.length.gte", 1)
          .and("have.length.at.most", 5)
          .and("contain.text", "New York");
      });
    cy.getDataTest("location-select-0").click();
    cy.getDataTest("weather-main-info")
      .should("exist")
      .and("be.visible")
      .pause();
  });
});
