'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCart } from '@/contexts/cart-context'
import { useWishlist } from '@/contexts/wishlist-context'

const categories = [
  { name: 'Electronics & Gadgets', icon: 'microchip' },
  { name: 'Fashion & Apparel', icon: 'tshirt' },
  { name: 'Home & Kitchen', icon: 'couch' },
  { name: 'Health & Beauty', icon: 'spa' },
  { name: 'Food & Beverages', icon: 'utensils' },
  { name: 'Toys & Games', icon: 'gamepad' },
  { name: 'Books & Media', icon: 'book' },
  { name: 'Sports & Fitness', icon: 'dumbbell' },
  { name: 'Baby & Maternity', icon: 'baby' },
  { name: 'DIY & Hardware', icon: 'tools' },
  { name: 'Automotive & Parts', icon: 'car' },
  { name: 'Jewelry & Accessories', icon: 'gem' },
  { name: 'Furniture & Home Decor', icon: 'chair' },
  { name: 'Pet Supplies', icon: 'paw' },
  { name: 'Office Supplies', icon: 'pencil-alt' },
  { name: 'Art & Craft Supplies', icon: 'palette' },
  { name: 'Musical Instruments', icon: 'guitar' },
  { name: 'Garden & Outdoor', icon: 'leaf' },
  { name: 'Travel & Luggage', icon: 'suitcase-rolling' },
  { name: 'Computer & Mobile', icon: 'laptop' },
  { name: 'Cameras & Optics', icon: 'camera' },
  { name: 'Collectibles & Memorabilia', icon: 'star' },
  { name: 'Stationery & School Supplies', icon: 'pen-nib' },
  { name: 'Medical Supplies', icon: 'medkit' },
  { name: 'Gifts & Occasions', icon: 'gift' },
]

