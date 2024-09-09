import { ProductModel } from "@/data/models/productModel";

export function calcProductPrice(product: ProductModel): number {
  return Math.round(product.price * ((100 - product.discount) / 100) * 100) / 100
} 