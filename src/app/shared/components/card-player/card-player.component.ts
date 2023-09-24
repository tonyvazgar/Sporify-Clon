import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css']
})
export class CardPlayerComponent {
  @Input() track: TrackModel = {
    name: 'sdfds',
    cover: 'fsdfsdf',
    album: 'sdfsd',
    duration: 344,
    url: 'https://www.google.com/sdfsdf',
    _id: ''
  };
  @Input() mode: string = '';
}
