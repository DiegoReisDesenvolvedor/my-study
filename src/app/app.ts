import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Grafico } from './grafico/grafico';
import { ListaViaturaComponent } from './viatura-operacional/lista-viatura/lista-viatura';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Grafico, ListaViaturaComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('my-study');
}
