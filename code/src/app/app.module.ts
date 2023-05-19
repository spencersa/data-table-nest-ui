import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './components/auth/login.component';
import { UserProfileComponent } from './components/auth/user-profile.component';

@NgModule({
  declarations: [AppComponent, AuthButtonComponent, UserProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-77r3tluzofdan1kf.us.auth0.com',
      clientId: 'IWp1HENxpjXrZuUbaFGdmyVT6jqmt4cM',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent, AuthButtonComponent, UserProfileComponent],
})
export class AppModule {}
