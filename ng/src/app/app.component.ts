import {AppSettings} from './shared/app-settings'
import {Component, OnInit} from '@angular/core'
import {TitleService} from './services/title.service'
import {
  Router,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
  Scroll
} from '@angular/router'
import {filter, take, delay} from 'rxjs/operators'
import {ViewportScroller} from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  loading: boolean = true
  siteName: string = AppSettings.siteName
  developerName: string = AppSettings.developerName
  developerUrl: string = AppSettings.developerUrl

  constructor(
    private titleService: TitleService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    this.router.events
      .pipe(
        filter(
          e =>
            e instanceof NavigationEnd ||
            e instanceof NavigationError ||
            e instanceof NavigationCancel
        ),
        take(1)
      )
      .subscribe(e => {
        this.loading = false
      })

    this.router.events
      .pipe(
        filter((e: any): e is Scroll => e instanceof Scroll),
        delay(0)
      )
      .subscribe(e => {
        if (e.position) {
          viewportScroller.scrollToPosition(e.position)
        } else if (e.anchor) {
          viewportScroller.scrollToAnchor(e.anchor)
        } else {
          viewportScroller.scrollToPosition([0, 0])
        }
      })
  }

  ngOnInit() {
    this.titleService.boot()
  }

  scrollTop() {
    this.viewportScroller.scrollToPosition([0, 0])
  }
}
