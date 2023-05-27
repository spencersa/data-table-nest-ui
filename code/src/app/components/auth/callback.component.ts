import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { lastValueFrom } from 'rxjs';
import { GlobalValues } from 'src/services/global-values.component';

@Component({
  selector: 'app-callback',
  template: ` <p *ngIf="!token">Loading...</p> `,
})
export class CallbackComponent implements OnInit {
  public token: string | undefined;
  constructor(private auth: AuthService, private globalValues: GlobalValues) {}

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
      this.globalValues.hasToken = true;
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
        this.globalValues.hasToken = true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
