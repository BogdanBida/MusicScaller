import { Component } from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MusicScaller';
  constructor(updates: SwUpdate) {
    updates.available.subscribe((event) => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }
}
