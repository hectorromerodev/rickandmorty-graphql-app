import { Component } from '@angular/core';
import { LocalStorageService } from '@app/shared/services/local-storage.service';

@Component({
  selector: 'app-home',
  template: `
    <section class="character__list">
      <app-characters-card *ngFor="let character of charactersFav$ | async" [character]="character"></app-characters-card>
    </section>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  charactersFav$ = this.localStgServ.charactersFav$;
  constructor(private localStgServ: LocalStorageService) { }
}
