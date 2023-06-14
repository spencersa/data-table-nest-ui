import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './components/auth/login.component';
import { UserProfileComponent } from './components/auth/user-profile.component';
import { CallbackComponent } from './components/auth/callback.component';
import { DataTablesComponent } from './components/data-tables-component/data-tables.component';
import { DataTableNestApi } from 'src/services/data-table-nest-api.component';
import { HttpClientModule } from '@angular/common/http';
import { GlobalValues } from 'src/services/global-values.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { DataTableComponent } from './components//data-table-component/data-table.component';
import { TableValueComponent } from './components/table-value-component/table-value.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponent,
    UserProfileComponent,
    CallbackComponent,
    DataTablesComponent,
    DataTableComponent,
    TableValueComponent,
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
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [DataTableNestApi, GlobalValues],
  bootstrap: [
    AppComponent,
    AuthButtonComponent,
    UserProfileComponent,
    CallbackComponent,
    DataTablesComponent,
    DataTableComponent,
    TableValueComponent,
  ],
})
export class AppModule {}
