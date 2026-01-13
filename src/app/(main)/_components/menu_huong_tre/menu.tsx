import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ThemeChange from '~/app/_components/theme-change'

export default function MenuHuongTre() {
  return (
    <div className='grid grid-cols-12 gap-4 bg-gray-100'>
      <div className='bg-primary-foreground col-span-12 grid h-75 w-full grid-cols-12 rounded-md p-5'>
        <div className='col-span-6 overflow-hidden'>
          <Image
            className='w-full object-cover'
            alt='background'
            src='/images/bg_tiem_huong_tre.jpg'
            width={2048}
            height={1448}
          ></Image>
        </div>
        <div className='col-span-4'></div>
        <div className='col-span-2 w-full'>
          <div className='w-full flex items-center justify-end gap-4'>
            <ThemeChange className='!bg-primary-system rounded-full' />
            <Link href='/' className='px-4 py-2 rounded-lg shadow-md border'>Đơn hàng</Link>
          </div>
        </div>
      </div>
      <div className='bg-primary-foreground col-span-2 rounded-md p-5'></div>
      <div className='bg-primary-foreground col-span-7 rounded-md p-5'></div>
      <div className='bg-primary-foreground col-span-3 rounded-md p-5'></div>
    </div>
  )
}
