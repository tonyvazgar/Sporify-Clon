import { Component } from '@angular/core';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  mainMenu: {
    defaultOptions: Array<any>,
    accessLink: Array<any>
  } = { defaultOptions: [], accessLink: [] };

  customOptions: Array<any> = [];

  listObservers$: Array<Subscription> = [];

  constructor(private tracksServoce: TrackService) {}

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router: ['/', 'auth']
      },
      {
        name: 'Buscar',
        icon: 'uil uil-search',
        router: ['/', 'history']
      },
      {
        name: 'Tu biblioteca',
        icon: 'uil uil-chart',
        router: ['/', 'favorites']
      },
    ]

    this.mainMenu.accessLink = [
      {
        name: 'Crear Lista',
        icon: 'uil-plus-square'
      },
      {
        name: 'Canciones que te gustan',
        icon: 'uil-heart-medical'
      },
    ]

    this.customOptions = [
      {
        name: 'Lista 1',
        router: ['/']
      },
      {
        name: 'Lista 2',
        router: ['/']
      }
    ]

    const observerTracks$ = this.tracksServoce.dataTracksRandom$.subscribe(
      data => {
        console.log("Recibiendo la cancion random --> ", data);
        this.customOptions.push({
          name: data[0].name,
          router: []
        })
      }
    );
    this.listObservers$ = [observerTracks$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(observer => observer.unsubscribe());
  }
}
