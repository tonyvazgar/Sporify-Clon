import { Component, OnDestroy, OnInit } from '@angular/core';
import * as dataRaw from '../../../../data/tracks.json';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {
  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];

  listObservers$: Array<Subscription> = [];

  constructor(private tracksService: TrackService) {}

  ngOnInit(): void {
    const observerTrending$ = this.tracksService.dataTracksTrending$.subscribe( data => {
      console.log("Consultando las canciones trneidng --> ", data);
      this.tracksTrending = data;
      this.tracksRandom = data;
    })

    const observerRandom$ = this.tracksService.dataTracksRandom$.subscribe( data => {
      console.log("Consultando las canciones random --> ", data);
      this.tracksRandom = [...this.tracksRandom, ...data];
      // this.tracksRandom = data;
    })

    this.listObservers$ = [observerTrending$, observerRandom$];
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(observer => observer.unsubscribe());
  }

}
