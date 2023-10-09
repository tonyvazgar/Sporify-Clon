import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  public mockCover!: TrackModel;
  @Input() state: string = '';
  listObservers: Array<Subscription> = [];

  constructor(public multimediaService: MultimediaService) {}

  ngOnDestroy(): void {
    this.multimediaService.trackInfo$.subscribe( response => {
      console.log("Debo reporudcir --> ", response);
    })
  }

  ngOnInit(): void {
    const observer1$: Subscription = this.multimediaService.callback.subscribe(
      (response: TrackModel) => {
        console.log("recibiendo cancion....", response);
        this.mockCover = response;
      }
    )
    this.listObservers = [observer1$];
  }
}
