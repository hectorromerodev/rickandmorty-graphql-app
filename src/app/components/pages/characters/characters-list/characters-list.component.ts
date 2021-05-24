import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { DataService } from '@app/shared/services/data.service';
import { LocalStorageService } from '@app/shared/services/local-storage.service';

@Component({
  selector: 'app-characters-list',
  template: `
    <!-- SEARCH COMPONENT -->
    <app-search></app-search>
    <section class="character__list" infiniteScroll (scrolled)="onScrollDown()">
      <!-- NG CONTAINER WITH CARDS -->
      <div *ngIf="characters$ | async as characters">
        <ng-container *ngIf="characters.length; else showEmpty">
          <app-characters-card *ngFor="let character of characters" [character]="character"></app-characters-card>
        </ng-container>
      </div>
      <!-- NOT RESULT TEMPLATE -->
      <ng-template #showEmpty>
        <app-not-found title="" message="Not data found" [img]="{height: 250, width: 450, src: 'assets/imgs/404.svg' }"></app-not-found>
      </ng-template>
      <!-- SCROLL UP BTN -->
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

  private pageNum = 1;
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

  onScrollDown(): void {
    this.pageNum++;
    this.dataServ.getCharactersByPage(this.pageNum);
  }
}
