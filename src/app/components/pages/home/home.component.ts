import { Component } from '@angular/core';
import { LocalStorageService } from '@app/shared/services/local-storage.service';

@Component({
  selector: 'app-home',
  template: `
    <h1 class="title">My Favorites characters</h1>
    <section *ngIf="charactersFav$ | async as characters" class="character__list">
      <ng-container *ngIf="characters.length; else noFavorites">
        <app-characters-card *ngFor="let character of characters" [character]="character"></app-characters-card>
      </ng-container>
      <ng-template #noFavorites>
        <app-not-found title="" message="You don't have favorites yet"></app-not-found>
      </ng-template>
    </section>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  charactersFav$ = this.localStgServ.charactersFav$;
  constructor(private localStgServ: LocalStorageService) { }
}
