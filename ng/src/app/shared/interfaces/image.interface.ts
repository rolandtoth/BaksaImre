export interface ImageData {
  variants: ImageVariant
  description: string
}

export interface ImageVariant {
  xs: Image
  sm: Image
  md: Image
  lg: Image
}

export interface Image {
  width: number
  height: number
  url: string
}
