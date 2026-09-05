import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('luftborn-client');

  constructor(private MSALService: MsalService) {}

  get isLoggedIn() {
    return this.MSALService.instance.getAllAccounts().length > 0;
  }

  login() {
    this.MSALService.loginRedirect();
  }

  logout() {
    this.MSALService.logoutRedirect();
  }
}
