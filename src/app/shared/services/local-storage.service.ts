import { Injectable } from '@angular/core';

const MY_FAVORITES = 'myFavorites';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
    this.initialStorage();
  }

  private initialStorage(): void {
    const currents = JSON.parse(localStorage.getItem(MY_FAVORITES) ?? '');
    if (!currents) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }
  }

}
