import {AppSettings} from './shared/app-settings'
import {Component, OnInit} from '@angular/core'
import {TitleService} from './services/title.service'
import {
  Router,
  NavigationEnd,
  NavigationError,
  NavigationCancel
} from '@angular/router'
import {filter, take} from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  loading: boolean = true
  siteName: string = AppSettings.siteName

  constructor(private titleService: TitleService, private router: Router) {
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
  }

  ngOnInit() {
    this.titleService.boot()
  }
}
