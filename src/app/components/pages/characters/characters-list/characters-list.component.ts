import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { DataService } from '@app/shared/services/data.service';
import { LocalStorageService } from '@app/shared/services/local-storage.service';

@Component({
  selector: 'app-characters-list',
  template: `
    <section class="character__list">
      <app-characters-card *ngFor="let character of (characters$ | async)" [character]="character"></app-characters-card>
      <figure *ngIf="showScrollButton" class="scroll">
        <img (click)="onScrollTop()" src="assets/imgs/scroll_up.svg" alt="Scroll up" rel="preload" as="image" width="40" height="40">
      </figure>
    </section>
  `,
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent {
  characters$ = this.dataServ.characters$;
  showScrollButton = false;
  private scrollHeight = 500;
  constructor(
    private dataServ: DataService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showScrollButton = (yOffSet || scrollTop) > this.scrollHeight;
  }
  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }
}
