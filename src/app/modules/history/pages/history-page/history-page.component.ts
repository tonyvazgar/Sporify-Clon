import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent {

  resultList$: Observable<any> = of([]);

  constructor(private searchService: SearchService) {}

  receiveData(event: string): void {
    this.resultList$ = this.searchService.searchSong$(event);
    console.log("??? estoy en el padre", event);
  }
}
