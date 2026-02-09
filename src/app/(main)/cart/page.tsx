'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useCart, type CartItem } from '~/contexts/cart-context'
import ProductDetailModal from '../menu/_components/product-detail-modal'
import { ProductResponse } from '#/product'
import { toast } from 'sonner'
import { CustomerInfo, DeliveryTime } from './_components/types'
import CustomerInfoModal from './_components/customer-info-modal'
import DeliveryTimeModal from './_components/delivery-time-modal'
import PaymentMethodModal, { PaymentMethod } from './_components/payment-method-modal'
import CartItems from './_components/cart-items'
import OrderSummary from './_components/order-summary'
import DeliveryInfo from './_components/delivery-info'
import PickupInfo from './_components/pickup-info'

export default function CartPage() {
  const router = useRouter()
  const { cart, addToCart, updateCartItem } = useCart()
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery')
  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [editingCartIndex, setEditingCartIndex] = useState<number | null>(null)
  const shippingFee = deliveryMethod === 'delivery' ? 0 : 0

  // State cho Customer Info
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    detail: ''
  })

  // State cho Delivery Time
  const [showTimeModal, setShowTimeModal] = useState(false)
  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime>({
    isAsap: true,
    hour: '00',
    minute: '00'
  })

  // State cho Payment Method
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)

  // Load data từ LocalStorage khi mount
  useEffect(() => {
    const savedCustomer = localStorage.getItem('cart_customer_info')
    if (savedCustomer) {
      setCustomerInfo(JSON.parse(savedCustomer))
    }

    const savedTime = localStorage.getItem('cart_delivery_time')
    if (savedTime) {
      setDeliveryTime(JSON.parse(savedTime))
    } else {
      const now = new Date()
      setDeliveryTime({
        isAsap: true,
        hour: now.getHours().toString().padStart(2, '0'),
        minute: now.getMinutes().toString().padStart(2, '0')
      })
    }

    const savedPayment = localStorage.getItem('cart_payment_method')
    if (savedPayment) {
      setPaymentMethod(savedPayment as PaymentMethod)
    }
  }, [])

  // Handlers
  const openCustomerModal = () => {
    setShowCustomerModal(true)
  }

  const handleSaveCustomerInfo = (data: CustomerInfo) => {
    setCustomerInfo(data)
    localStorage.setItem('cart_customer_info', JSON.stringify(data))
    setShowCustomerModal(false)
  }

  const openTimeModal = () => {
    setShowTimeModal(true)
  }

  const handleSaveDeliveryTime = (data: DeliveryTime) => {
    setDeliveryTime(data)
    localStorage.setItem('cart_delivery_time', JSON.stringify(data))
    setShowTimeModal(false)
  }

  const openPaymentModal = () => {
    setShowPaymentModal(true)
  }

  const handleSavePaymentMethod = (method: 'COD' | 'MOMO') => {
    setPaymentMethod(method)
    localStorage.setItem('cart_payment_method', method)
    setShowPaymentModal(false)
  }

  // Handlers cho Edit Cart
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

  const handleOrder = () => {
    // Check Customer Info
    const isDelivery = deliveryMethod === 'delivery'
    if (!customerInfo.name || !customerInfo.phone || (isDelivery && !customerInfo.address)) {
      toast.error(isDelivery ? 'Vui lòng điền đủ tên, số điện thoại và địa chỉ!' : 'Vui lòng điền tên và số điện thoại!')
      openCustomerModal()
      return
    }

    // Validate Time again
    if (!deliveryTime.isAsap) {
      const now = new Date()
      const selectedDate = new Date()
      selectedDate.setHours(parseInt(deliveryTime.hour))
      selectedDate.setMinutes(parseInt(deliveryTime.minute))
      selectedDate.setSeconds(0)

      if (selectedDate <= now) {
        toast.error('Thời gian nhận hàng đã trôi qua. Vui lòng chọn lại thời gian!')
        openTimeModal()
        return
      }
    }

    // Validate Payment Method
    if (!paymentMethod) {
      toast.error('Vui lòng chọn phương thức thanh toán!')
      openPaymentModal()
      return
    }

    toast.success(`Đặt hàng thành công!\nThanh toán: ${paymentMethod === 'COD' ? 'Tiền mặt' : 'Momo'}`)
  }

  return (
    <div className='min-h-screen bg-gray-100 p-4 relative'>
      <div className='mx-auto grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-3'>
        {/* Left Column - Main Content */}
        <div className='lg:col-span-2'>
          {/* Header */}
          <div className='mb-4 flex items-center gap-3'>
            <button onClick={() => router.back()} className='rounded-full p-2 hover:bg-gray-200'>
              <ArrowLeft size={24} />
            </button>
            <h1 className='text-2xl font-bold'>Thông tin giỏ hàng</h1>
          </div>

          {/* Delivery Method Tabs */}
          <div className='mb-4 flex gap-2'>
            <button
              onClick={() => setDeliveryMethod('delivery')}
              className={`flex-1 rounded-lg px-6 py-3 font-semibold transition-colors cursor-pointer ${
                deliveryMethod === 'delivery'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Giao hàng
            </button>
            <button
              onClick={() => setDeliveryMethod('pickup')}
              className={`flex-1 rounded-lg px-6 py-3 font-semibold transition-colors cursor-pointer ${
                deliveryMethod === 'pickup'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Tự đến lấy
            </button>
          </div>

          {/* Store Info & Customer Info logic based on Delivery Method */}
          {deliveryMethod === 'delivery' ? (
            <DeliveryInfo 
              customerInfo={customerInfo}
              deliveryTime={deliveryTime}
              onOpenCustomerModal={openCustomerModal}
              onOpenTimeModal={openTimeModal}
            />
          ) : (
            <PickupInfo 
              customerInfo={customerInfo}
              deliveryTime={deliveryTime}
              onOpenCustomerModal={openCustomerModal}
              onOpenTimeModal={openTimeModal}
            />
          )}

          {/* Payment Method */}
          <div className='mb-4 rounded-lg bg-white p-4'>
            <div className='flex items-center justify-between'>
              <span className='font-medium'>Phương thức thanh toán</span>
              <button onClick={openPaymentModal} className='text-sm text-red-500 hover:underline cursor-pointer'>Chọn</button>
            </div>
            <p className='mt-2 text-sm text-gray-500'>
              {paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : paymentMethod === 'MOMO' ? 'Ví Momo' : 'Chưa chọn phương thức thanh toán'}
            </p>
          </div>

          {/* Voucher */}
          <div className='mb-4 rounded-lg border border-gray-200 bg-white p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='rounded bg-gray-100 px-2 py-1 text-sm font-mono'>FBBTH U6</div>
              </div>
              <button className='text-sm text-red-500 hover:underline'>Xem</button>
            </div>
          </div>

          <p className='mb-4 text-sm text-red-500'>Mã giảm giá không thể áp dụng vào khung giờ này!</p>
          
          {/* Selected Items */}
          <CartItems onEditItem={editCartItem} />

        </div>

        {/* Right Column - Summary */}
        <div className='lg:col-span-1'>
          <OrderSummary shippingFee={shippingFee} onOrder={handleOrder} />
        </div>
      </div>

      {selectedProduct && (
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

      {/* CUSTOMER INFO MODAL */}
      <CustomerInfoModal 
        isVisible={showCustomerModal} 
        onClose={() => setShowCustomerModal(false)}
        initialData={customerInfo} // or tempCustomerInfo? 
        // Logic: Modal initializes its own temp state from initialData props.
        // We want it to start with CURRENT confirmed customerInfo.
        // So passing customerInfo is correct. 
        // BUT wait, openCustomerModal sets tempCustomerInfo.
        // And the Modal USES tempCustomerInfo to render?
        // No, my CustomerInfoModal uses `initialData` prop to set its internal state on open.
        // So `tempCustomerInfo` inside page.tsx is actually REDUNDANT if the modal manages its own temp state!
        // My CustomerInfoModal implementation:
        // const [tempCustomerInfo, setTempCustomerInfo] = useState<CustomerInfo>(initialData)
        // useEffect(() => { if (isVisible) setTempCustomerInfo(initialData) }, [isVisible, initialData])
        
        // So I don't need `tempCustomerInfo` in page.tsx for the modal props.
        // I can just pass `customerInfo`.
        // However, I previously had `setTempCustomerInfo(customerInfo)` in `openCustomerModal`.
        // That was for the INLINE modal logic.
        // Since I'm using component modal, I can rely on the component to reset.
        
        // I'll keep passing `customerInfo` to `initialData`.
        onSave={handleSaveCustomerInfo}
        deliveryMethod={deliveryMethod}
      />

      {/* DELIVERY TIME MODAL */}
      <DeliveryTimeModal 
        isVisible={showTimeModal} 
        onClose={() => setShowTimeModal(false)}
        initialData={deliveryTime}
        onSave={handleSaveDeliveryTime}
      />

      {/* PAYMENT METHOD MODAL */}
      <PaymentMethodModal 
        isVisible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        initialData={paymentMethod}
        onSave={handleSavePaymentMethod}
      />
    </div>
  )
}
