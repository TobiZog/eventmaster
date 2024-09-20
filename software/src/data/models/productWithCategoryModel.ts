import { CategoryModel } from "./categoryModel"

export class ProductWithCategoryModel {
  id: number = -1
  brand: string
  name: string
  description: string = ""
  category: CategoryModel = new CategoryModel()
  price: number = 0
  discount: number = 0
  rating: number = 1
  images: Array<string> = [""]
}