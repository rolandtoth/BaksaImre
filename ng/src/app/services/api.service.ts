import {Item} from './../shared/interfaces/item.interface'
import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable, of} from 'rxjs'
import {publishReplay, refCount, map} from 'rxjs/operators'
import {catchError} from 'rxjs/operators'
import {ApiData} from '../shared/interfaces/apidata.interface'
import {Theater} from './../shared/interfaces/theater.interface'
import {Contact} from './../shared/interfaces/contact.interface'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiData: Observable<ApiData>
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

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
        .pipe(
          catchError(this.handleError<ApiData>('getItems', null)),
          publishReplay(1),
          refCount()
        )
    }

    return this.apiData
  }

  saveContact(formData: Contact): Observable<Contact> {
    console.log(formData)
    return this.http
      .post<Contact>('/pw/api/contact', formData, this.httpOptions)
      .pipe(catchError(this.handleError<Contact>('saveContact', null)))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)

      return of(result as T)
    }
  }
}
