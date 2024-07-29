import React from 'react';
import Index from '@/components/pages/Index';

export default function Page({ params }: { params: { slug: string } }) {

    const slug = params.slug;

  return (
    <Index slug={slug} />
  )
}