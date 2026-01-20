import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Grafico } from './grafico/grafico';

import { EventoViaturaGrafico } from './evento-viatura/evento-viatura-grafico/evento-viatura-grafico';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Grafico, EventoViaturaGrafico],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('my-study');
}
