

import { test, expect } from '@playwright/test';

test.describe('tests for PL', () => {

  test('verifying if it is possible to add a product to the cart', async ({ page }) => {
    await page.goto('https://www.ploom.pl/pl');
    await page.getByRole('button', { name: 'Akceptuj wszystkie pliki' }).click();
    await page.locator('.ageconfirmation__actionWrapper > div').first().click();
    await page.getByTestId('headerItem-1').click();
    await page.getByRole('link', { name: 'Zobacz wszystkie produkty' }).nth(1).click();
    await page.locator('.aem-productTeaserComponent__link').first().click();
    await page.getByTestId('pdpAddToProduct').click();
    await page.getByTestId('miniCartCheckoutButton').click();

    await expect(page.getByTestId('miniCart')).toHaveText('1Twój koszyk1 produktSuma częściowa 69,00 złPloom X Advanced Rose Shimmer69,00 złOsiągnąłeś maksymalną ilość zamówienia dla tego produktu (Infinity)Usuń produktRealizacja zamówienia');
    const cartItems = await page.$$eval('miniCart', items => items.length); expect(cartItems).toBe(1)

  });


  test('verifying if it is possible to remove a product from the cart', async ({ page }) => {
    await page.goto('https://www.ploom.pl/pl');
    await page.getByRole('button', { name: 'Akceptuj wszystkie pliki' }).click();
    await page.locator('.ageconfirmation__actionWrapper > div').first().click();
    await page.getByTestId('headerItem-1').click();
    await page.getByRole('link', { name: 'Zobacz wszystkie produkty' }).nth(1).click();
    await page.locator('.aem-productTeaserComponent__link').first().click();
    await page.getByTestId('pdpAddToProduct').click();
    await page.getByTestId('miniCartCloseIcon').locator('path').click();
    await page.getByTestId('cartIcon').getByRole('img').click();
    await page.getByTestId('cartRemoveButton').click();
    await page.getByTestId('miniCartCloseIcon').locator('path').click();
    await page.getByTestId('miniCart').click();

    await expect(page.getByTestId('miniCart')).toHaveText('Twój koszykIlość produktów: 0 W tej chwili w Twoim koszyku nie ma żadnych produktów.')
    const cartItems = await page.$$eval('miniCart', items => items.length); expect(cartItems).toBe(0)

});


test('verifying if there are any broken links or images on the product page', async ({ page }) => {
  await page.goto('https://www.ploom.pl/pl');
  await page.getByRole('button', { name: 'Akceptuj wszystkie pliki' }).click();
  await page.locator('.ageconfirmation__actionWrapper > div').first().click();
  await page.getByTestId('headerItem-1').click();
  await page.getByRole('link', { name: 'Zobacz wszystkie produkty' }).nth(1).click();
  await page.locator('.aem-productTeaserComponent__link').first().click();
  await page.getByRole('img', { name: 'Solidna Technologia - płynny' }).click();
  await page.getByRole('img', { name: 'Urządzenie Ploom X Advanced' }).click();
  await page.getByRole('img', { name: 'Ploom X Advanced - Długie ż' }).click();
  await page.getByRole('img', { name: 'Ploom X Advanced - innowacyjna Technologia HeatFlow' }).click();
  await page.locator('div:nth-child(2) > .aem-productTeaserComponent__content > .aem-productTeaserComponent__infoContainer > .aem-productTeaserComponent__link').click();
  await page.locator('div:nth-child(2) > .aem-productTeaserComponent__content > .aem-productTeaserComponent__infoContainer > .aem-productTeaserComponent__link').click();

  const links = await page.$$eval('a', anchors => anchors.map(anchor => anchor.href));
  for (const link of links) { const response = await page.goto(link); expect(response?.status).toBeLessThan(400);

  }
});
});