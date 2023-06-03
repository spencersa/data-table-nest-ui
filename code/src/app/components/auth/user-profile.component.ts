import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  template: ` <div *ngIf="auth.user$ | async as user">
    Logged in user: {{ user.email }}
  </div>`,
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}
