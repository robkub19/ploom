import { test, expect } from '@playwright/test';

test.describe('tests for EN', () => {

  test('verifying if it is possible to add a product to the cart', async ({ page }) => {
    await page.goto('https://www.ploom.co.uk/en');
    await page.getByRole('button', { name: 'GOT IT' }).click();
    await page.locator('.ageconfirmation__actionWrapper > div').first().click();
    await page.getByTestId('headerItem-0').click();
    await page.getByRole('link', { name: 'See all the products' }).first().click();
    await page.locator('.aem-productTeaserComponent__link').first().click();
    await page.getByTestId('pdpAddToProduct').click();
    await page.getByTestId('miniCartCheckoutButton').click();

    const cartItems = await page.$$eval('miniCart', items => items.length); expect(cartItems).toBe(1)
  });

  test('verifying if it is possible to remove a product from the cart', async ({ page }) => {
    await page.goto('https://www.ploom.co.uk/en');
    await page.getByRole('button', { name: 'GOT IT' }).click();
    await page.locator('.ageconfirmation__actionWrapper > div').first().click();
    await page.getByTestId('headerItem-0').click();
    await page.getByRole('link', { name: 'See all the products' }).first().click();
    await page.locator('.aem-productTeaserComponent__link').first().click();
    await page.getByTestId('pdpAddToProduct').click();
    await page.getByTestId('miniCartCloseIcon').locator('path').click();
    await page.getByTestId('cartIcon').getByRole('img').click();
    await page.getByTestId('cartRemoveButton').click();
    await page.getByTestId('miniCartCloseIcon').locator('path').click();
    await page.getByTestId('miniCart').click();

    await expect(page.getByTestId('miniCart')).toHaveText('Your Cart0 ItemsThere are no products in your cart at the moment.')
    const cartItems = await page.$$eval('miniCart', items => items.length); expect(cartItems).toBe(0)

  
});

test('verifying if there are any broken links or images on the product page', async ({ page }) => {
  await page.goto('https://www.ploom.co.uk/en');
  await page.getByRole('button', { name: 'GOT IT' }).click();
  await page.locator('.ageconfirmation__actionWrapper > div').first().click();
  await page.getByTestId('headerItem-0').click();
  await page.getByRole('link', { name: 'See all the products' }).first().click();
  await page.locator('.aem-productTeaserComponent__link').first().click();
  await page.getByRole('img', { name: 'Black Ploom X Device', exact: true }).click();
  await page.getByRole('img', { name: 'Opened Black Ploom X Device' }).click();
  await page.getByRole('img', { name: 'Ploom X Devices in various' }).click();
  await page.locator('div:nth-child(2) > .aem-productTeaserComponent__content > .aem-productTeaserComponent__infoContainer > .aem-productTeaserComponent__link').click();
  await page.locator('div:nth-child(3) > .aem-productTeaserComponent__content > .aem-productTeaserComponent__infoContainer > .aem-productTeaserComponent__link').click();

  const links = await page.$$eval('a', anchors => anchors.map(anchor => anchor.href));
  for (const link of links) { const response = await page.goto(link); expect(response?.status).toBeLessThan(400);

  }
});
});