import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "./components/layout/nav-bar/nav-bar";
//import { NgxStarrySkyComponent } from '@omnedia/ngx-starry-sky';

@Component({
  selector: 'app-root',
  imports: [NavBar, RouterOutlet/*, NgxStarrySkyComponent*/],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('MilkyWayCitizen.Front');
}
