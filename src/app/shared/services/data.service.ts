import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular'
import { BehaviorSubject } from 'rxjs';

import { tap, take, withLatestFrom, pluck, mergeMap, find } from 'rxjs/operators'
import { Character, DataResponse, Episode } from '@interfaces/data.interface';
import { LocalStorageService } from './local-storage.service';

const QUERY = gql`
  {
    episodes{
      results{
        name,
        episode
      }
    },
    characters {
      results {
        id
        name,
        status,
        species,
        gender,
        image
      }
    }
  }`;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private episodesSubject = new BehaviorSubject<Episode[]>([]);
  episodes$ = this.episodesSubject.asObservable();

  private charactersSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.charactersSubject.asObservable();

  constructor(
    private apollo: Apollo,
    private localStorage: LocalStorageService
  ) {
    this.getDataAPI();
  }

  getDetails(id: number): any {
    return this.characters$.pipe(
      mergeMap((characters: Character[]) => characters),
      find((character: Character) => character.id === id)
    );
  }

  getCharactersByPage(pageNum: number): void {
    const QUERY_BY_PAGE = gql`{
      characters(page: ${pageNum}) {
        results {
          id
          name,
          status,
          species,
          gender,
          image
        }
      }
    }`;

    this.apollo.watchQuery<any>({
      query: QUERY_BY_PAGE
    }).valueChanges.pipe(
      take(1),
      pluck('data', 'characters'),
      withLatestFrom(this.characters$),
      tap(([apiResponse, characters]) => {
        this.parseCharactersData([...characters, ...apiResponse.results]);
      })
    ).subscribe();
  }

  private getDataAPI(): void {
    // Apollo petition
    this.apollo.watchQuery<DataResponse>({ query: QUERY })
      .valueChanges.pipe(
        take(1),
        tap(({ data }) => {
          const { characters, episodes } = data;
          this.episodesSubject.next(episodes.results);
          this.parseCharactersData(characters.results);
        })
      ).subscribe();
  }

  private parseCharactersData(characters: Character[]): void {
    const currentFavs = this.localStorage.getFavoritesCharacters();
    const newData = characters.map(character => {
      const found = !!currentFavs.find((fav: Character) => fav.id === character.id);
      return { ...character, isFavorite: found };
    });
    this.charactersSubject.next(newData);
  }
}
