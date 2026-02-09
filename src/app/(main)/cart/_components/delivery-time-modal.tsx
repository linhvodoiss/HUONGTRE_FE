'use client'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { DeliveryTime } from './types'

interface DeliveryTimeModalProps {
  isVisible: boolean
  onClose: () => void
  initialData: DeliveryTime
  onSave: (data: DeliveryTime) => void
}

export default function DeliveryTimeModal({
  isVisible,
  onClose,
  initialData,
  onSave
}: DeliveryTimeModalProps) {
  const [tempDeliveryTime, setTempDeliveryTime] = useState<DeliveryTime>(initialData)

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
  // Original: const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'))
  const minutesList = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'))

  useEffect(() => {
    if (isVisible) {
      setTempDeliveryTime(initialData)
    }
  }, [isVisible, initialData])

  if (!isVisible) return null

  const handleSave = () => {
    // Validate Time: Nếu không phải ASAP thì time phải > hiện tại
    if (!tempDeliveryTime.isAsap) {
      const now = new Date()
      const selectedDate = new Date()
      selectedDate.setHours(parseInt(tempDeliveryTime.hour))
      selectedDate.setMinutes(parseInt(tempDeliveryTime.minute))
      selectedDate.setSeconds(0)

      if (selectedDate <= now) {
        toast.error('Thời gian nhận hàng không hợp lệ (phải sau thời gian hiện tại). Vui lòng chọn lại!')
        return
      }
    }

    onSave(tempDeliveryTime)
    onClose()
  }

  return (
    <div 
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
      onClick={onClose}
    >
      <div 
        className='w-full max-w-sm rounded-xl bg-white animate-in zoom-in-95 duration-200'
        onClick={e => e.stopPropagation()}
      >
        <div className='p-5 border-b'>
          <h2 className='text-lg font-bold text-center'>Thời gian muốn nhận</h2>
          <p className='text-center text-sm text-gray-600 mt-1'>Hôm nay, {tempDeliveryTime.hour}:{tempDeliveryTime.minute}</p>
        </div>
        
        <div className='p-6'>
          <div className='flex items-center justify-center gap-2 mb-6'>
             {/* Hour Picker */}
             <div className="flex flex-col items-center">
                <select 
                  disabled={tempDeliveryTime.isAsap}
                  value={tempDeliveryTime.hour}
                  onChange={(e) => setTempDeliveryTime({...tempDeliveryTime, hour: e.target.value})}
                  className='w-20 p-2 text-center text-lg border rounded-lg disabled:bg-gray-100 disabled:text-gray-400'
                >
                  {hours.map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
             </div>
             <span className="text-xl font-bold">:</span>
             {/* Minute Picker */}
             <div className="flex flex-col items-center">
                <select 
                  disabled={tempDeliveryTime.isAsap}
                  value={tempDeliveryTime.minute}
                  onChange={(e) => setTempDeliveryTime({...tempDeliveryTime, minute: e.target.value})}
                  className='w-20 p-2 text-center text-lg border rounded-lg disabled:bg-gray-100 disabled:text-gray-400'
                >
                  {minutesList.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
             </div>
          </div>

          <div className='flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50' onClick={() => setTempDeliveryTime({...tempDeliveryTime, isAsap: !tempDeliveryTime.isAsap})}>
            <div className={`w-5 h-5 border rounded flex items-center justify-center ${tempDeliveryTime.isAsap ? 'bg-red-500 border-red-500' : 'border-gray-400'}`}>
              {tempDeliveryTime.isAsap && <X size={14} className="text-white rotate-45" />} 
            </div>
            <span className='select-none'>Càng sớm càng tốt</span>
          </div>
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
