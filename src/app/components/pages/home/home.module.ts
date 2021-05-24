import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CharactersCardModule } from '../characters/characters-card/characters-card.module';
import { NotFoundModule } from '@app/components/not-found/not-found.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CharactersCardModule,
    NotFoundModule
  ]
})
export class HomeModule { }
