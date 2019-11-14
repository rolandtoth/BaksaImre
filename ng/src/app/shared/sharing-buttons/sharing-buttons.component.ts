import {Component, OnInit, Input} from '@angular/core'

@Component({
  selector: 'sharing-buttons',
  templateUrl: './sharing-buttons.component.html'
})
export class SharingButtonsComponent implements OnInit {
  facebook: boolean = true
  twitter: boolean = true
  email: boolean = true

  @Input() url: string
  @Input() text: string
  @Input() tags: string

  constructor() {}

  ngOnInit() {
    this.text = encodeURIComponent(this.text)
  }
}
