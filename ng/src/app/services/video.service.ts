import {Injectable, isDevMode} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, of} from 'rxjs'
import {catchError, first, publishReplay, refCount} from 'rxjs/operators'
import {VideoData} from '../shared/interfaces/videodata.interface'
// import {environment} from './../../environments/environment'

const YOUTUBE_OEMBED_ENDPOINT: string = 'https://www.youtube.com/oembed?url='
const VIMEO_OEMBED_ENDPOINT: string = 'https://vimeo.com/api/oembed.json?url='

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  // corsfix: string = environment.corsfix
  corsfix: string = isDevMode ? 'https://cors-anywhere.herokuapp.com/' : ''
  videoCache: VideoData[] = []

  constructor(private http: HttpClient) {}

  getVideoData(url: string): Observable<VideoData> {
    if (!this.videoCache[url]) {
      let endPoint = this.getEndPoint(url)

      this.videoCache[url] = this.http
        .get<VideoData>(this.corsfix + endPoint + encodeURI(url))
        .pipe(
          first(),
          publishReplay(1),
          refCount(),
          catchError(this.handleError<VideoData>('getVideoData', null))
        )
    }

    return this.videoCache[url]
  }

  getEndPoint(url: string): string {
    if (url.includes('youtube.com')) {
      return YOUTUBE_OEMBED_ENDPOINT
    } else if (url.includes('vimeo.com')) {
      return VIMEO_OEMBED_ENDPOINT
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)

      return of(result as T)
    }
  }
}
