import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button (click)="logout()" class="btn btn-outline-success" type="submit">
        Log out
      </button>
    </ng-container>

    <ng-template #loggedOut>
      <button
        (click)="loginWithRedirect()"
        class="btn btn-outline-success"
        type="submit"
      >
        Log in
      </button>
    </ng-template>

    <app-callback *ngIf="auth.isAuthenticated$ | async"></app-callback>
  `,
  styles: [],
})
export class AuthButtonComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({
      logoutParams: { returnTo: document.location.origin, federated: true },
    });
  }
}
