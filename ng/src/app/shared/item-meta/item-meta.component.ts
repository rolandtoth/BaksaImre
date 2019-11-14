import {Component, OnInit, Input} from '@angular/core'
import {Item} from './../interfaces/item.interface'

@Component({
  selector: 'item-meta',
  templateUrl: './item-meta.component.html'
})
export class ItemMetaComponent implements OnInit {
  @Input() item: Item

  constructor() {}

  ngOnInit() {}
}
