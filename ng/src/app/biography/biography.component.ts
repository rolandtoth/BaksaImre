import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Meta} from '@angular/platform-browser'
import {ApiService} from './../services/api.service'
import {TitleService} from './../services/title.service'
import {Item} from '../shared/interfaces/item.interface'
import {Theater} from './../shared/interfaces/theater.interface'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html'
})
export class BiographyComponent implements OnInit {
  plays: Item[]
  title: string = 'Önéletrajz'

  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService,
    private apiService: ApiService,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.plays = this.route.snapshot.data.plays
    this.titleService.setTitle(this.title)

    this.meta.updateTag({
      name: 'description',
      content: this.route.snapshot.data.meta.description
    })
  }

  getTheater(id: number): Observable<Theater> {
    return this.apiService.getTheater(id)
  }
}
