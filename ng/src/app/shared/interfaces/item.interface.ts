import {Theater} from './theater.interface'
import {ImageData} from './image.interface'
import {Premier} from './premier.interface'

export interface Item {
  id: number
  name: string
  title: string
  role: string
  figure: string
  template: string
  intro: string
  prependIntro: boolean
  body: string
  path: string
  premier: Premier
  created: number
  link: string
  year: number
  play_ref_id: number
  featured_image: ImageData
  images: ImageData[]
  photographer: string[]
  author: string
  videos: string[]
  theater: Theater
  seo_description: string
}
