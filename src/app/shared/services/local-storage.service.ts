import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '@interfaces/data.interface';

const MY_FAVORITES = 'myFavorites';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private charactersFavSubject = new BehaviorSubject<Character[]>([]);
  charactersFav$ = this.charactersFavSubject.asObservable();

  constructor() {
    this.initialStorage();
  }

  private initialStorage(): void {
    const currents = JSON.parse(localStorage.getItem(MY_FAVORITES) ?? '');
    if (!currents) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }
    this.getFavoritesCharacters();
  }

  clearStorage() {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Error cleaning localstorage', error);
    }
  }

  getFavoritesCharacters(): any {
    try {
      const charactersFav = JSON.parse(localStorage.getItem(MY_FAVORITES) ?? '');
      this.charactersFavSubject.next(charactersFav);
      return charactersFav;
    } catch (error) {
      console.warn('Error getting favorites from localstorage', error);
    }
  }

  addOrRemoveFavorite(character: Character): void {
    const { id } = character;
    const currentFav = this.getFavoritesCharacters();
    const found = !!currentFav.find((fav: Character) => fav.id === id)
    found ? this.removeFromFavorite(id) : this.addToFavorite(character);
  }

  private addToFavorite(character: Character): void {
    try {
      const currentFav = this.getFavoritesCharacters();
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...currentFav, character]))
      this.charactersFavSubject.next([...currentFav, character])

    } catch (error) {
      console.warn('Error saving localstorage', error);
    }
  }

  private removeFromFavorite(id: number): void {
    try {
      const currentFav = this.getFavoritesCharacters();
      const characters = currentFav.filter((char: Character) => char.id !== id);
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...characters]));
      this.charactersFavSubject.next([...characters])
    } catch (error) {
      console.warn('Error removing localstorage', error);
    }
  }

}