export function Header() {
  const { data: session } = useSession()
  const { state: cartState } = useCart()
  const { state: wishlistState } = useWishlist()
  const [searchQuery, setSearchQuery] = useState('')
  const [currency, setCurrency] = useState('PKR')
  const [language, setLanguage] = useState('en')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery)
    }
  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled 
      ? 'bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-cyan-500/10' 
      : 'bg-slate-900/90 backdrop-blur-lg'
    }`}>
      <div className="border-b border-cyan-500/20">
        {/* Main Header */}
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-2xl lg:text-3xl font-montserrat font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-purple-300 transition-all duration-300">
                FUTURE FOCUS
              </h1>
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-cyan-400 transition-colors font-medium">
                <i className="fas fa-home mr-2"></i>Home
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-cyan-400 transition-colors font-medium">
                  <i className="fas fa-box-open mr-2"></i>Products <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-slate-800 border-slate-700 max-h-80 overflow-y-auto">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.name} className="text-white hover:text-cyan-400 hover:bg-slate-700">
                      <Link href={`/products?category=${encodeURIComponent(category.name)}`} className="flex items-center w-full">
                        <i className={`fas fa-${category.icon} mr-3`}></i>
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/products?tab=new" className="text-white hover:text-cyan-400 transition-colors font-medium">
                <i className="fas fa-sparkles mr-2"></i>New Arrivals
              </Link>
              
              <Link href="/products?tab=trending" className="text-white hover:text-cyan-400 transition-colors font-medium">
                <i className="fas fa-fire mr-2"></i>Trending
              </Link>
              
              <Link href="/products?tab=sales" className="text-cyan-400 font-medium border-b-2 border-cyan-400 pb-1">
                <i className="fas fa-tags mr-2"></i>Sales
              </Link>
              
              <Link href="/products?tab=upcoming" className="text-white hover:text-cyan-400 transition-colors font-medium">
                <i className="fas fa-calendar-alt mr-2"></i>Upcoming
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-cyan-400 transition-colors font-medium">
                  <i className="fas fa-tools mr-2"></i>Tools <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700">
                  <DropdownMenuItem className="text-white hover:text-cyan-400 hover:bg-slate-700">
                    <Link href="/support" className="flex items-center w-full">
                      <i className="fas fa-headset mr-3"></i>Customer Support
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:text-cyan-400 hover:bg-slate-700">
                    <Link href="/compare" className="flex items-center w-full">
                      <i className="fas fa-balance-scale mr-3"></i>Product Comparison
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:text-cyan-400 hover:bg-slate-700">
                    <Link href="/recommendations" className="flex items-center w-full">
                      <i className="fas fa-lightbulb mr-3"></i>Recommendations
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:text-cyan-400 hover:bg-slate-700">
                    <Link href="/virtual-try-on" className="flex items-center w-full">
                      <i className="fas fa-vr-cardboard mr-3"></i>Virtual Try-On
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:text-cyan-400 hover:bg-slate-700">
                    <Link href="/forum" className="flex items-center w-full">
                      <i className="fas fa-users mr-3"></i>Community Forum
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="hidden md:flex items-center">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 pr-12"
                  />
                  <Button 
                    type="submit"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 bg-cyan-600 hover:bg-cyan-500"
                  >
                    <i className="fas fa-search"></i>
                  </Button>
                </div>
              </form>

              {/* Account */}
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-white hover:text-cyan-400">
                      <i className="fas fa-user-circle mr-2"></i>
                      {session.user.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-slate-800 border-slate-700">
                    <DropdownMenuItem className="text-white hover:bg-slate-700">
                      <Link href="/dashboard" className="flex items-center w-full">
                        <i className="fas fa-tachometer-alt mr-3"></i>Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">
                      <Link href="/orders" className="flex items-center w-full">
                        <i className="fas fa-box mr-3"></i>Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-white hover:bg-slate-700 cursor-pointer"
                      onClick={() => signOut()}
                    >
                      <i className="fas fa-sign-out-alt mr-3"></i>Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild variant="ghost" className="text-white hover:text-cyan-400">
                  <Link href="/auth/signin">
                    <i className="fas fa-user-circle mr-2"></i>Account
                  </Link>
                </Button>
              )}

              {/* Cart */}
              <Button asChild variant="ghost" className="text-white hover:text-cyan-400 relative">
                <Link href="/cart">
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Cart
                  {cartState.itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-cyan-500 text-slate-900 text-xs">
                      {cartState.itemCount}
                    </Badge>
                  )}
                </Link>
              </Button>

              {/* Wishlist */}
              <Button asChild variant="ghost" className="text-white hover:text-cyan-400 relative">
                <Link href="/wishlist">
                  <i className="fas fa-heart mr-2"></i>
                  Wishlist
                  {wishlistState.itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs">
                      {wishlistState.itemCount}
                    </Badge>
                  )}
                </Link>
              </Button>

              {/* Currency */}
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-20 bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="PKR" className="text-white">PKR</SelectItem>
                  <SelectItem value="USD" className="text-white">USD</SelectItem>
                  <SelectItem value="EUR" className="text-white">EUR</SelectItem>
                </SelectContent>
              </Select>

              {/* Language */}
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-20 bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="en" className="text-white">EN</SelectItem>
                  <SelectItem value="ur" className="text-white">UR</SelectItem>
                  <SelectItem value="es" className="text-white">ES</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Ticker Bar */}
        <div className="bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 text-slate-900 py-3 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-sm font-bold">
            <span className="mx-8">
              <i className="fas fa-robot mr-2"></i>
              LATEST UPDATE: New AI-powered products launched! Explore the future of tech!
            </span>
            <span className="mx-8">
              <i className="fas fa-fire-alt mr-2"></i>
              MEGA SUMMER SALE: Up to 70% off selected items! Limited stock, grab yours now!
            </span>
            <span className="mx-8">
              <i className="fas fa-award mr-2"></i>
              Join our Loyalty Program & Earn exclusive rewards and early access!
            </span>
            <span className="mx-8">
              <i className="fas fa-globe-americas mr-2"></i>
              FUTURE FOCUS expands to Europe and Asia! Global shipping now available!
            </span>
            <span className="mx-8">
              <i className="fas fa-fingerprint mr-2"></i>
              Personalized gadgets now available. Customize your tech, your way!
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}