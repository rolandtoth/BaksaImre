import {Component, OnInit, AfterViewInit} from '@angular/core'
import {Meta} from '@angular/platform-browser'
import {Router, ActivatedRoute} from '@angular/router'
import {ApiService} from './../services/api.service'
import {TitleService} from '../services/title.service'
import {AssetLoaderService} from '../services/asset-loader.service'
import {Item} from '../shared/interfaces/item.interface'
import {Theater} from '../shared/interfaces/theater.interface'
import {AppSettings} from './../shared/app-settings'
import {Observable} from 'rxjs'
import {ExcerptPipe} from './../shared/pipes/excerpt.pipe'
import {ItemTypePipe} from './../shared/pipes/item-type.pipe'

declare const baguetteBox: any

@Component({
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit, AfterViewInit {
  item: Item
  shareUrl: string
  shareText: string
  shareTags: string
  lightboxReady: boolean = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private assetLoader: AssetLoaderService,
    private meta: Meta,
    private apiService: ApiService,
    private itemTypePipe: ItemTypePipe,
    private excerptPipe: ExcerptPipe
  ) {}

  ngAfterViewInit() {
    this.assetLoader.load(
      '../assets/scripts/baguettebox/baguettebox.min.css',
      () => {
        this.assetLoader.load(
          '../assets/scripts/baguettebox/baguettebox.min.js',
          () => {
            baguetteBox.run('.lightbox', {
              // animation: 'fadeIn',
              async: true,
              fullScreen: false,
              noScrollbars: false
            })
            this.lightboxReady = true
          }
        )
      }
    )
  }

  goBack(e: MouseEvent) {
    e.preventDefault()
    if (window.history.length > 1) {
      window.history.back()
    } else {
      this.router.navigate(['/'])
    }
  }

  ngOnInit() {
    let item = this.route.snapshot.data.item
    let type = this.itemTypePipe.transform(item.template, true)

    if (!item) {
      this.router.navigate(['404'])
    }

    this.titleService.setTitle(item.title)

    this.shareUrl = `${AppSettings.domain}/${type}/${item.name}`
    this.shareText = item.intro
      ? item.intro
      : this.excerptPipe.transform(item.body)
    this.shareTags = ''

    this.meta.updateTag({
      name: 'description',
      content: item.seo_description ? item.seo_description : item.intro
    })

    this.item = item
  }

  getTheater(id: number): Observable<Theater> {
    return this.apiService.getTheater(id)
  }

  getItem(id: number): Observable<Item> {
    return this.apiService.getItem(id)
  }
}
