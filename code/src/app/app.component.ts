import { Component } from '@angular/core';
import { GlobalValues } from 'src/services/global-values.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public globalValues: GlobalValues) {}
}
