// import {ItemTypePipe} from './../shared/pipes/item-type.pipe'
// import {ItemType} from './../shared/pipes/item-type.enum'
import {Injectable} from '@angular/core'
import {Resolve, ActivatedRouteSnapshot} from '@angular/router'
import {ApiService} from './api.service'
import {map} from 'rxjs/operators'

@Injectable()
export class ItemResolver implements Resolve<any> {
  constructor(
    private apiService: ApiService // private itemTypePipe: ItemTypePipe
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    let name: string = route.paramMap.get('name')
    // let template: ItemType = ItemType.Play

    // switch (route.paramMap.get('type')) {
    //   case this.itemTypePipe.transform(ItemType.Critic, true):
    //     template = ItemType.Critic
    //     break
    //   case this.itemTypePipe.transform(ItemType.Interview, true):
    //     template = ItemType.Interview
    //     break
    // }

    return this.apiService.getData().pipe(
      map(data =>
        // data.items.find(x => x.template === template && x.name === name)
        // data.items.find(x => x.name === name)
        data.items.find(x => x.template === route.data.type && x.name === name)
      )
    )
  }
}
