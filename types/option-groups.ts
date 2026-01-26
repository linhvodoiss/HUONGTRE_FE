import { Key } from "react"
import { OptionResponse } from "./option"

export type OptionGroupResponse = {
  id: Key
  name: string
  selectType: "SINGLE" | "MULTIPLE"
  required: boolean
  minSelect: number
  maxSelect: number
  displayOrder: number
  description: string
  imageUrl: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  options:OptionResponse[]
}
