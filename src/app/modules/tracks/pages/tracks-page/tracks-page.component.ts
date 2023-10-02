import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {
  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];

  constructor(private tracksService: TrackService) {}

  ngOnInit(): void {
    this.tracksService.getAllTracks$().subscribe(
      data => {
        console.log("Gettinh data from htpp -> ", data);
        this.tracksTrending = data;
      }
    );

    this.tracksService.getAllRandom$().subscribe(
      response => {
        console.log("Gettinh random from request -> ", response);
        this.tracksRandom = response;
      }
    )
  }

  ngOnDestroy(): void {

  }

}
