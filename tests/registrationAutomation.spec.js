// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { generateRandomNumber } from "../utils/utils.js";

test('Registration form automation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill(faker.name.fullName());
  await page.locator('[data-qa="signup-email"]').fill(faker.internet.email());
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.getByRole('radio', { name: 'Mrs.' }).click();
  await page.getByRole('textbox',{name: 'Password *'}).fill(faker.internet.password());
  await page.evaluate(
    () => {
 window.scrollBy(0, 500);
 }
);
  await page.locator("#days").selectOption({ value: '12' });
  await page.locator('#months').selectOption('12');
  await page.locator('#years').selectOption('2002');
  await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
  await page.getByRole('textbox', { name: 'First name *' }).fill(faker.name.firstName());
  await page.getByRole('textbox', { name: 'Last name *' }).fill(faker.name.lastName());
  await page.getByRole('textbox', { name: 'Address * (Street address, P.O. Box, Company name, etc.)' }).fill(faker.location.streetAddress());
  await page.getByRole('textbox', { name: 'Address 2' }).fill(faker.location.secondaryAddress());
  await page.getByLabel('Country *').selectOption('Australia');
  await page.getByRole('textbox', { name: 'State *' }).fill(faker.location.state());
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill(faker.location.city());
  await page.locator("#zipcode").fill(faker.location.zipCode());
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill( "017" + generateRandomNumber(1000000,9999999) );
  await page.getByRole('button', { name: 'Create Account' }).click();
  let confirmMsgTxt = await page.locator("#form").textContent();
    expect(confirmMsgTxt).toContain("Congratulations!");
  await page.getByRole('link', { name: 'Continue' }).click();

  await page.evaluate(
    () => {
 window.scrollBy(0, 500);
 }
);

  await page.locator('.choose > .nav > li > a').first().click();
  await page.locator('#quantity').click();
  await page.locator('#quantity').fill('3');
  await page.getByRole('button', { name: ' Add to cart' }).click();
  let cartMsg =  await page.locator("#cartModal").textContent();
   expect(cartMsg).toContain("Your product has been added to cart.");
   await page.getByRole('link', { name: 'View Cart' }).click();
  //explicit wait
const data = await page.locator(".cart_total_price").textContent();
console.log(data);


  await page.pause();


});