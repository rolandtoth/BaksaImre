import {Item} from './../shared/interfaces/item.interface'
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, of} from 'rxjs'
import {publishReplay, refCount, map} from 'rxjs/operators'
import {catchError} from 'rxjs/operators'
import {ApiData} from '../shared/interfaces/apidata.interface'
import {Theater} from './../shared/interfaces/theater.interface'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiData: Observable<ApiData>

  constructor(private http: HttpClient) {}

  getTheater(id: number): Observable<Theater> {
    return this.getData().pipe(
      map(data => data.theaters.filter(x => x.id === id)[0])
    )
  }

  getItem(id: number): Observable<Item> {
    return this.getData().pipe(
      map(data => data.items.filter(x => x.id === id)[0])
    )
  }

  getData(): Observable<ApiData> {
    if (!this.apiData) {
      this.apiData = this.http
        .get<ApiData>('/pw/api/items')
        .pipe(catchError(this.handleError<ApiData>('getItems', null)))
        .pipe(
          // map(data => data['items']),
          publishReplay(1),
          refCount()
        )
    }

    return this.apiData
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)

      return of(result as T)
    }
  }
}
