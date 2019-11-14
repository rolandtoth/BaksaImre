import {ItemTypePipe} from './../shared/pipes/item-type.pipe'
import {map} from 'rxjs/operators'
import {ApiService} from './../services/api.service'
import {Component, OnInit} from '@angular/core'
import {Item} from '../shared/interfaces/item.interface'
import {AppSettings} from './../shared/app-settings'

@Component({
  templateUrl: './sitemap.component.html'
})
export class SiteMapComponent implements OnInit {
  siteMapMarkup: string

  constructor(
    private apiService: ApiService,
    private itemTypePipe: ItemTypePipe
  ) {}

  ngOnInit() {
    this.apiService
      .getData()
      .pipe(map(data => data.items))
      .subscribe(dynamicPages => {
        let pages = [...this.getStaticPages(), ...dynamicPages]
        this.siteMapMarkup = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${this.getSiteMapItems(
          pages
        )}
</urlset>`
      })
  }

  getStaticPages() {
    let date = new Date().toISOString()

    return [
      {
        url: `${AppSettings.domain}/`,
        created: date
      },
      {
        url: `${AppSettings.domain}/oneletrajz`,
        created: date
      },
      {
        url: `${AppSettings.domain}/kapcsolat`,
        created: date
      }
    ]
  }

  getSiteMapItems(data) {
    let items: string = ''

    data.forEach((item: Item | {[key: string]: string}) => {
      let type: string
      let url: string = item['url']

      if (!url) {
        type = this.itemTypePipe.transform(item.template, true)
        url = `${AppSettings.domain}/${type}/${item.name}`
      }

      items += `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date(item.created).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`
    })

    return items
  }
}
