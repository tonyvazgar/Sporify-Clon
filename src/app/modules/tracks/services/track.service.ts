import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = enviroment.api;

  constructor(private httpClient: HttpClient) {

  }

  getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      map(
        ({ data }: any) => {
          return data;
        }
      )
    )
  }

  getAllRandom$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      tap(({data}:any) => console.log('Data is: _', data)),
      map(
        ({ data }: any) => {
          return data.reverse();
        }
      ),
      tap(({data}:any) => console.log('Data is: _', data)),
      catchError((error) => {
        const { status, statusText } = error;
        console.error('Algo pasoo _ ', status, statusText)
        return of([])
      })
    )
  }

}
