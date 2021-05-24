import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <section class="page__notFound">
      <h1>{{title}}</h1>
      <P>{{message}}</P>
      <img height="{{img.height}}" width="{{img.width}}" src="{{img.src}}" alt="404"  rel="preload" as="image"/>
    </section>
  `
})
export class NotFoundComponent {
  @Input() title: string = '404';
  @Input() message: string = 'Oh no! You are lost.';
  @Input() img: Image = {
    height: 400,
    width: 600,
    src: 'assets/imgs/404.svg'
  };
}

interface Image {
  height?: number;
  width?: number;
  src?: string;
}
