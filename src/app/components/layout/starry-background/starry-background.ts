import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxStarrySkyComponent } from '@omnedia/ngx-starry-sky';

@Component({
  selector: 'app-starry-background',
  imports: [NgxStarrySkyComponent, RouterOutlet],
  templateUrl: './starry-background.html',
  styleUrl: './starry-background.scss',
})
export class StarryBackground {

}
