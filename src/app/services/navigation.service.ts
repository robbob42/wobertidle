import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

class Navigation {
  topNav: string;
  contentNav: string;
}

const defaultNavigation = {
  topNav: 'play',
  contentNav: 'home'
};

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private sub = new BehaviorSubject<Navigation>(defaultNavigation);
  navigations$: Observable<Navigation> = this.sub.asObservable();

  private navigation = defaultNavigation;

  constructor() { }

  topNavigate(nav: string) {
    this.navigation.topNav = nav;
    this.sub.next(this.navigation);
  }

  contentNavigate(nav: string) {
    this.navigation.contentNav = nav;
    this.sub.next(this.navigation);
  }

}
