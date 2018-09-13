import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit, OnDestroy {
  isLoading = false;
  private autListenerSubs: Subscription;
  userIsAuthenticated = false;
  tiles: Tile[] = [
    {text: 'Zaglavlje se Nekim osnovnim podatcima', cols: 3, rows: 3, color: 'white'},
    {text: 'Sastrane s nekom statistikom npr grafovi dnevnog prometa', cols: 1, rows: 6, color: '#e6e6e6'},
    {text: 'Podnozje sa nekim detaljim ili upozorenjima o stanju skladista/artikala', cols: 3, rows: 3, color: '#f2f2f2'}
  ];
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
}
