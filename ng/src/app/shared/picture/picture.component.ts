import {Image} from './../interfaces/image.interface'
import {Component, OnInit, Input} from '@angular/core'

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html'
})
export class PictureComponent implements OnInit {
  @Input() img: Image
  @Input() alt: string

  constructor() {}

  ngOnInit() {}
}
