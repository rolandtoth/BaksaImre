import {Pipe, PipeTransform} from '@angular/core'

const sizes: {[key: string]: number[]} = {
  sm: [192, 128],
  md: [480, 320],
  lg: [1280, 960]
}

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {
  transform(path: string, field: string, size: string): any {
    let [width, height] = sizes[size]
    return encodeURI(
      `/pw/api/image?path=${path}&field=${field}&w=${width}&h=${height}`
    )
  }
}
