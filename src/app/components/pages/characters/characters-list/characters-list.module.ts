import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersListRoutingModule } from '@pages/characters/characters-list/characters-list-routing.module';
import { CharactersListComponent } from '@pages/characters/characters-list/characters-list.component';
import { CharactersCardModule } from '@pages/characters/characters-card/characters-card.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchModule } from '@app/shared/components/search/search.module';
import { NotFoundModule } from '@app/components/not-found/not-found.module';


@NgModule({
  declarations: [
    CharactersListComponent
  ],
  imports: [
    CommonModule,
    CharactersListRoutingModule,
    CharactersCardModule,
    InfiniteScrollModule,
    SearchModule,
    NotFoundModule
  ]
})
export class CharactersListModule { }
