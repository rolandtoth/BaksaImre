import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'
import {ItemType} from '../shared/pipes/item-type.enum'

@Injectable()
export class DataService {
  private filterBySource = new BehaviorSubject(ItemType.All)
  private filterByYearSource = new BehaviorSubject(null)

  currentFilterBy = this.filterBySource.asObservable()
  currentFilterByYear = this.filterByYearSource.asObservable()

  constructor() {}

  changeFilterBy(type: ItemType): void {
    this.filterBySource.next(type)
  }

  getFilterBy(): ItemType {
    return this.filterBySource.getValue()
  }

  changeFilterByYear(year: number): void {
    this.filterByYearSource.next(year)
  }

  getFilterByYear(): number | null {
    return this.filterByYearSource.getValue()
  }
}
