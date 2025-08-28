import type { ICategory } from "../interfaces/category"
import data from "./data.json"
import { plates } from "./plates"

export const categories: ICategory[] = data.categories

export const availableCategories: ICategory[] = categories.filter(category => plates.some(plate => plate.categoryId === category.id))