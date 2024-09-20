export class ProductModel {
  id: number = -1
  brand: string
  name: string
  description: string = ""
  categoryId: number
  price: number = 0
  discount: number = 0
  rating: number = 1
  images: Array<string> = [""]
}