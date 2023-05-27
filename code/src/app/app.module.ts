import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './components/auth/login.component';
import { UserProfileComponent } from './components/auth/user-profile.component';
import { CallbackComponent } from './components/auth/callback.component';
import { DataTablesComponent } from './components/data-tables.component';
import { DataTableNestApi } from 'src/services/data-table-nest-api.component';
import { HttpClientModule } from '@angular/common/http';
import { GlobalValues } from 'src/services/global-values.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponent,
    UserProfileComponent,
    CallbackComponent,
    DataTablesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-77r3tluzofdan1kf.us.auth0.com',
      clientId: 'IWp1HENxpjXrZuUbaFGdmyVT6jqmt4cM',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
  providers: [DataTableNestApi, GlobalValues],
  bootstrap: [
    AppComponent,
    AuthButtonComponent,
    UserProfileComponent,
    CallbackComponent,
    DataTablesComponent,
  ],
})
export class AppModule {}
