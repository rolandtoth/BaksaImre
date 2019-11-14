import {ItemType} from '../shared/pipes/item-type.enum'
import {Injectable} from '@angular/core'
import {Resolve} from '@angular/router'
import {ApiService} from './api.service'
import {map} from 'rxjs/operators'

@Injectable()
export class PlaysResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve() {
    return this.apiService
      .getData()
      .pipe(map(data => data.items.filter(x => x.template === ItemType.Play)))
  }
}
