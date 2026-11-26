import { Suspense } from 'react'
import { PageHeader } from '../../../components/site/section'
import { ProductBrowser } from '../../../components/shop/product-browser'

export const metadata = {
  title: 'Shop All Wholesale Menswear',
  description: 'Browse Brothers Club formal pants, track pants, shorts and t-shirts available for wholesale order.',
}

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Wholesale catalogue"
        title="Shop all styles"
        description="Filter by category, colour, size and fabric. Open any style to enter your quantities by colour and size."
      />
      <Suspense>
        <ProductBrowser />
      </Suspense>
    </>
  )
}