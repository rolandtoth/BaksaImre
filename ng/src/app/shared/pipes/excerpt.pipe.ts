import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'excerpt',
  pure: false
})
export class ExcerptPipe implements PipeTransform {
  transform(text: String, length: any = 200): any {
    if (!text) {
      return text
    }
    if (text.length > length + 3) {
      return text.substr(0, length) + '...'
    }
    return text
  }
}
