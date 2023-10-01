import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import * as dataRaw from  '../../../data/tracks.json';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  dataTracksTrending$: Observable<TrackModel[]> = of([]);

  dataTracksRandom$: Observable<TrackModel[]> = of([]);
  constructor() {
    const { data } = (dataRaw as any).default;
    this.dataTracksTrending$ = of(data);
    this.dataTracksRandom$ = new Observable(
      (observer) => {

        const trackExample: TrackModel = {
          name: 'achubikibi',
          duration: 334,
          _id: 45,
          album: 'llnm',
          cover: 'https://samanthaming.gumlet.io/tidbits/74-how-to-reverse-an-array.jpg.gz',
          url: 'https://samanthaming.gumlet.io/tidbits/74-how-to-reverse-an-array.jpg.gz'
        }

        setTimeout(() => {
          observer.next([trackExample]);
        }, 2500)
      }
    );
  }
}
