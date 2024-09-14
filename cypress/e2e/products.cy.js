describe('products', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
  });
  // Remove .only and implement other test cases!
  it.skip('details is listing all variants', () => {
    // Click in products in side menu
    cy.clickInFirst('a[href="/admin/products/"]');
    // Type in value input to search for specify product
    cy.get('[id="criteria_search_value"]').type('000F office grey jeans');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in details of the remain product
    cy.clickInFirst('*[class^="ui labeled icon button"]');

    // Assert that details page is listing all variants
    cy.get('body')
      .should('contain', '000F_office_grey_jeans-variant-0')
      .and('contain', '000F_office_grey_jeans-variant-1')
      .and('contain', '000F_office_grey_jeans-variant-2')
      .and('contain', '000F_office_grey_jeans-variant-3')
      .and('contain', '000F_office_grey_jeans-variant-4');
  });
  it.skip('changes the name of a product', () => {
    cy.clickInFirst('a[href="/admin/products/"]');
    cy.get('[class="icon pencil"]').first().click();
    cy.get('[id="sylius_product_translations_en_US_name"]').clear().type('000F jeans cinza de escritório');
    cy.get('[id="sylius_save_changes_button"]').click();
    cy.clickInFirst('a[href="/admin/products/"]');

    cy.get('body').should('contain', '000F jeans cinza de escritório');
  });
  it.skip('deletes a product', () => {
    cy.clickInFirst('a[href="/admin/products/"]');
    cy.get('[id="criteria_search_value"]').type('000F_office_grey_jeans');
    cy.get('[class="ui blue labeled icon button"]').click();
    cy.get('[class="icon trash"]').first().scrollIntoView().click({ force: true });

    cy.get('body').should('contain', 'Products have been successfully deleted.');
  });
  it.skip("edits an item's variant", () => {
    cy.clickInFirst('a[href="/admin/products/"]');
    cy.get('[class="ui labeled icon button "]').first().click();
    cy.get('[class="ui labeled icon button edit-variant"]').first().scrollIntoView().click();
    cy.wait(1000);
    cy.get('[id="sylius_product_variant_translations_en_US_name"]').clear().type('SAPATO');
    cy.get('[id="sylius_save_changes_button"]').click();

    cy.get('body').should('contain', 'SAPATO');
  });
  it("deletes an item's variant", () => {
    cy.viewport(1920, 1080)
    cy.clickInFirst('a[href="/admin/products/"]');
    cy.get('[class="ui labeled icon button "]').first().click();
    cy.get('[class="ui labeled icon button edit-variant"]').first().scrollIntoView().click();
    cy.wait(1000);
    cy.get('[id="sylius_save_changes_button"]').click();
    cy.get('[class="icon trash"]').first().scrollIntoView().click({ force: true });
    cy.wait(100)
    cy.get('[id="confirmation-button"]').click()

    cy.get('body').should('contain', 'Product_variants have been successfully deleted.');
  });
  it('test case 3', () => {
    cy.clickInFirst('a[href="/admin/products/"]');
  });

  // Implement the remaining test cases in a similar manner
});
