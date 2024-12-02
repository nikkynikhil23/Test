describe('button', () => {
  it('Assertions for Each Product', () => {
    cy.viewport(1300, 700);
    cy.visit("www.amphora.net");
    cy.wait(2000);
    cy.get('[id="menu-item-32"]').wait(2000).realHover();
    const products = [
      { selector: '/product/symphony/', expectedPath: '/symphony' },
      { selector: '/product/alchemy/', expectedPath: '/alchemy' },
      { selector: '/product/trade-confirmations-manager/', expectedPath: '/trade' },
      { selector: '/product/freight-manager/', expectedPath: '/freight' },
      { selector: '/product/claims-manager/', expectedPath: '/claims' },
      { selector: '/product/symphony-credit/', expectedPath: '/symphony-credit' },
    ];

    products.forEach(({ selector, expectedPath }) => {
      cy.get(`a[href="https://amphora.net${selector}"]`)
        .first() // Target the first matching link
        .click({ force: true }); // Force-click in case of hover menus

      // Verify that the URL contains the expected path
      cy.url().should('include', expectedPath);
    });
  });
  it('SignUp for newsletter', () => {
    // Set viewport for consistent screen dimensions
    cy.viewport(1300, 700);

    // Visit the website
    cy.visit('https://www.amphora.net');

    // Hover over the 'Resources' menu and click on the newsletter sign-up link
    cy.get('#menu-main-menu li:contains("Resources")').realHover();
    cy.get('a[href="https://amphora.net/newsletter-sign-up"]').first().click();

    // Fill out the form
    cy.get('[type="email"]').type('nikhil.koyallakaru23@gmail.com');
    cy.get('[name="contact[first_name]"]').type('Nikhil');
    cy.get('[name="contact[last_name]"]').type('Kumar');

    // Submit the form
    cy.get('[type="email"]').realMouseUp();
    cy.get('[type="submit"]').click();

    // Assert that the success message is displayed
    cy.get('#newsletter-sign-up .close').click(); // Close confirmation modal
    cy.contains('Thank you for signing up').should('be.visible');
  });
});