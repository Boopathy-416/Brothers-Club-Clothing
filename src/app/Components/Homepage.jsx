import { HomeHero } from '../../components/home/home-hero'
import { CategoryGrid } from '../../components/home/category-grid'
import { ProductRail } from '../../components/home/product-rail'
import { HowItWorks } from '../../components/home/how-it-works'
import { ManufacturerStory } from '../../components/home/manufacturer-story'
import { RetailerCta } from '../../components/home/retailer-cta'

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CategoryGrid />
      <ProductRail
        eyebrow="Best sellers"
        title="Featured wholesale styles"
        filter="featured"
        href="/shop"
      />
      <HowItWorks />
      <ProductRail eyebrow="Just in" title="New arrivals" filter="new" href="/shop?sort=new" muted />
      <ManufacturerStory />
      <RetailerCta />
    </>
  )
}