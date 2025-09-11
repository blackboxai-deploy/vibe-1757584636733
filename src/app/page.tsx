import { Header } from '@/components/layout/header'
import { HeroSection } from '@/components/sections/hero-section'
import { CategoriesSection } from '@/components/sections/categories-section'
import { FeaturedProductsSection } from '@/components/sections/featured-products-section'
import { PromotionalVideosSection } from '@/components/sections/promotional-videos-section'
import { AISearchSection } from '@/components/sections/ai-search-section'
import { ChatSection } from '@/components/sections/chat-section'
import { DeliveryTrackingSection } from '@/components/sections/delivery-tracking-section'
import { SupportSection } from '@/components/sections/support-section'
import { ComparisonSection } from '@/components/sections/comparison-section'
import { RecommendationsSection } from '@/components/sections/recommendations-section'
import { VirtualTryOnSection } from '@/components/sections/virtual-try-on-section'
import { CommunityForumSection } from '@/components/sections/community-forum-section'
import { CheckoutSection } from '@/components/sections/checkout-section'
import { SubscribeSection } from '@/components/sections/subscribe-section'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        <CategoriesSection />
        <PromotionalVideosSection />
        <FeaturedProductsSection />
        <AISearchSection />
        <ChatSection />
        <DeliveryTrackingSection />
        <SupportSection />
        <ComparisonSection />
        <RecommendationsSection />
        <VirtualTryOnSection />
        <CommunityForumSection />
        <CheckoutSection />
        <SubscribeSection />
      </main>
      
      <Footer />
    </div>
  )
}