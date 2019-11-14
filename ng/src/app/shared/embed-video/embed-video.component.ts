import {Component, OnInit, Input} from '@angular/core'
import {VideoService} from 'src/app/services/video.service'
import {VideoData} from '../interfaces/videodata.interface'

@Component({
  selector: 'embed-video',
  templateUrl: './embed-video.component.html'
})
export class EmbedVideoComponent implements OnInit {
  @Input() url: string
  @Input() width: number
  @Input() height: number
  @Input() autoplay: boolean = true
  videoData: VideoData

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videoService.getVideoData(this.url).subscribe(data => {
      data.ratio = data.height / data.width

      if (this.autoplay) {
        data.html = this.addAutoPlayParam(data.html)
      }

      this.videoData = data
    })
  }

  replaceImage($event: MouseEvent) {
    ;($event.currentTarget as HTMLDivElement).outerHTML = this.videoData.html
  }

  addAutoPlayParam(markup) {
    let temp = document.createElement('div')

    temp.innerHTML = markup

    temp
      .querySelector('iframe')
      .setAttribute(
        'src',
        temp.querySelector('iframe').getAttribute('src') + '&autoplay=1'
      )

    return temp.innerHTML
  }
}
