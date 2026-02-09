'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export type PaymentMethod = 'COD' | 'MOMO' | null

interface PaymentMethodModalProps {
  isVisible: boolean
  onClose: () => void
  initialData: PaymentMethod
  onSave: (method: 'COD' | 'MOMO') => void
}

export default function PaymentMethodModal({
  isVisible,
  onClose,
  initialData,
  onSave
}: PaymentMethodModalProps) {
  const [tempPaymentMethod, setTempPaymentMethod] = useState<PaymentMethod>(initialData)

  useEffect(() => {
    if (isVisible) {
      setTempPaymentMethod(initialData)
    }
  }, [isVisible, initialData])

  if (!isVisible) return null

  const handleSave = () => {
    if (!tempPaymentMethod) {
       toast.error("Vui lòng chọn một phương thức thanh toán!")
       return
    }
    onSave(tempPaymentMethod)
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
        <div className='p-5 border-b'>
          <h2 className='text-lg font-bold'>Phương thức thanh toán</h2>
        </div>
        
        <div className='p-4 space-y-3'>
          <label className='flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50'>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${tempPaymentMethod === 'COD' ? 'border-red-500' : 'border-gray-300'}`}>
              {tempPaymentMethod === 'COD' && <div className='w-3 h-3 rounded-full bg-red-500'></div>}
            </div>
            <input 
              type='radio' 
              className='hidden' 
              checked={tempPaymentMethod === 'COD'}
              onChange={() => setTempPaymentMethod('COD')}
            />
            <span className='font-medium'>Thanh toán khi nhận hàng</span>
          </label>

          <label className='flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50'>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${tempPaymentMethod === 'MOMO' ? 'border-red-500' : 'border-gray-300'}`}>
              {tempPaymentMethod === 'MOMO' && <div className='w-3 h-3 rounded-full bg-red-500'></div>}
            </div>
            <input 
              type='radio' 
              className='hidden' 
              checked={tempPaymentMethod === 'MOMO'}
              onChange={() => setTempPaymentMethod('MOMO')}
            />
            <span className='font-medium'>Ví Momo</span>
          </label>
        </div>
        
        <div className='border-t p-4 flex justify-end'>
          <button 
            onClick={handleSave}
            className='px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700'
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  )
}
