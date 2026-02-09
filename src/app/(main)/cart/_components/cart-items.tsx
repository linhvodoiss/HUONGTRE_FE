'use client'

import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '~/contexts/cart-context'
import { formatCurrency } from '~/utils/price-convert'

interface CartItemsProps {
  onEditItem: (index: number) => void
}

export default function CartItems({ onEditItem }: CartItemsProps) {
  const { cart, removeFromCart, clearCart } = useCart()


  return (
    <div className='rounded-lg bg-white p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='font-bold uppercase'>MÓN ĐÃ CHỌN</h3>
        {cart.length > 0 && (
          <button 
            onClick={clearCart}
            className='text-sm text-gray-500 hover:text-red-600 underline'
          >
            Xóa tất cả
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className='py-8 text-center'>
          <p className='text-lg text-gray-500'>Giỏ hàng đang trống</p>
          <Link
            href='/menu'
            className='mt-4 inline-block rounded-lg bg-pink-400 px-6 py-2 text-white hover:bg-pink-500'
          >
            Thêm món ngay
          </Link>
        </div>
      ) : (
        <>
          <div className='space-y-4'>
            {cart.map((item, index) => (
              <div key={index} className='border-b pb-4 last:border-0'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='flex items-start gap-2'>
                      <span className='font-semibold'>
                        {item.quantity} x {item.product.name}
                      </span>
                      <div className="flex gap-3 ml-2">
                        <button
                          onClick={() => onEditItem(index)}
                          className='text-blue-500 hover:text-blue-700'
                          title="Sửa món"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => removeFromCart(index)}
                          className='text-gray-400 hover:text-red-600'
                          title="Xóa món"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    {Object.keys(item.selectedOptions).length > 0 && (
                      <div className='mt-1 text-sm text-gray-500'>
                        {Object.entries(item.selectedOptions).map(([groupId, optionIds]) => {
                          const group = item.product.optionGroups?.find(g => String(g.id) === groupId)
                          if (!group) return null
                          return (
                            <div key={groupId}>
                              + {group.name}:{' '}
                              {optionIds
                                .map(optionId => {
                                  const option = group.options?.find(o => String(o.id) === optionId)
                                  return option?.name
                                })
                                .join(', ')}
                            </div>
                          )
                        })}
                      </div>
                    )}
                    {item.note && <p className='mt-1 text-sm text-gray-500'>+ {item.note}</p>}
                  </div>
                  <span className='font-semibold'>{formatCurrency(item.totalPrice)}</span>
                </div>
              </div>
            ))}
          </div>

          <textarea
            className='mt-4 w-full rounded-lg border bg-gray-50 p-3 text-sm outline-none placeholder:text-gray-400'
            placeholder='Ghi chú cho đơn hàng: ví dụ, Giao nhanh giúp tôi...'
            rows={3}
          />
        </>
      )}
    </div>
  )
}
