import {Component, OnInit, Input} from '@angular/core'

declare let require: any

// usage
// <svg-icon [name]="'mail'"></svg-icon>

@Component({
  selector: 'svg-icon',
  template: `
    <div [outerHTML]="icon | safe:'html'"></div>
  `
})
export class SvgIconComponent implements OnInit {
  @Input() name: string
  icon: string = ''

  constructor() {}

  ngOnInit() {
    let icon = require(`!!raw-loader?!../../../icons/${this.name}.svg`)

    this.icon = icon ? icon['default'] : ''
  }
}
