import CategoryDetail from '@/components/category-detail/CategoryDetail'
import React from 'react'

const CategoryPage = ({ params }: { params: { slug: string } }) => {
  return (
    <CategoryDetail slug={params.slug} />
  )
}

export default CategoryPage