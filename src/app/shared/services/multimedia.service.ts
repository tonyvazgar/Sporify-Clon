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
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00');
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused');
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    this.audio = new Audio();
    this.trackInfo$.subscribe(responseOk => {
      if(responseOk) {
        this.setAudio(responseOk);
      }
    })
    this.listenAllEvents();
  }

  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false)
    this.audio.addEventListener('play', this.setPlayStatus, false)
    this.audio.addEventListener('playing', this.setPlayStatus, false)
    this.audio.addEventListener('pause', this.setPlayStatus, false)
    this.audio.addEventListener('ended', this.setPlayStatus, false)
  }

  private calculateTime = () => {
    console.log('Disparando evento de calcular')
    const { duration, currentTime } = this.audio;
    this.setElapsedTime(currentTime);
    this.setRemaining(currentTime, duration);
    this.setBarProgress(currentTime, duration);
  }

  private setPlayStatus = (state: any) => {
  console.log("🚀 ~ file: multimedia.service.ts:45 ~ MultimediaService ~ state:", state)
  switch(state.type) {
    case 'play':
      this.playerStatus$.next('play')
      break;
    case 'playing':
      this.playerStatus$.next('playing')
      break;
    case 'ended':
      this.playerStatus$.next('ended')
      break;
    default:
      this.playerStatus$.next('paused')
      break;
  }
  }

  private setBarProgress = (currentTime: number, duration: number) => {
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage);
  }

  private setElapsedTime(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60) //TODO 1,2,3
    let minutes = Math.floor((currentTime / 60) % 60)
    //TODO  00:00 ---> 01:05 --> 10:15
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat)
  }

  private setRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60)
    let minutes = Math.floor((timeLeft / 60) % 60)
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)
  }

  public setAudio(song: TrackModel): void {
    console.log('///', song);
    this.audio.src = song.url;
    this.audio.play();
  }

  public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause();
  }

  public seekAudio(percentage: number): void {
    const { duration } = this.audio;
    const percentageToSecond = (percentage * duration) / 100;
    this.audio.currentTime = percentageToSecond;
  }
}
