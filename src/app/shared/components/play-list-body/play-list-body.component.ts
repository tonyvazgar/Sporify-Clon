import { Component, Input } from '@angular/core';
import * as dataRaw from '../../../data/tracks.json';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css'],
})
export class PlayListBodyComponent {
  @Input() tracks: Array<any> = [];
  optionSort: { property: string | null; order: string } = {
    property: null,
    order: 'asc',
  };
  ngOnInit(): void {
    const { data } = (dataRaw as any).default;
    this.tracks = data;
  }

  changeOrder(property: string): void {
    const { order } = this.optionSort;
    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc' : 'asc'
    }
    console.log(this.optionSort);
  }
}
