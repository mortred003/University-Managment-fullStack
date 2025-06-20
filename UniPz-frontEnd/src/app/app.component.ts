import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { overlaySlide } from './overlay-slide';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <!-- Routed pages animate inside this outlet -->
    <main [@routeAnimations]="o.activatedRouteData['anim']">
      <router-outlet #o="outlet"></router-outlet>
    </main>
  `,
  animations: [overlaySlide]
})
export class AppComponent {}
