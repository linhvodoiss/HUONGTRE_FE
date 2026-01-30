import { ProductResponse } from '#/product'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { QuantityProduct } from './quantity-product'

type SelectedOptions = {
  [groupId: string]: string[] // SINGLE: mảng 1 phần tử, MULTI: nhiều
}
export default function ProductDetailModal({
  closeModal,
  selectedProduct,
  isVisible,
}: {
  closeModal: () => void
  isVisible: boolean
  selectedProduct: ProductResponse
}) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
const [selectedQuantity, setSelectedQuantity] = useState(1)

  const handleSelectOption = (groupId: string, optionId: string, selectType: 'SINGLE' | 'MULTIPLE') => {
    setSelectedOptions(prev => {
      if (selectType === 'SINGLE') {
        return { ...prev, [groupId]: [optionId] }
      }

      const current = prev[groupId] || []
      return {
        ...prev,
        [groupId]: current.includes(optionId) ? current.filter(id => id !== optionId) : [...current, optionId],
      }
    })
  }
  return (
    <div
      className={`fixed inset-0 z-50 bg-white transition-all duration-300 ease-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} `}
    >
      <button
        className='absolute top-4 left-4 rounded-full bg-gray-400 p-2 font-semibold text-white'
        onClick={closeModal}
      >
        <ChevronLeft size={24} strokeWidth={3} />
      </button>
      <div className='mx-auto mt-8 flex h-[90%] w-[90%] items-center gap-6 relative'>
        <div className='h-full w-[45%] overflow-hidden rounded-md'>
          <Image
            src='/images/tra-sua-tran-chau-hoang-kim.png'
            width={100}
            height={100}
            className='size-full object-cover'
            alt='image product'
          />
        </div>
        <div className='w-[55%] self-start h-[80%] min-h-[80%] overflow-y-scroll side-right relative pl-2'>
          {selectedProduct?.optionGroups?.map(optionGroup => (
            <div key={optionGroup.id} className='mb-6'>
              <p className='text-xl font-semibold uppercase'>
                {optionGroup.name}
                {optionGroup.selectType === 'SINGLE' && (
                  <span className='ml-2 text-sm font-medium text-gray-500 lowercase'>* chọn 1</span>
                )}
              </p>

              <div className='mt-2 flex flex-wrap'>
                {optionGroup.options?.map(option => {
                  const groupId = String(optionGroup.id)
                  const optionId = String(option.id)
                  const checked = selectedOptions[groupId]?.includes(optionId) ?? false

                  return (
                    <div className='flex flex-col w-1/2 gap-2 py-2' key={optionId}>
                      <label className='block cursor-pointer'>
                        <input
                          type={optionGroup.selectType === 'SINGLE' ? 'radio' : 'checkbox'}
                          name={groupId}
                          checked={checked}
                          onChange={() => handleSelectOption(groupId, optionId, optionGroup.selectType)}
                         className="accent-pink-500 scale-125 mr-2"
                        />

                        <span>
                          <span className='text-xl font-semibold'> {option.name} </span>
                        </span>
                      </label>
                      {(option.price as number) > 0 && (
                        <span className='ml-1 block text-gray-500'>+{option.price}đ</span>
                      )}
                    </div>
                  )
                })}
              </div>
              <hr className='bg-gray-00 mt-2 h-0.5 w-full' />
            </div>
          ))}
         
          <div>
            <textarea name="" id="" placeholder='Nhập ghi chú' className='p-2 border w-full outline-0 bg-gray-100 rounded-md min-h-32'></textarea>
          </div>
        </div>
          <div className='absolute right-0 bottom-1/10 w-[55%] font-semibold text-white flex items-center justify-between'>
             <QuantityProduct maxQuantity={10} onQuantityChange={setSelectedQuantity} />
            <button className='px-4 py-2 bg-pink-400 rounded-md cursor-pointer hover:bg-pink-500 transition-all'>Thêm vào giỏ hàng</button>
          </div>
      </div>
    </div>
  )
}
