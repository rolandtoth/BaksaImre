import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {ItemType} from '../shared/pipes/item-type.enum'
import {DataService} from '../services/data.service'
import {Item} from '../shared/interfaces/item.interface'

@Component({
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit {
  message: string
  items: Item[]
  filterBy: ItemType = ItemType.All
  filterByYear?: number

  constructor(private route: ActivatedRoute, private data: DataService) {}

  ngOnInit() {
    this.items = this.route.snapshot.data['data']['items']
    this.data.currentFilterBy.subscribe(type => (this.filterBy = type))
    this.data.currentFilterByYear.subscribe(year => (this.filterByYear = year))
  }
}
