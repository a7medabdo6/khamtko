// Component Imports
import ProductListManagement from '@views/apps/ecommerce/products/list/ProductListManagement'
import { getDictionary } from '@/utils/getDictionary'

const eCommerceProductsList = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params
  const dictionary = await getDictionary(lang as 'en' | 'ar' | 'fr')

  return <ProductListManagement dictionary={dictionary} />
}

export default eCommerceProductsList
