'use client'

import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CustomerInfo } from './types'

interface CustomerInfoModalProps {
  isVisible: boolean
  onClose: () => void
  initialData: CustomerInfo
  onSave: (data: CustomerInfo) => void
  deliveryMethod: 'delivery' | 'pickup'
}

export default function CustomerInfoModal({
  isVisible,
  onClose,
  initialData,
  onSave,
  deliveryMethod
}: CustomerInfoModalProps) {
  const [tempCustomerInfo, setTempCustomerInfo] = useState<CustomerInfo>(initialData)

  useEffect(() => {
    if (isVisible) {
      setTempCustomerInfo(initialData)
    }
  }, [isVisible, initialData])

  if (!isVisible) return null

  const handleSave = () => {
    onSave(tempCustomerInfo)
    onClose()
  }

  return (
    <div 
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
      onClick={onClose}
    >
      <div 
        className='w-full max-w-lg rounded-xl bg-white animate-in zoom-in-95 duration-200'
        onClick={e => e.stopPropagation()}
      >
        <div className='flex items-center border-b p-4'>
          <button onClick={onClose} className='mr-2 p-1 hover:bg-gray-100 rounded-full'>
            <ArrowLeft size={20} />
          </button>
          <h2 className='text-lg font-bold flex-1 text-center pr-8'>Thông tin giao hàng</h2>
        </div>
        
        <div className='p-4 space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='mb-1 block text-sm font-medium'>Tên người nhận</label>
              <input 
                className='w-full rounded-md border border-gray-300 p-2.5 outline-none focus:border-red-500'
                placeholder='Tên người nhận'
                value={tempCustomerInfo.name}
                onChange={(e) => setTempCustomerInfo({...tempCustomerInfo, name: e.target.value})}
              />
            </div>
            <div>
              <label className='mb-1 block text-sm font-medium'>Số điện thoại</label>
              <input 
                className='w-full rounded-md border border-gray-300 p-2.5 outline-none focus:border-red-500'
                placeholder='Số điện thoại'
                value={tempCustomerInfo.phone}
                onChange={(e) => setTempCustomerInfo({...tempCustomerInfo, phone: e.target.value})}
              />
            </div>
          </div>
          
          {deliveryMethod === 'delivery' && (
            <>
              <div>
                <label className='mb-1 block text-sm font-medium'>Địa chỉ nhận hàng</label>
                <input 
                  className='w-full rounded-md border border-gray-300 p-2.5 outline-none focus:border-red-500'
                  placeholder='Địa chỉ nhận hàng, số nhà, tên đường...'
                  value={tempCustomerInfo.address}
                  onChange={(e) => setTempCustomerInfo({...tempCustomerInfo, address: e.target.value})}
                />
              </div>
              
              <div>
                <input 
                  className='w-full rounded-md border border-gray-300 p-2.5 outline-none focus:border-red-500'
                  placeholder='Thêm địa chỉ chi tiết: Số nhà, ngõ, nghách hoặc Tòa nhà...'
                  value={tempCustomerInfo.detail}
                  onChange={(e) => setTempCustomerInfo({...tempCustomerInfo, detail: e.target.value})}
                />
              </div>
            </>
          )}

        </div>
        
        <div className='border-t p-4'>
          <button 
            onClick={handleSave}
            className='w-full rounded-lg bg-red-700 py-3 font-semibold text-white hover:bg-red-800'
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  )
}
