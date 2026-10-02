import BenefitsSection from './home/BenefitsSection.jsx'
import BlogPreviewSection from './home/BlogPreviewSection.jsx'
import CategoriesSection from './home/CategoriesSection.jsx'
import HeroSection from './home/HeroSection.jsx'
import NewsletterSection from './home/NewsletterSection.jsx'
import OffersSection from './home/OffersSection.jsx'
import ProductSection from './home/ProductSection.jsx'
import TestimonialsSection from './home/TestimonialsSection.jsx'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <ProductSection />
      <ProductSection bestSellers />
      <OffersSection />
      <BenefitsSection />
      <TestimonialsSection />
      <NewsletterSection />
      <BlogPreviewSection />
    </>
  )
}
