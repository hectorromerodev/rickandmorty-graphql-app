import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <section class="page__notFound">
      <h1>404</h1>
      <P>Oh no! You are lost.</P>
      <img height="400" width="600" src="assets/imgs/404.svg" alt="404">
    </section>
  `
})
export class NotFoundComponent { }
