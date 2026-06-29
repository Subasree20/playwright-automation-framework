import { expect } from '@playwright/test';

export class BookingPage {
  constructor(page) {
    this.page = page;

    this.ticketCount = page.locator("#ticket-count");
    this.fullName = page.getByLabel('Full Name');
    this.emailInput = page.locator('#customer-email');
    this.phoneInput = page.getByPlaceholder("+91 98765 43210");
    this.confirmBtn = page.locator("#confirm-booking");

    this.bookingRef = page.locator(".booking-ref");
    this.bookingCards = page.locator("#booking-card");
  }

  async validateDefaultTicket() {
    await expect(this.ticketCount).toContainText("1");
  }

  async fillBookingDetails(name, email, phone) {
    await this.fullName.fill(name);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
  }

  async confirmBooking() {
    await this.confirmBtn.click();
    await expect(this.bookingRef.first()).toBeVisible();
  }

  async getBookingReference() {
    return (await this.bookingRef.first().innerText()).trim();
  }

  async verifyBookingInList(ref, eventTitle) {
    await this.page.locator("//a[@href='/bookings']").nth(2).click();
    await expect(this.page).toHaveURL(/\/bookings$/);

    await expect(this.bookingCards.first()).toBeVisible();

    const matchingCard = this.page.locator("#booking-card", {
      has: this.page.locator(".booking-ref", { hasText: new RegExp(`^${ref}$`) })
    });

    const bookedCard = matchingCard.first();
    await expect(bookedCard).toBeVisible();
    await expect(bookedCard).toContainText(eventTitle);
  }
}
``