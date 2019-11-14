import {Pipe, PipeTransform} from '@angular/core'
import {ItemType} from './item-type.enum'

@Pipe({
  name: 'itemType'
})
export class ItemTypePipe implements PipeTransform {
  transform(value: string, slugify: boolean = false): string {
    if (value === ItemType.Play) {
      return slugify ? 'eloadas' : 'előadás'
    }
    if (value === ItemType.Critic) {
      return 'kritika'
    }
    if (value === ItemType.Interview) {
      return slugify ? 'interju' : 'interjú'
    }

    return ItemType.All
  }
}
