declare namespace Cypress {
  interface Chainable<Subject> {
    getDataTest(dataTestName: string): Chainable<JQuery<HTMLElement>>;
  }
}
