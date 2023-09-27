import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  mockCover: TrackModel = {
    cover: 'https://www.google.com/',
    album: 'Shakira',
    name: 'Tuuu',
    _id: '1',
    url: 'https://www.google.com/',
    duration: 333
  }

  listObservers: Array<Subscription> = [];

  constructor(private _multimediaService: MultimediaService) {}

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    // this._multimediaService.callback.unsubscribe;
    this.listObservers.forEach( u => u.unsubscribe());
    console.log('muriendooo');
  }

  ngOnInit(): void {
    const observer1$: Subscription = this._multimediaService.callback.subscribe(
      (response: TrackModel) => {
        console.log("recibiendo cancion....", response);
      }
    )
    this.listObservers = [observer1$];
  }
}
