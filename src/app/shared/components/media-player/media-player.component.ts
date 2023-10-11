import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  state: string = 'paused';
  listObservers: Array<Subscription> = [];
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');

  constructor(public multimediaService: MultimediaService) {}

  ngOnDestroy(): void {
    this.multimediaService.trackInfo$.subscribe( response => {
      console.log("Debo reporudcir --> ", response);
    })
  }

  ngOnInit(): void {
    const observer1$ = this.multimediaService.playerStatus$.subscribe(status => this.state = status)

    this.listObservers = [observer1$]
  }

  handlePosition(event: MouseEvent ): void {
    const elNative: HTMLElement = this.progressBar.nativeElement;
    const { clientX } = event;
    const { x, width } = elNative.getBoundingClientRect();
    const clickX = clientX - x;
    const percentageFromX = (clickX * 100) / width;
    this.multimediaService.seekAudio(percentageFromX)
  }
}
