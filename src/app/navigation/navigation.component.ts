import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector : 'app-navigation',
    templateUrl : './navigation.component.html',
    styleUrls : ['./navigation.component.css']
})

export class NavigationComponent implements OnInit, OnDestroy {
  private autListenerSubs: Subscription;
  userIsAuthenticated = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.autListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnDestroy() {
    this.autListenerSubs.unsubscribe();
  }
  LogOut() {
    this.authService.logout();
  }
}
