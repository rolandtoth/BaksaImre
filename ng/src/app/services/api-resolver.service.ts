import {Injectable} from '@angular/core'
import {Resolve} from '@angular/router'
import {ApiService} from './api.service'

@Injectable()
export class ApiResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve() {
    return this.apiService.getData()
  }
}
