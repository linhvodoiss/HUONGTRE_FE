'use client'
import { CategoryResponse } from '#/category'
import { ProductResponse } from '#/product'
import { Search, Trash2, Pencil } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import ProductDetailModal from './product-detail-modal'
import { formatCurrency } from '~/utils/price-convert'
import { useCart, type CartItem } from '~/contexts/cart-context'

export default function MenuHuongTre({ data }: { data: CategoryResponse[] }) {
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [editingCartIndex, setEditingCartIndex] = useState<number | null>(null)
  const router = useRouter()
  
  // Sử dụng Cart Context
  const { cart, addToCart, removeFromCart, updateCartItem, clearCart, totalCartPrice } = useCart()

  const editCartItem = (index: number) => {
    const item = cart[index]
    setSelectedProduct(item.product)
    setEditingCartIndex(index)
    setTimeout(() => setIsVisible(true), 10)
  }

  const handleUpdateCartItem = (updatedItem: CartItem) => {
    if (editingCartIndex === null) return
    updateCartItem(editingCartIndex, updatedItem)
    closeModal()
  }

  const closeModal = () => {
    setIsVisible(false)
    setTimeout(() => {
      setSelectedProduct(null)
      setEditingCartIndex(null)
    }, 300)
  }

  const handleContinue = () => {
    router.push('/cart')
  }


  return (
    <div className='grid grid-cols-12 gap-4 bg-gray-100'>
      <div className='col-span-12 grid h-78 grid-cols-12 gap-4 rounded-md bg-white p-5'>
        <div className='col-span-5 overflow-hidden'>
          <Image
            className='h-full w-full object-cover'
            alt='background'
            src='/images/bg_tiem_huong_tre.jpg'
            width={2048}
            height={1448}
          />
        </div>
        <div className='col-span-7'>
          <div className='flex w-full items-center justify-between'>
            <p>Danh sách cửa hàng</p>
            <Link href='/' className='rounded-lg border px-4 py-2 text-black shadow-md'>
              Đơn hàng
            </Link>
          </div>
          <h1 className='mt-3 text-3xl font-semibold text-black uppercase'>Hương Trè - Hà Đông</h1>
          <p className='mt-3 text-base text-green-500'>Đang mở cửa</p>
          <p className='mt-2 text-base text-gray-500'>174 Nguyễn Viết Xuân, Hà Cầu, Hà Đông, Hà Nội</p>
          <p className='mt-2 text-base text-gray-500'>Giờ mở cửa: 08:00 - 21:45</p>
          <p className='mt-2 text-base text-gray-500'>Số điện thoại cửa hàng: 0933769933</p>
          <p className='mt-2 rounded-lg border bg-gray-100 px-4 py-2'>Voucher giảm giá 100%</p>
        </div>
      </div>

      <div className='col-span-2'>
        <div className='sticky top-4 rounded-md bg-white px-3 py-3'>
          Menu
          <div className='mt-3'>
            {data?.map(item => (
              <div
                className='cursor-pointer rounded-md px-2 py-2 uppercase hover:bg-gray-100'
                key={item.id}
                onClick={() => {
                  if (!item.id) return

                  categoryRefs.current[String(item.id)]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  })
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='col-span-6 min-h-[2000px] rounded-md bg-white px-5 py-3'>
        <div className='relative w-full rounded-lg border bg-gray-100'>
          <Search size={18} className='center-y absolute left-2' />
          <input
            className='w-full px-8 py-2 outline-none'
            type='text'
            name=''
            id=''
            placeholder='Bạn đang cần tìm món ăn gì ?'
          />
        </div>
        {data?.map(item => (
          <div
            className='scroll-mt-12 py-4'
            key={item.id}
            ref={el => {
              if (!item.id) return
              categoryRefs.current[String(item.id)] = el
            }}
          >
            <p className='font-semibold uppercase'>{item.name}</p>

            {(item.products ?? []).length > 0 ? (
              item?.products?.map(itemProduct => (
                <div
                  className='flex items-center justify-start rounded-md pt-2 hover:bg-gray-100'
                  key={itemProduct.id}
                  onClick={() => {
                    setSelectedProduct(itemProduct)
                    setTimeout(() => setIsVisible(true), 10)
                  }}
                >
                  <div className='h-20 w-20 overflow-hidden rounded-md'>
                    <Image
                      src='/images/tra-sua-tran-chau-hoang-kim.png'
                      width={100}
                      height={100}
                      className='size-full object-cover'
                      alt='image product'
                    />
                  </div>

                  <div className='w-full flex-1'>
                    <p className='font-semibold capitalize'>{itemProduct.name}</p>
                    <p className='line-clamp-2 text-sm text-gray-500'>{itemProduct.description}</p>
                    <p className='py-3 text-sm font-semibold text-pink-400'>{formatCurrency(itemProduct.price)}</p>
                  </div>

                  <button className='relative h-8 w-8 self-end rounded-full bg-pink-400 text-2xl text-white'>
                    <span className='center-x center-y absolute -translate-y-[55%] cursor-pointer'>+</span>
                  </button>
                </div>
              ))
            ) : (
              <p className='mt-2 text-sm text-gray-400 italic'>Danh mục này chưa có sản phẩm</p>
            )}
          </div>
        ))}
      </div>

      <div className='col-span-4'>
        <div className='sticky top-4 rounded-md bg-white px-5 pb-6'>
          {cart.length === 0 ? (
            <>
              <div className='w-full aspect-[832/600] overflow-hidden rounded-md'>
                <Image
                  src='/images/cart_cat.jpg'
                  width={832}
                  height={600}
                  className='size-full object-cover'
                  alt='image product'
                />
              </div>
              <div className='mt-3'>
                <p className='text-lg font-semibold text-center text-gray-500'>Chưa có sản phẩm trong giỏ hàng</p>
              </div>
            </>
          ) : (
            <>
              <div className='flex justify-between items-center mb-4 pt-3'>
                <h2 className='text-xl font-semibold'>Giỏ hàng của bạn</h2>
                <button
                  onClick={clearCart}
                  className='p-2 text-red-500 hover:bg-red-50 rounded transition-colors'
                  title='Xóa tất cả'
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <div className='max-h-[500px] overflow-y-auto'>
                {cart.map((item, index) => (
                  <div key={index} className='mb-4 pb-4 border-b'>
                    <div className='flex justify-between items-start'>
                      <div className='flex-1'>
                        <p className='font-semibold'>{item.product.name}</p>
                        <p className='text-sm text-gray-500'>Số lượng: {item.quantity}</p>
                        {Object.keys(item.selectedOptions).length > 0 && (
                          <div className='text-xs text-gray-400 mt-1'>
                            {Object.entries(item.selectedOptions).map(([groupId, optionIds]) => {
                              const group = item.product.optionGroups?.find(g => String(g.id) === groupId)
                              if (!group) return null
                              return (
                                <div key={groupId}>
                                  <span className='font-medium'>{group.name}: </span>
                                  {optionIds.map(optionId => {
                                    const option = group.options?.find(o => String(o.id) === optionId)
                                    return option?.name
                                  }).join(', ')}
                                </div>
                              )
                            })}
                          </div>
                        )}
                        {item.note && (
                          <p className='text-xs text-gray-400 mt-1'>Ghi chú: {item.note}</p>
                        )}
                        <p className='text-pink-400 font-semibold mt-2'>{formatCurrency(item.totalPrice)}</p>
                      </div>
                      <div className='flex gap-1'>
                        <button
                          onClick={() => editCartItem(index)}
                          className='p-2 text-blue-500 hover:bg-blue-50 rounded transition-colors'
                          title='Chỉnh sửa'
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => removeFromCart(index)}
                          className='p-2 text-red-500 hover:bg-red-50 rounded transition-colors'
                          title='Xóa'
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='mt-4 pt-4'>
                <div className='flex justify-between items-center text-lg font-bold'>
                  <span>Tổng cộng:</span>
                  <span className='text-pink-400'>{formatCurrency(totalCartPrice)}</span>
                </div>
                <button 
                  onClick={handleContinue}
                  className='w-full mt-4 py-3 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition-colors font-semibold'
                >
                  Tiếp tục
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {!!selectedProduct && (
        <ProductDetailModal
          closeModal={closeModal}
          isVisible={isVisible}
          selectedProduct={selectedProduct}
          onAddToCart={addToCart}
          onUpdateCart={handleUpdateCartItem}
          editMode={editingCartIndex !== null}
          initialData={editingCartIndex !== null ? cart[editingCartIndex] : undefined}
        />
      )}
    </div>
  )
}
