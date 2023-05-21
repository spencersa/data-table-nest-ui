import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button (click)="logout()">Log out</button>
    </ng-container>

    <ng-template #loggedOut>
      <button (click)="loginWithRedirect()">Log in</button>
    </ng-template>

    <div *ngIf="auth.isAuthenticated$">
      <button (click)="getToken()">Get token</button>
      <div>{{ token }}</div>
    </div>
  `,
  styles: [],
})
export class AuthButtonComponent {
  public token: string | undefined;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {
    this.token = 'default';
  }

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }

  async getToken() {
    this.token = await this.auth
      .getAccessTokenWithPopup({
        authorizationParams: {
          audience: 'https://data-table-nest-api',
        },
      })
      .toPromise();
  }
}
