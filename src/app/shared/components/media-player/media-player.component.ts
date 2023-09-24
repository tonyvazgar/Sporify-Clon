import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent {
  mockCover: TrackModel = {
    cover: 'https://www.google.com/',
    album: 'Shakira',
    name: 'Tuuu',
    _id: '1',
    url: 'https://www.google.com/',
    duration: 333
  }
}
