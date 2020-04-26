import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private sub = new BehaviorSubject<boolean>(false);
  background$: Observable<boolean> = this.sub.asObservable();

  private background = false;

  constructor() { }

  setForeground(active: boolean) {
    this.background = active;
    this.sub.next(this.background);
  }

}
