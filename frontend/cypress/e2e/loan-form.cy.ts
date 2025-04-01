describe("Loan Form", () => {
  beforeEach(() => {
    cy.visit("/form");
  });

  it("should validate required fields", () => {
    cy.get("button[type='submit']").click();

    cy.contains("Please place your first name").should("be.visible");
    cy.contains("Please place your last name").should("be.visible");
    cy.contains("Please select employment status").should("be.visible");
    cy.contains("Please select your purpose for loan application").should(
      "be.visible"
    );
  });

  it("should allow entering values and see lenders after hitting submit", () => {
    cy.get("input[name='firstName']").type("Steven");
    cy.get("input[name='lastName']").type("Tan");
    cy.get("input[name='emailAddress']").type("test@email.com");

    cy.get("select[name='employmentStatus']").select("Employed");
    cy.get("input[name='employerName']").should("be.visible").type("Driva");

    cy.get("select[name='loanPurpose']").select("Vehicle");
    cy.get("input[name='loanAmount']").type("1000000");
    cy.get("input[name='loanDeposit']").type("500000");
    cy.get("input[name='loanTerm']").type("7");

    cy.get("button[type='submit']").click();

    cy.contains("Driva 1").should("be.visible");
    cy.contains("Monthly repayment").should("be.visible");
    cy.contains("Interest rate").should("be.visible");
    cy.contains("Processing fees").should("be.visible");
  });
});
