import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersListRoutingModule } from '@pages/characters/characters-list/characters-list-routing.module';
import { CharactersListComponent } from '@pages/characters/characters-list/characters-list.component';
import { CharactersCardModule } from '@pages/characters/characters-card/characters-card.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    CharactersListComponent
  ],
  imports: [
    CommonModule,
    CharactersListRoutingModule,
    CharactersCardModule,
    InfiniteScrollModule
  ]
})
export class CharactersListModule { }
