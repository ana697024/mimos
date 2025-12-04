import React, { createContext, useState, useEffect } from 'react'

const CartContext = createContext()


export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mimos_cart')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {     
    localStorage.setItem('mimos_cart', JSON.stringify(items))
  }, [items])

  function addToCart(product, qty = 1) {    
    setItems(prev => {
      const found = prev.find(p => p.id === product.id)
      if (found) {
        return prev.map(p =>
          p.id === product.id ? { ...p, qty: p.qty + qty } : p
        )
      }
      return [...prev, { ...product, qty }]
    })
  }

  function removeFromCart(id) {
    setItems(prev => prev.filter(p => p.id !== id))
  }

  function clearCart() {
    setItems([])
  }

  function updateQty(id, qty) {
    setItems(prev =>
      prev.map(p => (p.id === id ? { ...p, qty } : p))
    )
  }

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, updateQty, total }}
    >
      {children}
    </CartContext.Provider>
  )
}
