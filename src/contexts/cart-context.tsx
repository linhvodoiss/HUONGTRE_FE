'use client'

import { ProductResponse } from '#/product'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type CartItem = {
  product: ProductResponse
  quantity: number
  selectedOptions: {
    [groupId: string]: string[]
  }
  note?: string
  totalPrice: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (index: number) => void
  updateCartItem: (index: number, item: CartItem) => void
  clearCart: () => void
  totalCartPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('huongtre_cart')
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart))
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error)
      }
    }
    setIsInitialized(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return
    localStorage.setItem('huongtre_cart', JSON.stringify(cart))
  }, [cart, isInitialized])

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      // Tìm xem đã có sản phẩm giống nhau với cùng options chưa
      const existingIndex = prev.findIndex(cartItem => {
        // Kiểm tra cùng sản phẩm
        if (cartItem.product.id !== item.product.id) return false
        
        // Kiểm tra cùng số lượng options
        const existingOptionsKeys = Object.keys(cartItem.selectedOptions).sort()
        const newOptionsKeys = Object.keys(item.selectedOptions).sort()
        
        if (existingOptionsKeys.length !== newOptionsKeys.length) return false
        
        // Kiểm tra từng option group có cùng giá trị không
        return existingOptionsKeys.every(key => {
          const existingOptions = [...(cartItem.selectedOptions[key] || [])].sort()
          const newOptions = [...(item.selectedOptions[key] || [])].sort()
          
          if (existingOptions.length !== newOptions.length) return false
          
          return existingOptions.every((opt, idx) => opt === newOptions[idx])
        })
      })
      
      // Nếu tìm thấy sản phẩm giống nhau, cộng số lượng
      if (existingIndex !== -1) {
        const newCart = [...prev]
        const existingItem = newCart[existingIndex]
        newCart[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + item.quantity,
          totalPrice: existingItem.totalPrice + item.totalPrice,
        }
        return newCart
      }
      
      // Nếu không tìm thấy, thêm mới
      return [...prev, item]
    })
  }

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const updateCartItem = (index: number, item: CartItem) => {
    setCart(prev => {
      const newCart = [...prev]
      newCart[index] = item
      return newCart
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const totalCartPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        totalCartPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
