import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { EventPage } from '../pages/event.page';
import { BookingPage } from '../pages/booking.page';
import { futureDateValue } from '../utils/dateUtils';

test('Event booking flow', async ({ page }) => {

  const login = new LoginPage(page);
  const event = new EventPage(page);
  const booking = new BookingPage(page);

  const email = "poi@email.com";
  const password = "Asdf@123";

  const date = futureDateValue();
  const title = `Test Event ${date}`;

  await page.goto('/');
  await login.login(email, password);

  await event.createEvent(title, date);
  await expect(page.getByText('Event created!')).toBeVisible();

  await event.navigateToEvents();

  const seatsBefore = await event.getSeats(title);
  console.log("Before booking:", seatsBefore);

  await event.clickBookNow(title);

  await booking.validateDefaultTicket();
  await booking.fillBookingDetails("Lilly", email, "9876543210");
  await booking.confirmBooking();

  const ref = await booking.getBookingReference();
  console.log("Booking Ref:", ref);

  await booking.verifyBookingInList(ref, title);

  await event.navigateToEvents();

  const seatsAfter = await event.getSeats(title);
  console.log("After booking:", seatsAfter);

});