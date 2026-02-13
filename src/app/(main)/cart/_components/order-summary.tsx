'use client'

import { useCart } from '~/contexts/cart-context'
import { formatCurrency } from '~/utils/price-convert'

interface OrderSummaryProps {
  shippingFee: number
  onOrder: () => void
}

export default function OrderSummary({ shippingFee, onOrder }: OrderSummaryProps) {
  const { cart, totalCartPrice } = useCart()

  return (
    <div className='sticky top-4 rounded-lg bg-white p-4'>
      <div className='space-y-3'>
        <div className='flex justify-between text-sm'>
          <span>Tổng cộng {cart.length} phần</span>
          <span>{formatCurrency(totalCartPrice)}</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span>Phương thức vận chuyển (0km)</span>
          <span>{formatCurrency(shippingFee)}</span>
        </div>
        <div className='border-t pt-3'>
          <div className='flex justify-between text-lg font-bold'>
            <span>Tiền phải thanh toán</span>
            <span className='text-pink-500'>{formatCurrency(totalCartPrice + shippingFee)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onOrder}
        disabled={cart.length === 0}
        className={`mt-4 w-full rounded-lg py-3 font-semibold text-white transition-colors ${
          cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-400 hover:bg-pink-500'
        }`}
      >
        Bạn muốn đặt hàng?
      </button>
    </div>
  )
}
