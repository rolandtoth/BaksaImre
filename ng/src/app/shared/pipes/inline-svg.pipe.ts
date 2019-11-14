import {Pipe, PipeTransform} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'

declare let require: any

// usage
// <svg [outerHTML]="'mail' | inlineSvg"></svg>

@Pipe({
  name: 'inlineSvg'
  // pure: false
})
export class InlineSvgPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(name: string): any {
    let icon = require(`!!raw-loader?!../../../icons/${name}.svg`)

    return this.sanitizer.bypassSecurityTrustHtml(icon ? icon['default'] : '')
  }
}
