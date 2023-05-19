import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  template: ` <div *ngIf="auth.user$ | async as user">
    {{ user | json }}
  </div>`,
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}
