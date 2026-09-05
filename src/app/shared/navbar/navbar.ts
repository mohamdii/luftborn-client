import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AccountInfo, InteractionStatus } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { environment } from '../../../../environments/enivronment';

@Component({
  imports: [],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  
  constructor(
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        const accounts = this.msalService.instance.getAllAccounts();

        if (accounts.length > 0) {
          this.msalService.instance.setActiveAccount(accounts[0]);
          this.registerUser(accounts[0]);
        }
      });
  }

  private registerUser(account: AccountInfo): void {
    const payload = {
      entraObjectId: account.localAccountId,
      email: account.username,
      displayName: account.name ?? '',
    };

    this.http.post(`${environment.apiUrl}/auth/register`, payload).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isLoggedIn(): boolean {
    return this.msalService.instance.getAllAccounts().length > 0;
  }

  login(): void {
    this.msalService.loginRedirect();
  }

  logout(): void {
    this.msalService.logoutRedirect();
  }
}
