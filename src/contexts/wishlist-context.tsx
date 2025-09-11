'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'
import { toast } from 'sonner'

export interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  availability: string
  isPrime: boolean
}

interface WishlistState {
  items: WishlistItem[]
  itemCount: number
}

type WishlistAction = 
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] }

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(i => i.id === action.payload.id)
      if (existingItem) {
        return state // Item already in wishlist
      }
      
      const newItems = [...state.items, action.payload]
      return { items: newItems, itemCount: newItems.length }
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload)
      return { items: newItems, itemCount: newItems.length }
    }
    
    case 'CLEAR_WISHLIST':
      return { items: [], itemCount: 0 }
      
    case 'LOAD_WISHLIST': {
      const items = action.payload
      return { items, itemCount: items.length }
    }
    
    default:
      return state
  }
}

interface WishlistContextType {
  state: WishlistState
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    itemCount: 0,
  })

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist)
        dispatch({ type: 'LOAD_WISHLIST', payload: wishlistItems })
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.items))
  }, [state.items])

  const addItem = (item: WishlistItem) => {
    const existingItem = state.items.find(i => i.id === item.id)
    if (existingItem) {
      toast.info(`${item.name} is already in your wishlist`)
      return
    }
    
    dispatch({ type: 'ADD_ITEM', payload: item })
    toast.success(`${item.name} added to wishlist!`)
  }

  const removeItem = (id: string) => {
    const item = state.items.find(i => i.id === id)
    dispatch({ type: 'REMOVE_ITEM', payload: id })
    if (item) {
      toast.success(`${item.name} removed from wishlist`)
    }
  }

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' })
    toast.success('Wishlist cleared')
  }

  const isInWishlist = (id: string) => {
    return state.items.some(item => item.id === id)
  }

  return (
    <WishlistContext.Provider value={{
      state,
      addItem,
      removeItem,
      clearWishlist,
      isInWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}