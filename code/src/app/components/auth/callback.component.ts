import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-callback',
  template: ` <p *ngIf="!token">Loading...</p> `,
})
export class CallbackComponent implements OnInit {
  public token: string | undefined;

  constructor(private auth: AuthService) {}

  async ngOnInit(): Promise<void> {
    await this.auth.handleRedirectCallback();
    try {
      this.token = await lastValueFrom(
        this.auth.getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://data-table-nest-api',
          },
        })
      );
      localStorage.setItem('token', this.token || '');
    } catch (error) {
      console.log(error);
    }

    if (this.token === undefined) {
      try {
        this.token = await lastValueFrom(
          this.auth.getAccessTokenWithPopup({
            authorizationParams: {
              audience: 'https://data-table-nest-api',
            },
          })
        );
        localStorage.setItem('token', this.token || '');
      } catch (error) {
        console.log(error);
      }
    }
  }
}
