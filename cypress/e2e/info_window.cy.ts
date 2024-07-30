import { INFO_DATA } from "../../src/features/info/infoData";

describe("Info window tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should open info window when button clicked", () => {
    cy.getDataTest("info-button").click();
    cy.getDataTest("info-window")
      .should("exist")
      .and("be.visible")
      .within(() => {
        cy.get("h2")
          .should("exist")
          .and("contain.text", INFO_DATA.title)
          .and("contain.text", INFO_DATA.subTitle);
      });
  });
});
