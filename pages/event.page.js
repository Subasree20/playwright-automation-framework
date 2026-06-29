export class EventPage {
  constructor(page) {
    this.page = page;
  }

  async createEvent(title, date) {
    await this.page.locator("//*[text()='Admin']").click();
    await this.page.locator("a[href='/admin/events']").nth(1).click();

    await this.page.locator("#event-title-input").fill(title);
    await this.page.locator("textarea[rows='3']").fill("Test description");
    await this.page.getByLabel('city').fill('Chennai');
    await this.page.getByLabel('venue').fill('T Nagar');
    await this.page.locator("//input[@id='event-date-&-time']").fill(date);
    await this.page.locator("//input[@id='price-($)']").fill('1500');
    await this.page.getByPlaceholder('e.g. 500').fill('50');

    await this.page.locator('#add-event-btn').click();
  }

  async getSeats(title) {
    const card = this.page.locator(`[data-testid='event-card']:has-text("${title}")`);
    const text = await card.locator("//*[text()=' seats available']").innerText();
    return parseInt(text.match(/\d+/)[0], 10);
  }

  
async navigateToEvents() {
  await this.page.locator("#nav-events").click();
  await this.page.waitForLoadState('networkidle');
  await this.page.waitForSelector("[data-testid='event-card']");
}

async getEventCard(title) {
  return this.page.locator(`[data-testid='event-card']:has-text("${title}")`);
}

async getSeats(title) {
  const card = await this.getEventCard(title);
  const text = await card.locator("//*[text()=' seats available']").innerText();
  return parseInt(text.match(/\d+/)[0], 10);
}

async clickBookNow(title) {
  const card = await this.getEventCard(title);
  await card.locator("a:has-text('Book Now')").click();
}

}