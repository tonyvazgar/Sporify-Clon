import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>;

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audio!: HTMLAudioElement
  myObservable$: Observable<any> = new Observable();
  constructor() {
    this.audio = new Audio();
    this.trackInfo$.subscribe(responseOk => {
      if(responseOk) {
        this.setAudio(responseOk);
      }
    })
  }

  public listenAllElements(): void {

  }

  public setAudio(song: TrackModel): void {
    console.log('///', song);
    this.audio.src = song.url;
    this.audio.play();
  }
}
