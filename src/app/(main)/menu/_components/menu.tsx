'use client'
import { CategoryResponse } from '#/category'
import { ProductResponse } from '#/product'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import ProductDetailModal from './product-detail-modal'
import { formatCurrency } from '~/utils/price-convert'

export default function MenuHuongTre({ data }: { data: CategoryResponse[] }) {
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const closeModal = () => {
    setIsVisible(false)
    setTimeout(() => setSelectedProduct(null), 300)
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
        <div className='sticky top-4 rounded-md bg-white px-5 pt-3 pb-6'>

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
        </div>
      </div>
      {!!selectedProduct && (
        <ProductDetailModal closeModal={closeModal} isVisible={isVisible} selectedProduct={selectedProduct} />
      )}
    </div>
  )
}
