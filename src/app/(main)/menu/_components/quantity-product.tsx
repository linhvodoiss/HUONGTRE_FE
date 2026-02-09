// components/quantity-product.tsx
import { Minus, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ProductQuantitySelectorProps {
  initialQuantity?: number
  maxQuantity: number // THÊM PROP NÀY: Hàm callback để gửi giá trị quantity hiện tại lên component cha
  onQuantityChange: (newQuantity: number) => void
  className?: string
  classSubtractionName?: string
  classCountName?: string
  classAddName?: string
}

export function QuantityProduct({
  initialQuantity = 1,
  maxQuantity,
  onQuantityChange,
  className,
  classSubtractionName,
  classCountName,
  classAddName,
}: ProductQuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  // Sync quantity state khi initialQuantity thay đổi (cho edit mode)
  useEffect(() => {
    setQuantity(initialQuantity)
  }, [initialQuantity])

  const updateQuantityState = (newQuantity: number) => {
    setQuantity(newQuantity)
    onQuantityChange(newQuantity)
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(maxQuantity, quantity + delta))
    updateQuantityState(newQuantity)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)

    let newQuantity: number

    if (isNaN(value) || value <= 0) {
      newQuantity = 1
    } else if (value > maxQuantity) {
      newQuantity = maxQuantity
    } else {
      newQuantity = value
    }

    updateQuantityState(newQuantity)
  }

  return (
    <div
      className={`-ml-4 flex scale-75 items-center justify-between bg-white text-2xl font-semibold text-gray-800 ${className}`}
      style={{ flex: '0 0 auto', borderRadius: '9999px' }}
    >
      <button
        onClick={() => handleQuantityChange(-1)}
        className={`cursor-pointer aspect-square w-16 rounded-full text-center transition-colors bg-gray-200 disabled:opacity-50 ${classSubtractionName}`}
        disabled={quantity <= 1}
        type='button'
      >
        <Minus size={24} className='block aspect-square w-full' strokeWidth={3} />
      </button>
      <input
        type='number'
        min={1}
        max={maxQuantity}
        value={quantity}
        onChange={handleInputChange}
        className={`w-16 [appearance:textfield] p-3 text-center text-2xl font-semibold text-gray-800 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${classCountName}`}
        aria-label='Số lượng'
      />
      <button
        onClick={() => handleQuantityChange(1)}
        className={`cursor-pointer aspect-square w-16 rounded-full text-center transition-colors bg-gray-200 disabled:opacity-50 ${classAddName}`}
        disabled={quantity >= maxQuantity}
        type='button'
      >
        <Plus size={24} className='w-full' strokeWidth={3} />
      </button>
    </div>
  )
}
