import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function MenuHuongTre() {
  return (
    <div className='grid grid-cols-12 gap-4 bg-gray-100'>
      {/* Header cửa hàng */}
      <div className='col-span-12 grid grid-cols-12 gap-4 rounded-md bg-white p-5 h-78'>
        <div className='col-span-5 overflow-hidden'>
          <Image
            className='w-full h-full object-cover'
            alt='background'
            src='/images/bg_tiem_huong_tre.jpg'
            width={2048}
            height={1448}
          />
        </div>
        <div className='col-span-7'>
          <div className='flex w-full items-center justify-between'>
            <p>Danh sách cửa hàng</p>
            <Link href='/' className='rounded-lg border px-4 py-2 shadow-md text-black'>
              Đơn hàng
            </Link>
          </div>
          <h1 className='mt-3 text-3xl font-semibold uppercase text-black'>Hương Trè - Hà Đông</h1>
          <p className='mt-3 text-base text-green-500'>Đang mở cửa</p>
          <p className='mt-2 text-base text-gray-500'>174 Nguyễn Viết Xuân, Hà Cầu, Hà Đông, Hà Nội</p>
          <p className='mt-2 text-base text-gray-500'>Giờ mở cửa: 08:00 - 21:45</p>
          <p className='mt-2 text-base text-gray-500'>Số điện thoại cửa hàng: 0933769933</p>
          <p className='mt-2 rounded-lg border px-4 py-2 bg-gray-100'>Voucher giảm giá 100%</p>
        </div>
      </div>

      <div className='col-span-2'>
        <div className='sticky top-4 rounded-md bg-white px-5 py-3'>Menu</div>
      </div>

      <div className='col-span-6 min-h-[2000px] rounded-md bg-white px-5 py-3'>
        <div className='w-full rounded-lg border bg-gray-100 relative'>
          <Search size={18} className='absolute left-2 center-y'/>
        <input className='px-8 py-2 w-full outline-none' type="text" name="" id="" placeholder='Bạn đang cần tìm món ăn gì ?' />
        </div>
      </div>

      <div className='col-span-4'>
         <div className='sticky top-4 rounded-md bg-white px-5 py-3'>Giỏ hàng</div>
      </div>
    </div>
  )
}
