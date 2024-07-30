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
        //Info Header test
        cy.get("h2")
          .should("exist")
          .and("contain.text", INFO_DATA.title)
          .and("contain.text", INFO_DATA.subTitle);
        cy.getDataTest("info-description")
          .should("exist")
          .and("contain.text", INFO_DATA.description);
        //Key Features test
        cy.getDataTest("info-features-header")
          .should("exist")
          .and("contain.text", "Key Features:");
        cy.getDataTest("info-features")
          .scrollIntoView()
          .should("exist")
          .within(() => {
            cy.get("li").should("have.length", INFO_DATA.keyFeatures.length);
            cy.get("li").each((li, index) => {
              expect(li).to.contain.text(INFO_DATA.keyFeatures[index].feature);
              expect(li).to.contain.text(INFO_DATA.keyFeatures[index].text);
            });
          });
        //Built with test
        cy.getDataTest("info-tools-header")
          .should("exist")
          .and("contain.text", "Built with:");
        cy.getDataTest("info-tools")
          .scrollIntoView()
          .should("exist")
          .within(() => {
            cy.get("li").should("have.length", INFO_DATA.builtWith.length);
            cy.get("li").each((li, index) => {
              expect(li).to.contain.text(INFO_DATA.builtWith[index]);
            });
          });
      });
  });
});
