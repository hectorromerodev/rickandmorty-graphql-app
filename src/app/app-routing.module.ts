import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'character-list', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('@pages/home/home.module').then(m => m.HomeModule) },
  { path: 'episodes', loadChildren: () => import('@pages/episodes/episodes.module').then(m => m.EpisodesModule) },
  { path: 'character-list', loadChildren: () => import('@characters/characters-list/characters-list.module').then(m => m.CharactersListModule) },
  { path: 'character-details/:id', loadChildren: () => import('@characters/characters-details/characters-details.module').then(m => m.CharactersDetailsModule) },
  { path: 'about', loadChildren: () => import('@pages/about/about.module').then(m => m.AboutModule) },
  { path: '**', loadChildren: () => import('@components/not-found/not-found.module').then(m => m.NotFoundModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
