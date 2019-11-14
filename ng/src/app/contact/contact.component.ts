import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Meta} from '@angular/platform-browser'
import {AppSettings} from './../shared/app-settings'
import {TitleService} from './../services/title.service'

@Component({
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  title: string = 'Kapcsolat'
  settings: any

  constructor(
    private titleService: TitleService,
    private meta: Meta,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.title)
    this.settings = AppSettings

    this.meta.updateTag({
      name: 'description',
      content: this.route.snapshot.data.meta.description
    })
  }
}
