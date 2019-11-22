import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {AppSettings} from '../shared/app-settings'
import {DataService} from '../services/data.service'
import {ItemType} from '../shared/pipes/item-type.enum'

interface NavItems {
  type: ItemType
  name: string
}

@Component({
  selector: 'masthead',
  templateUrl: './masthead.component.html'
})
export class MastheadComponent {
  siteName: string = AppSettings.siteName
  slogan: string = AppSettings.slogan
  currentFilter: ItemType = ItemType.All

  constructor(private data: DataService, private router: Router) {}

  setFilterBy(value: ItemType) {
    if (this.router.url !== '/') {
      this.currentFilter = value
      this.data.changeFilterBy(value)
      this.router.navigate(['/'])
    } else {
      this.data.changeFilterBy(
        value === this.currentFilter ? ItemType.All : value
      )
      this.currentFilter = this.data.getFilterBy()
    }
    window.scrollTo(0, 0)
  }

  resetFilters() {
    this.currentFilter = ItemType.All
    this.data.changeFilterBy(ItemType.All)
    this.data.changeFilterByYear(null)
    window.scrollTo(0, 0)
  }

  nav: NavItems[] = [
    {
      type: ItemType.Play,
      name: 'Előadás'
    },
    {
      type: ItemType.Critic,
      name: 'Kritika'
    },
    {
      type: ItemType.Interview,
      name: 'Interjú'
    }
  ]
}
