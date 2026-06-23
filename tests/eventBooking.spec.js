import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { EventPage } from '../pages/event.page';
import { futureDateValue } from '../utils/dateUtils';

test('Event booking flow', async ({ page }) => {

  const login = new LoginPage(page);
  const event = new EventPage(page);

  const email = "Poi@email.com";
  const password = "Asdf@123";

  const date = futureDateValue();
  const title = `Test Event ${date}`;

  await page.goto('/');
  await login.login(email, password);
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

  await event.createEvent(title, date);
  await expect(page.getByText('Event created!')).toBeVisible();

  await page.locator("#nav-events").click();

  const beforeSeats = await event.getSeats(title);
  console.log("Before:", beforeSeats);

  // Continue booking logic...
});