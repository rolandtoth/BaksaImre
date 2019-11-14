import {AppSettings} from '../shared/app-settings'
import {Injectable} from '@angular/core'
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router'
import {Title} from '@angular/platform-browser'
import {filter, map, switchMap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private defaultTitle: string = AppSettings.siteName
  private defaultTitleFull: string = AppSettings.siteNameFull
  private separator: string = AppSettings.titleSeparator

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private title: Title
  ) {}

  boot() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activeRoute),
        map(route => route.firstChild),
        switchMap(route => route.data),
        map(data => data && data.title)
      )
      .subscribe(t => this.setTitle(t))
  }

  setTitle(title: string) {
    let newTitle: string = title
      ? `${title}${this.separator}${this.defaultTitle}`
      : this.defaultTitleFull

    this.title.setTitle(newTitle)
  }
}
