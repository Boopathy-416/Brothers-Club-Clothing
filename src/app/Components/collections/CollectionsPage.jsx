import { useParams } from 'react-router-dom'
import { Suspense } from 'react'
import { PageHeader } from '../../../components/site/section'
import { ProductBrowser } from '../../../components/shop/product-browser'
import { CATEGORIES } from '../../../lib/site'

export default function CollectionPage() {
  const { slug } = useParams() // Grabs the dynamic part of the URL
  const category = CATEGORIES.find((c) => c.slug === slug)
  
  if (!category) return <div className="flex h-[50vh] items-center justify-center font-bold">Category not found</div>
  
  return (
    <>
      <PageHeader eyebrow="Collection" title={category.name} description={category.description} />
      <Suspense>
        <ProductBrowser category={category.slug} />
      </Suspense>
    </>
  )
}