import {Component, HostBinding} from '@angular/core';
import {fadeInAnimation} from "./animations/fade.animation";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})

export class AppComponent {
  @HostBinding('@fadeInAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  constructor() { }

  getRouteAnimation(outlet) {
    //console.log(outlet.activatedRouteData);
    return outlet.activatedRouteData.animation
  }


}

/*
prepareRouteTransition(outlet: RouterOutlet): string | null {
  try {
    return outlet.activatedRoute.paramMap. || '';
  } catch(e) {
    return '';
  }
}
*/


