'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: 'https://placehold.co/1500x600?text=Discover+Our+Latest+Innovations+in+Tech',
    title: 'Discover Our Latest Innovations',
    description: 'Cutting-edge tech and stylish designs for a smarter future. Explore the next generation of possibilities.',
    cta: 'Shop Now',
    ctaLink: '#featured-products',
    icon: 'lightbulb'
  },
  {
    id: 2,
    image: 'https://placehold.co/1500x600?text=Unbeatable+Deals+This+Week+Save+Big',
    title: 'Unbeatable Deals This Week!',
    description: 'Don\'t miss out on our limited-time discounts. Grab your favorites before they\'re gone!',
    cta: 'View Sales',
    ctaLink: '/products?tab=sales',
    icon: 'hand-holding-usd'
  },
  {
    id: 3,
    image: 'https://placehold.co/1500x600?text=Next-Gen+Gaming+Experience+Consoles',
    title: 'Next-Gen Gaming Experience',
    description: 'Immerse yourself in virtual worlds with our powerful new gaming consoles and accessories.',
    cta: 'Explore Gaming',
    ctaLink: '/products?category=Electronics',
    icon: 'gamepad'
  },
  {
    id: 4,
    image: 'https://placehold.co/1500x600?text=Smart+Home+Smarter+Living+Automation',
    title: 'Smart Home, Smarter Living',
    description: 'Automate your life with our intelligent home devices. Comfort and convenience at your fingertips.',
    cta: 'Discover Smart Home',
    ctaLink: '/products?category=Home+%26+Kitchen',
    icon: 'home'
  },
  {
    id: 5,
    image: 'https://placehold.co/1500x600?text=Fashion+Forward+Latest+Trends+Style',
    title: 'Fashion Forward',
    description: 'Step up your style game with the latest trends in apparel and accessories. Express yourself!',
    cta: 'Shop Fashion',
    ctaLink: '/products?category=Fashion+%26+Apparel',
    icon: 'tshirt'
  }
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="relative w-full bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-6 py-16">
        <div className="relative max-w-7xl mx-auto rounded-2xl overflow-hidden bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-purple-500/10">
          
          {/* Carousel Container */}
          <div className="relative h-[500px] lg:h-[600px]">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-6">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-6 backdrop-blur-sm border border-cyan-500/30">
                        <i className={`fas fa-${slide.icon} text-2xl text-cyan-400`}></i>
                      </div>
                      
                      <h2 className="text-4xl lg:text-6xl font-montserrat font-bold text-white mb-6 leading-tight">
                        {slide.title}
                      </h2>
                      
                      <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed">
                        {slide.description}
                      </p>
                      
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        onClick={() => {
                          if (slide.ctaLink.startsWith('#')) {
                            document.querySelector(slide.ctaLink)?.scrollIntoView({ behavior: 'smooth' })
                          } else {
                            window.location.href = slide.ctaLink
                          }
                        }}
                      >
                        {slide.cta} <i className="fas fa-arrow-right ml-2"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="ml-6 pointer-events-auto bg-slate-900/60 border-cyan-500/30 text-cyan-400 hover:bg-slate-800/80 hover:text-cyan-300 backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="mr-6 pointer-events-auto bg-slate-900/60 border-cyan-500/30 text-cyan-400 hover:bg-slate-800/80 hover:text-cyan-300 backdrop-blur-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-[5000ms] ease-linear"
              style={{
                width: isAutoPlaying ? '100%' : '0%',
                animation: isAutoPlaying ? 'progress 5s linear infinite' : 'none'
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  )
}