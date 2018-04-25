import {Component, HostBinding} from '@angular/core';
import {fadeInAnimation} from "./animations/fade.animation";
import {AuthService} from "./auth/auth.service";


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
  constructor(public auth: AuthService) { auth.handleAuthentication(); }

  getRouteAnimation(outlet) {
    //console.log(outlet.activatedRouteData);
    return outlet.activatedRouteData.animation
  }

}



