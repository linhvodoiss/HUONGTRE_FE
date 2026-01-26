import { Key } from "react"
import { OptionGroupResponse } from "./option-groups"

export type ProductResponse = {
  id: Key
  price:number
  name: string
  description: string
  imageUrl:string
  isActive: boolean
  createdAt: string
  updatedAt: string
  optionGroups:OptionGroupResponse[]
}
