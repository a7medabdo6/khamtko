import ProductDetails from '@/views/store/ProductDetails'

const ProductDetailsPage = async ({ params }: { params: Promise<{ lang: string; id: string }> }) => {
  const { id } = await params

  return <ProductDetails productId={id} />
}

export default ProductDetailsPage





