const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('products', () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    driver.manage().deleteAllCookies();
    await driver.get('http://localhost:9990/admin');
    // await driver.get('http://150.165.75.99:9990/admin');
    await driver.findElement(By.id('_username')).sendKeys('sylius');
    await driver.findElement(By.id('_password')).sendKeys('sylius');
    await driver.findElement(By.css('.primary')).click();
    // await driver.sleep(1000);
  });

  // Remove .only and implement others test cases!
  it.skip('details is listing all variants', async () => {
    // Click in products in side menu
    await driver.findElement(By.css('a[href="/admin/products/"]')).click();

    // Type in value input to search for specify product
    await driver.findElement(By.id('criteria_search_value')).sendKeys('000F office grey jeans');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in details of the remaining product
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[0].click();

    // Assert that details page is listing all variants
    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('000F_office_grey_jeans-variant-0'));
    assert(bodyText.includes('000F_office_grey_jeans-variant-1'));
    assert(bodyText.includes('000F_office_grey_jeans-variant-2'));
    assert(bodyText.includes('000F_office_grey_jeans-variant-3'));
    assert(bodyText.includes('000F_office_grey_jeans-variant-4'));
  });

  it('changes the name of a product', async () => {
    await driver.findElement(By.css('a[href="/admin/products/"]')).click();
    await driver.findElement(By.css('[class="icon pencil"]')).click();
    const nameField = await driver.findElement(By.id('sylius_product_translations_en_US_name'));
    await nameField.clear();
    await nameField.sendKeys('000F jeans cinza de escritório');
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('000F jeans cinza de escritório'));
  });

  it('deletes a product', async () => {
    await driver.findElement(By.css('a[href="/admin/products/"]')).click();
    await driver.findElement(By.id('criteria_search_value')).sendKeys('000F_office_grey_jeans');
    await driver.findElement(By.css('.ui.blue.labeled.icon.button')).click();
    const trashIcon = await driver.findElement(By.css('.icon.trash'));
    await driver.executeScript('arguments[0].scrollIntoView(true);', trashIcon);
    await driver.executeScript('arguments[0].click();', trashIcon);
    await driver.findElement(By.id('confirmation-button')).click();
    await driver.sleep(1000);

    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('Products have been successfully deleted.'));
  });

  it("edits an item's variant", async () => {
    await driver.findElement(By.css('a[href="/admin/products/"]')).click();
    await driver.findElement(By.css('.ui.labeled.icon.button')).click();
    const editVariantButton = await driver.findElement(By.css('.ui.labeled.icon.button.edit-variant'));
    await driver.executeScript('arguments[0].scrollIntoView(true);', editVariantButton);
    await editVariantButton.click();
    await driver.sleep(1000);
    const variantNameField = await driver.findElement(By.id('sylius_product_variant_translations_en_US_name'));
    await variantNameField.clear();
    await variantNameField.sendKeys('SAPATO');
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('SAPATO'));
  });

  it("deletes an item's variant", async () => {
    await driver.findElement(By.css('a[href="/admin/products/"]')).click();
    await driver.findElement(By.css('.ui.labeled.icon.button')).click();
    const trashIcon = await driver.findElement(By.css('.icon.trash'));
    await driver.executeScript('arguments[0].scrollIntoView(true);', trashIcon);
    await driver.executeScript('arguments[0].click();', trashIcon);
    await driver.findElement(By.id('confirmation-button')).click();
    await driver.sleep(1000);

    await driver.wait(until.elementLocated(By.css('body')), 5000);
    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('successfully deleted.'));
  });

  it("generates an item's variant", async () => {
    await driver.findElement(By.css('a[href="/admin/products/"]')).click();
    await driver.findElement(By.css('.cubes.icon')).click();
    await driver.findElement(By.css('.random.icon')).click();
    await driver.findElement(By.css('.ui.labeled.icon.primary.button')).click();

    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('Product variants have been successfully generated.'));
  });

  it('creates a simple product', async () => {
    await driver.findElement(By.css('a[href="/admin/products/"]')).click();
    await driver.sleep(10000);
    await driver.findElement(By.xpath("//*[contains(text(), 'Create')]")).click();

    await driver.findElement(By.xpath("//*[contains(text(), 'Simple product')]")).click();
    await driver.findElement(By.id('sylius_product_code')).sendKeys('123');
    await driver.findElement(By.id('sylius_product_translations_en_US_name')).sendKeys('product name');
    await driver.findElement(By.id('sylius_product_translations_en_US_slug')).sendKeys('product-slug');
    await driver.findElement(By.xpath("//*[contains(text(), 'Create')]")).click();

    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('Product has been successfully created.'));
  });

  it('changes the taxonomy', async () => {
    await driver.findElement(By.css('a[href="/admin/products/"]')).click();
    await driver.sleep(12000);

    await driver.findElement(By.css('[class="icon pencil"]')).click();
    await driver.findElement(By.css('[data-tab="taxonomy"]')).click();

    await driver.sleep(1000);
    await driver.findElement(By.css('[data-value="t_shirts"]')).click();
    await driver.findElement(By.xpath("//*[contains(text(), 'Save changes')]")).click();

    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('Product has been successfully updated.'));
  });

  it('adds an attribute', async () => {
    await driver.findElement(By.css('a[href="/admin/products/"]')).click();
    await driver.sleep(12000);

    await driver.findElement(By.css('[class="icon pencil"]')).click();
    await driver.findElement(By.css('[data-tab="attributes"]')).click();
    await driver.sleep(1000);
    const element = await driver.findElement(By.css('[class="ui fluid search dropdown selection multiple"]')).click();
    await driver.executeScript("arguments[0].scrollIntoView(true);", element);
    await driver.findElement(By.xpath("//*[contains(text(), 'T-shirt brand')]")).click();
    await driver.findElement(By.xpath("//*[contains(text(), 'Save changes')]")).click();

    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('Product has been successfully updated.'));
  });

  it('adds an association', async () => {
    await driver.findElement(By.css('a[href="/admin/products/"]')).click();
    await driver.sleep(10000);

    await driver.findElement(By.xpath("//*[contains(text(), 'Edit')]")).click();
    await driver.findElement(By.css('[data-tab="associations"]')).click();
    await driver.findElement(By.css('.product-select.ui.fluid.multiple.search.selection.dropdown')).click();
    await driver.findElement(By.css('.item.selected')).click();
    await driver.findElement(By.xpath("//*[contains(text(), 'Save changes')]")).click();

    const bodyText = await driver.findElement(By.css('body')).getText();
    assert(bodyText.includes('Product has been successfully updated.'));
  });
});
