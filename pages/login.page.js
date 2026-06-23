import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('you@email.com');
    this.passwordInput = page.getByLabel('password');
    this.loginBtn = page.locator('#login-btn');
   
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    await this.loginBtn.click();
    await this.page.waitForLoadState('networkidle');
  }
}