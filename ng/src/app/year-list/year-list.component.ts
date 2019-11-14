import {Component, OnInit, OnChanges, Input} from '@angular/core'
import {ApiService} from './../services/api.service'
import {DataService} from '../services/data.service'
import {ItemType} from '../shared/pipes/item-type.enum'

@Component({
  selector: 'year-list',
  templateUrl: './year-list.component.html'
})
export class YearListComponent implements OnInit, OnChanges {
  years: number[] = []
  currentYear?: number
  @Input() filterBy: ItemType

  constructor(private apiService: ApiService, private data: DataService) {}

  ngOnInit() {
    this.data.currentFilterBy.subscribe(type => (this.filterBy = type))
    this.data.currentFilterByYear.subscribe(year => (this.currentYear = year))
  }

  ngOnChanges() {
    this.updateFilterByYear()
  }

  getYears(filter: ItemType = ItemType.All): number[] {
    let years: number[] = []

    this.apiService
      .getData()
      .subscribe(data =>
        data.items
          .filter(item => (filter ? item.template === filter : item))
          .map(item => years.push(item.year))
      )

    return [...new Set(years)]
  }

  filterByYear(value?: number) {
    this.data.changeFilterByYear(value === this.currentYear ? null : value)
    this.currentYear = this.data.getFilterByYear()
  }

  updateFilterByYear() {
    this.years = this.getYears(this.data.getFilterBy())
    this.currentYear = this.data.getFilterByYear()
  }
}
