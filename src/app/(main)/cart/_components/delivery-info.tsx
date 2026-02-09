'use client'

import { CustomerInfo, DeliveryTime } from './types'

interface DeliveryInfoProps {
  customerInfo: CustomerInfo
  deliveryTime: DeliveryTime
  onOpenCustomerModal: () => void
  onOpenTimeModal: () => void
}

export default function DeliveryInfo({
  customerInfo,
  deliveryTime,
  onOpenCustomerModal,
  onOpenTimeModal
}: DeliveryInfoProps) {
  return (
    <div className='mb-4 rounded-lg bg-white p-6'>
      <div className='relative border-l-2 border-dashed border-gray-300 ml-1.5 space-y-8'>
        
        {/* Store Info Point - Red */}
        <div className='relative pl-6'>
          <div className='absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-red-500 ring-4 ring-white'></div>
          <div>
            <h3 className='font-semibold text-gray-800 uppercase'>CS1 - Hương trè Văn Phú</h3>
            <p className='text-sm text-gray-600 mt-1'>141 Nguyễn Viết Xuân, Hà Cầu, Hà Đông, Hà Nội</p>
          </div>
        </div>

        {/* Customer Info Point - Green */}
        <div className='relative pl-6'>
          <div className='absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-green-500 ring-4 ring-white'></div>
          <div className='flex justify-between items-start'>
            <div>
              <h3 className='font-medium text-gray-700'>Thông tin người nhận</h3>
              {customerInfo.name || customerInfo.phone || customerInfo.address ? (
                <div className='mt-1 text-sm text-gray-900 font-semibold'>
                  <p>{customerInfo.name} - {customerInfo.phone}</p>
                  <p className='font-normal text-gray-600'>{customerInfo.address}</p>
                  {customerInfo.detail && <p className='italic font-normal text-gray-500'>{customerInfo.detail}</p>}
                </div>
              ) : (
                <p className='text-sm text-gray-400 italic'>Chưa có thông tin</p>
              )}
            </div>
            <button onClick={onOpenCustomerModal} className='text-sm text-red-500 hover:underline'>
              Sửa
            </button>
          </div>
        </div>

        {/* Time Point */}
        <div className='relative pl-6'>
           <div className='absolute -left-[9px] top-1 bg-white'>
              <div className='h-4 w-4 rounded-full bg-gray-400 flex items-center justify-center text-[8px] text-white'>🕒</div>
           </div>
           
           <div className='flex justify-between items-start'>
            <div>
                <h3 className='font-medium text-gray-700'>Thời gian muốn nhận</h3>
                <p className='text-sm text-gray-500 mt-1'>
                    {deliveryTime.isAsap
                    ? 'Càng sớm càng tốt'
                    : `Hôm nay, ${deliveryTime.hour}:${deliveryTime.minute}`}
                </p>
            </div>
            <button onClick={onOpenTimeModal} className='text-sm text-red-500 hover:underline'>Sửa</button>
           </div>
        </div>

      </div>
    </div>
  )
}
