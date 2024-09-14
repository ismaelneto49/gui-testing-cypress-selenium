describe('products', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
  });
  // Remove .only and implement other test cases!
  it('details is listing all variants', () => {
    // Click in products in side menu
    cy.clickInFirst('a[href="/admin/products/"]');
    // Type in value input to search for specify product
    cy.get('[id="criteria_search_value"]').type('000F office grey jeans');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in details of the remain product
    cy.clickInFirst('*[class^="ui labeled icon button "]');

    // Assert that details page is listing all variants
    cy.get('body')
      .should('contain', '000F_office_grey_jeans-variant-0')
      .and('contain', '000F_office_grey_jeans-variant-1')
      .and('contain', '000F_office_grey_jeans-variant-2')
      .and('contain', '000F_office_grey_jeans-variant-3')
      .and('contain', '000F_office_grey_jeans-variant-4');
  });
  it.only('changes the name of a product', () => {
    cy.clickInFirst('a[href="/admin/products/"]');
    cy.get('tbody > .item:nth-child(1) > td > .ui > .ui:nth-child(2)').click();
    cy.get('.ui > div > .ui > .required > #sylius_product_translations_en_US_name').clear().type('000F jeans cinza de escritório');
    cy.get('.admin-layout__content > .ui > .ui > .ui > #sylius_save_changes_button').click();
    cy.get('.admin-layout__content > .ui > .column > .ui > .section:nth-child(3)').click();

    cy.get('body').should('contain', '000F jeans cinza de escritório');
  });
  it('test case 3', () => {
    cy.clickInFirst('a[href="/admin/products/"]');
  });
  it('test case 3', () => {
    cy.clickInFirst('a[href="/admin/products/"]');
  });
  it('test case 3', () => {
    cy.clickInFirst('a[href="/admin/products/"]');
  });
  it('test case 3', () => {
    cy.clickInFirst('a[href="/admin/products/"]');
  });

  // Implement the remaining test cases in a similar manner
});
