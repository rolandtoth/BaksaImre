import {ItemTypePipe} from './../shared/pipes/item-type.pipe'
import {Component, OnInit, OnChanges, Input} from '@angular/core'
import {ItemType} from '../shared/pipes/item-type.enum'
import {DataService} from '../services/data.service'
import {Item} from '../shared/interfaces/item.interface'

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit, OnChanges {
  @Input() items: Item[]
  @Input() filterBy: ItemType
  @Input() filterByYear: number
  visibleItems: Item[] = []

  constructor(private data: DataService, private itemTypePipe: ItemTypePipe) {}

  ngOnInit() {
    this.data.currentFilterBy.subscribe(type => (this.filterBy = type))
    this.data.currentFilterByYear.subscribe(year => (this.filterByYear = year))
  }

  ngOnChanges() {
    if (this.items) {
      this.filterItems(this.filterBy, this.filterByYear)
    }
  }

  changeFilterBy(value: ItemType) {
    this.filterBy = value
    this.data.changeFilterBy(value)
  }

  getRole(item: Item) {
    let role: string = ''

    if (item.template === ItemType.Play) {
      if (item.role === 'actor' && item.figure) {
        role = item.figure + ' szerepében'
      } else {
        role = 'rendezés'
      }
    } else {
      role = this.itemTypePipe.transform(item.template)
    }

    return role
  }

  filterItems(type: ItemType, year?: number) {
    if (type === ItemType.All) {
      this.visibleItems = this.items.slice(0)
    } else {
      this.visibleItems = this.items.filter(item => {
        return item.template === type
      })
    }

    if (year) {
      let filteredItems = this.visibleItems.filter(item => {
        return item.year === year
      })

      if (filteredItems.length > 0) {
        this.visibleItems = filteredItems
      }
    }
  }
}
