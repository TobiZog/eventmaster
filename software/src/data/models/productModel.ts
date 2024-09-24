import { BrandModel } from "./brandModel"
import { CategoryModel } from "./categoryModel"

export class ProductModel {
  id: number = 0
  category: CategoryModel = new CategoryModel()
  brand: BrandModel = new BrandModel()
  name: string = ""
  description: string = ""
  price: number = 0
  discount: number = 0
  rating: number = 1
  inStock: number
  specs: Array<string> = []
  images: Array<string> = [""]
}